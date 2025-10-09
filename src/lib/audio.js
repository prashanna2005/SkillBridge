// src/lib/audio.js
export async function checkMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (err) {
    console.error("Microphone access denied:", err);
    return false;
  }
}

export async function startRecording(setRecorder, setAudioURL) {
  const hasPermission = await checkMicrophonePermission();
  if (!hasPermission) {
    setAudioURL(null);
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  let chunks = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  recorder.onstop = () => {
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
    } else {
      setAudioURL(null);
    }
    chunks = [];
    stream.getTracks().forEach((track) => track.stop());
  };

  recorder.start();
  setRecorder(recorder);
}

export function stopRecording(recorder) {
  if (recorder && recorder.state !== "inactive") {
    recorder.stop();
  }
}
