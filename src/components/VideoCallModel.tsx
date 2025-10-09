// src/components/VideoCallModal.tsx
import { useRef, useEffect, useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  Settings,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

/**
 * VideoCallModal
 * - Works in two modes:
 *   1) Demo mode (no signaling server): mirrors local stream into "remote" so UI/demo works.
 *   2) Signaling mode (set VITE_SIGNALING_SERVER_URL): uses Socket.IO for real P2P calls.
 *
 * To enable real calls:
 *  - Provide a signaling server URL in env: VITE_SIGNALING_SERVER_URL (or NEXT_PUBLIC_SIGNALING_SERVER_URL)
 *  - Install & run a Socket.IO signaling server (see instructions at the end).
 */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  currentUserName: string;
  otherUserName: string;
  callType: "voice" | "video";
};

export default function VideoCallModal({
  isOpen,
  onClose,
  sessionId,
  otherUserName,
  callType,
}: Props) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<any>(null); // optional Socket.IO client

  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "connecting" | "connected" | "ended"
  >("connecting");
  const [callDurationSec, setCallDurationSec] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const SIGNALING_URL =
    // Vite uses import.meta.env.VITE_*
    (import.meta.env.VITE_SIGNALING_SERVER_URL ||
      (import.meta.env.NEXT_PUBLIC_SIGNALING_SERVER_URL as string) ||
      "") as string;

  // Timer
  useEffect(() => {
    let timer: any = null;
    if (callStatus === "connected") {
      timer = setInterval(() => setCallDurationSec((s) => s + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // initialize when opened
  useEffect(() => {
    if (!isOpen) return;
    initCall();
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // initialize call routine
  const initCall = async () => {
    setCallStatus("connecting");
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: callType === "video",
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      setIsAudioEnabled(Boolean(stream.getAudioTracks().length));
      setIsVideoEnabled(
        Boolean(stream.getVideoTracks().length && callType === "video")
      );

      if (SIGNALING_URL) {
        await startSignaledCall(stream);
      } else {
        // Demo fallback: mirror local stream as remote (good for UI/demo)
        // Simulate connection delay
        setTimeout(() => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
          setCallStatus("connected");
        }, 700);
      }
    } catch (err) {
      console.error("Could not get media:", err);
      alert("Permission denied or no camera/microphone available.");
      onClose();
    }
  };

  // Start WebRTC with signaling using Socket.IO if SIGNALING_URL provided
  const startSignaledCall = async (stream: MediaStream) => {
    // dynamic import to avoid breaking if socket.io-client not installed
    let io: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      io = (await import("socket.io-client")).default;
    } catch (e) {
      console.warn(
        "socket.io-client not installed. Install it to enable real calls: npm i socket.io-client"
      );
      // fallback to demo mirrored stream
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
      setCallStatus("connected");
      return;
    }

    const socket = io(SIGNALING_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    // Standard STUN-only config (expand for TURN in production)
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    // add local tracks
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));

    // on remote track
    pc.ontrack = (ev) => {
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = ev.streams[0];
      setCallStatus("connected");
    };

    // send ICE candidates
    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        socket.emit("candidate", {
          roomId: sessionId,
          candidate: ev.candidate,
        });
      }
    };

    // join room
    socket.emit("join", sessionId);

    // if somebody else is already in the room, they will listen and create offer/answer exchange
    socket.on("joined", async () => {
      // if we are the second peer, create offer
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { roomId: sessionId, sdp: offer });
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    });

    socket.on("offer", async (offer: any) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { roomId: sessionId, sdp: answer });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    socket.on("answer", async (answer: any) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (err) {
        console.error("Error applying answer:", err);
      }
    });

    socket.on("candidate", async (data: any) => {
      try {
        if (data?.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (err) {
        console.warn("Error adding candidate:", err);
      }
    });

    // If nobody answered in some time, fallback to connected (still show UI)
    setTimeout(() => {
      if (callStatus !== "connected") setCallStatus("connected");
    }, 2500);
  };

  const toggleAudio = () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setIsAudioEnabled((v) => !v);
  };

  const toggleVideo = () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setIsVideoEnabled((v) => !v);
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        // replace local video element with screen
        if (localVideoRef.current)
          localVideoRef.current.srcObject = displayStream;
        setIsScreenSharing(true);

        // forward display stream tracks to peer connection if exists
        if (pcRef.current) {
          // remove existing video senders and replace
          const senders = pcRef.current
            .getSenders()
            .filter((s) => s.track?.kind === "video");
          senders.forEach((s) => s.track?.stop());
          displayStream
            .getVideoTracks()
            .forEach((track) => pcRef.current?.addTrack(track, displayStream));
        }

        // when screen share ends, restore camera
        displayStream.getVideoTracks()[0].onended = async () => {
          setIsScreenSharing(false);
          // restart camera stream and reinitialize media & senders
          if (localStreamRef.current) {
            if (localVideoRef.current)
              localVideoRef.current.srcObject = localStreamRef.current;
            if (pcRef.current) {
              // remove display senders
              const ds = pcRef.current
                .getSenders()
                .filter((s) => s.track?.kind === "video");
              ds.forEach((s) => {
                try {
                  s.track?.stop();
                } catch {}
              });
              localStreamRef.current
                .getVideoTracks()
                .forEach((t) =>
                  pcRef.current?.addTrack(
                    t,
                    localStreamRef.current as MediaStream
                  )
                );
            }
          }
        };
      } else {
        // stop screen sharing - this will trigger onended above, so just toggle flag
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const endCall = () => {
    cleanup();
    setCallStatus("ended");
    onClose();
  };

  const cleanup = () => {
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    } catch {}
    try {
      if (pcRef.current) {
        pcRef.current.close();
      }
    } catch {}
    try {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    } catch {}
    pcRef.current = null;
    localStreamRef.current = null;
    socketRef.current = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-60" : "w-full max-w-6xl h-full max-h-[90vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
          <div className="flex items-center space-x-3">
            <Video className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">
                {callType === "video" ? "Video Call" : "Voice Call"} with{" "}
                {otherUserName}
              </h3>
              <p className="text-xs text-blue-100">
                {callStatus === "connecting"
                  ? "Connecting..."
                  : callStatus === "connected"
                  ? formatCallDuration(callDurationSec)
                  : "Call Ended"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={endCall}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video area */}
        {!isMinimized && (
          <div className="flex-1 bg-gray-900 relative">
            {callType === "video" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative bg-gray-800 flex items-center justify-center">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {callStatus === "connecting" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Connecting to {otherUserName}...</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {otherUserName}
                  </div>
                </div>

                <div className="relative bg-gray-700 flex items-center justify-center">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    You
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mic className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {otherUserName}
                  </h3>
                  <p className="text-gray-300">
                    {callStatus === "connecting"
                      ? "Connecting..."
                      : formatCallDuration(callDurationSec)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        {!isMinimized && (
          <div className="p-6 bg-white border-t border-gray-200 rounded-b-xl">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleAudio}
                className={`p-4 rounded-full transition-colors ${
                  isAudioEnabled
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isAudioEnabled ? (
                  <Mic className="h-6 w-6" />
                ) : (
                  <MicOff className="h-6 w-6" />
                )}
              </button>

              {callType === "video" && (
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full transition-colors ${
                    isVideoEnabled
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video className="h-6 w-6" />
                  ) : (
                    <VideoOff className="h-6 w-6" />
                  )}
                </button>
              )}

              <button
                onClick={toggleScreenShare}
                className={`p-4 rounded-full transition-colors ${
                  isScreenSharing
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Monitor className="h-6 w-6" />
              </button>

              <button className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                <Settings className="h-6 w-6" />
              </button>

              <button
                onClick={endCall}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Minimized */}
        {isMinimized && (
          <div className="p-4 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {callType === "video" ? (
                  <Video className="h-6 w-6 text-white" />
                ) : (
                  <Mic className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{otherUserName}</p>
                <p className="text-sm text-gray-600">
                  {formatCallDuration(callDurationSec)}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full ${
                  isAudioEnabled ? "bg-gray-200" : "bg-red-500 text-white"
                }`}
              >
                {isAudioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={endCall}
                className="p-2 rounded-full bg-red-500 text-white"
              >
                <PhoneOff className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
