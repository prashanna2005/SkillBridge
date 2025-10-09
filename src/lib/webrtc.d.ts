import * as React from "react";

export function setupVideoCall(
  localVideoRef: React.RefObject<HTMLVideoElement>,
  remoteVideoRef: React.RefObject<HTMLVideoElement>,
  socket: any
): Promise<RTCPeerConnection>;
