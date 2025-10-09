// src/components/ChatBox.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Mic,
  Video,
  Phone,
} from "lucide-react";
import { startRecording, stopRecording } from "../lib/audio.js";
import VideoCallModal from "./VideoCallModel.js";

interface Message {
  id: string;
  sender: "mentor" | "learner";
  senderName: string;
  content: string;
  timestamp: Date;
  type?: "text" | "audio";
  audioURL?: string;
}

interface ChatBoxProps {
  sessionId: string;
  currentUserRole: "mentor" | "learner";
  currentUserName: string;
  otherUserName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  sessionId,
  currentUserRole,
  currentUserName,
  otherUserName,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video">("video");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatKey = `chat_${sessionId}`;

  // Load stored messages or demo data
  useEffect(() => {
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    } else {
      const demoMessages: Message[] = [
        {
          id: "1",
          sender: currentUserRole === "mentor" ? "learner" : "mentor",
          senderName: otherUserName,
          content: "Hi! Looking forward to our session on React Hooks.",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          sender: currentUserRole,
          senderName: currentUserName,
          content:
            "Hello! Yes, I've prepared some great examples to share with you.",
          timestamp: new Date(Date.now() - 3000000),
        },
      ];
      setMessages(demoMessages);
      localStorage.setItem(chatKey, JSON.stringify(demoMessages));
    }
  }, [sessionId, chatKey, currentUserRole, currentUserName, otherUserName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUserRole,
      senderName: currentUserName,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: "text",
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const handleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      await startRecording(setRecorder, setAudioURL);
    } else {
      setIsRecording(false);
      if (recorder) {
        stopRecording(recorder);
      }
    }
  };

  useEffect(() => {
    if (audioURL) {
      const message: Message = {
        id: Date.now().toString(),
        sender: currentUserRole,
        senderName: currentUserName,
        content: "",
        timestamp: new Date(),
        type: "audio",
        audioURL,
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
      setAudioURL(null);
    }
  }, [audioURL]);

  const startCall = (type: "voice" | "video") => {
    setCallType(type);
    setShowVideoCall(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">{otherUserName}</h3>
              <p className="text-xs text-blue-100">
                {currentUserRole === "mentor" ? "Learner" : "Mentor"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => startCall("voice")}
              className="p-1 hover:bg-white/20 rounded"
              title="Start Voice Call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={() => startCall("video")}
              className="p-1 hover:bg-white/20 rounded"
              title="Start Video Call"
            >
              <Video className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === currentUserRole
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === currentUserRole
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {msg.senderName}
                    </div>
                    {msg.type === "audio" && msg.audioURL ? (
                      <audio controls src={msg.audioURL} />
                    ) : (
                      <div className="text-sm">{msg.content}</div>
                    )}
                    <div
                      className={`text-xs mt-1 ${
                        msg.sender === currentUserRole
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={handleRecord}
                className={`p-2 rounded-lg ${
                  isRecording ? "bg-red-500 text-white" : "bg-gray-100"
                }`}
              >
                <Mic className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}

        {isMinimized && (
          <div className="p-3 text-center">
            <p className="text-sm text-gray-600">Chat minimized</p>
          </div>
        )}
      </div>

      {/* VideoCallModal (New Feature) */}
      <VideoCallModal
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        sessionId={sessionId}
        currentUserName={currentUserName}
        otherUserName={otherUserName}
        callType={callType}
      />
    </>
  );
};

export default ChatBox;
