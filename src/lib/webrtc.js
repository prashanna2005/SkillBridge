// src/lib/webrtc.js
export const setupVideoCall = async (
  localVideoRef,
  remoteVideoRef,
  socket,
  onRecordingComplete
) => {
  const peerConnection = new RTCPeerConnection();

  // Request both video and audio
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // Debug: Log audio track status
  const audioTrack = stream.getAudioTracks()[0];
  console.log("Audio Track:", audioTrack);
  if (!audioTrack) {
    alert(
      "No audio track found! Microphone may not be available or permission denied."
    );
  } else if (!audioTrack.enabled) {
    alert("Audio track is disabled!");
  }

  localVideoRef.current.srcObject = stream;

  // Add all tracks (video + audio) to the peer connection
  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

  // --- Recording logic ---
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];
  let blobUrl = null;

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" }); // contains both audio and video
    if (onRecordingComplete) {
      // Only revoke the previous blob URL if it exists and is no longer needed
      if (blobUrl) {
        // Do NOT revoke here if you want playback to work!
        // URL.revokeObjectURL(blobUrl);
      }
      blobUrl = URL.createObjectURL(blob);
      onRecordingComplete(blobUrl);
    }
    chunks = [];
  };

  // Start recording when the call starts
  mediaRecorder.start();

  // To stop recording, call mediaRecorder.stop() from your UI when the call ends

  peerConnection.ontrack = (event) => {
    remoteVideoRef.current.srcObject = event.streams[0];
    // Debug: Log remote stream audio tracks
    const remoteAudioTracks = event.streams[0].getAudioTracks();
    console.log("Remote Audio Tracks:", remoteAudioTracks);
    if (remoteAudioTracks.length === 0) {
      console.warn("No remote audio tracks found!");
    }
  };

  socket.on("offer", async (offer) => {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", answer);
  });

  socket.on("answer", async (answer) => {
    await peerConnection.setRemoteDescription(answer);
  });

  socket.on("candidate", (candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("candidate", event.candidate);
    }
  };

  // Return peerConnection and mediaRecorder so you can stop recording from your UI
  return { peerConnection, mediaRecorder };
};
