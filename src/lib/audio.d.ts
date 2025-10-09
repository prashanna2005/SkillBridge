export function startRecording(
  setRecorder: (recorder: MediaRecorder) => void,
  setAudioURL: (url: string) => void
): Promise<void>;

export function stopRecording(recorder: MediaRecorder): void;
