import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  sender: "mentor" | "learner";
  senderName: string;
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatKey = `chat_${sessionId}`;

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    } else {
      // Add some demo messages for the hackathon demo
      const demoMessages: Message[] = [
        {
          id: "1",
          sender: currentUserRole === "mentor" ? "learner" : "mentor",
          senderName: otherUserName,
          content: "Hi! Looking forward to our session on React Hooks.",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: "2",
          sender: currentUserRole,
          senderName: currentUserName,
          content:
            "Hello! Yes, I've prepared some great examples to share with you.",
          timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
        },
        {
          id: "3",
          sender: currentUserRole === "mentor" ? "learner" : "mentor",
          senderName: otherUserName,
          content:
            "Perfect! Should I prepare any specific questions beforehand?",
          timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
        },
      ];
      setMessages(demoMessages);
      localStorage.setItem(chatKey, JSON.stringify(demoMessages));
    }
  }, [sessionId, chatKey, currentUserRole, currentUserName, otherUserName]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUserRole,
      senderName: currentUserName,
      content: newMessage.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    setNewMessage("");

    // Simulate a response from the other user (for demo purposes)
    setTimeout(() => {
      const responses = [
        "That's a great point!",
        "Thanks for the explanation.",
        "I understand now, thank you!",
        "Could you elaborate on that?",
        "That makes sense.",
        "I'll try that approach.",
        "Great suggestion!",
        "I appreciate your help.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: currentUserRole === "mentor" ? "learner" : "mentor",
        senderName: otherUserName,
        content: randomResponse,
        timestamp: new Date(),
      };

      const newUpdatedMessages = [...updatedMessages, responseMessage];
      setMessages(newUpdatedMessages);
      localStorage.setItem(chatKey, JSON.stringify(newUpdatedMessages));
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
      {/* Chat Header */}
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
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === currentUserRole
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === currentUserRole
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {message.senderName}
                  </div>
                  <div className="text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === currentUserRole
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <div className="p-3 text-center">
          <p className="text-sm text-gray-600">Chat minimized</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
