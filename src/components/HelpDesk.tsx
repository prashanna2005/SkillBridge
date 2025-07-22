import React, { useState, useRef, useEffect } from "react";
import {
  Headphones, // Changed from MessageSquareText
  X,
  Send,
  Minimize2,
  Maximize2,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

interface HelpDeskProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const HelpDesk: React.FC<HelpDeskProps> = ({ isVisible = true, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const faqMessages = [
    "👋 Welcome to SkillBridge Help Desk! How can I assist you today?",
    "📚 Common questions:",
    "• How can I book a session?",
    "• How do I update my profile?",
    "• Where can I view my upcoming sessions?",
    "• How do I cancel a session?",
    "• How can I become a mentor?",
    "Feel free to ask any question!",
  ];

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages: Message[] = faqMessages.map((text, index) => ({
        id: `faq-${index}`,
        text,
        sender: "support",
        timestamp: new Date(Date.now() - (faqMessages.length - index) * 1000),
      }));
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const responses = [
        "Thanks for your question! Let me help you with that.",
        "I understand your concern. Here's what you can do:",
        "Great question! You can find this information in your dashboard.",
        "I'm here to help! Let me guide you through this process.",
        "That's a common question. Here's the solution:",
        "Thanks for reaching out! I'll be happy to assist you.",
      ];

      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, supportMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Help Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-9 left-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
          aria-label="Open Help Desk"
        >
          <Headphones className="h-6 w-6 group-hover:rotate-6 transition-transform duration-300" />{" "}
          {/* Changed icon and removed animate-ping div */}
        </button>
      )}

      {/* Help Desk Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <Headphones className="h-5 w-5" /> {/* Changed icon in header */}
              <div>
                <h3 className="font-semibold">SkillBridge Help Desk</h3>
                <p className="text-xs text-blue-100">We're here to help!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close Help Desk"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">
                        {message.text}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === "user"
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

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-gray-200 bg-white">
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    "How to book a session?",
                    "Update my profile",
                    "View upcoming sessions",
                    "Cancel a session",
                  ].map((quickAction, index) => (
                    <button
                      key={index}
                      onClick={() => setNewMessage(quickAction)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      {quickAction}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 bg-white rounded-b-xl"
              >
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Click on quick actions above or type your own question
                </p>
              </form>
            </>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div className="p-3 text-center bg-white rounded-b-xl">
              <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Help Desk minimized</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HelpDesk;
