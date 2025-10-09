import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../context/AuthContext";

const BothDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChatSession, setActiveChatSession] = useState<string | null>(
    null
  );

  // Combined Stats for Both Role
  const isMentor = user?.role === "mentor";

  const stats = [
    { label: "Sessions Completed", value: "28", icon: BookOpen, color: "bg-blue-500" },
    { label: "Hours Learned", value: "42", icon: Clock, color: "bg-green-500" },
    { label: "Sessions Conducted", value: "15", icon: Users, color: "bg-yellow-500" },
    {
      label: "Experience",
      value: user?.experience ? `${user.experience} years` : "3+ years",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  // Mock Data
  const sessions = [
    {
      id: 1,
      mentorName: "Sarah Chen",
      learnerName: "Arun Kumar",
      date: "2024-03-20",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "confirmed",
      rating: 5,
    },
    {
      id: 2,
      mentorName: "James Kim",
      learnerName: "Meera Nair",
      date: "2024-03-22",
      time: "10:00 AM",
      topic: "System Design Patterns",
      duration: 90,
      status: "completed",
      rating: 4,
    },
  ];

  const feedback = [
    {
      id: 1,
      name: "Arun Kumar",
      rating: 5,
      comment: "Excellent session, very practical insights!",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "James Kim",
      rating: 4,
      comment: "Helpful and informative. Great communication.",
      date: "2024-03-12",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-gray-600">
                Manage your learning and mentoring activities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["overview", "sessions", "feedback"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Upcoming Activities
                  </h3>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {session.topic}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              session.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {isMentor ? session.learnerName : session.mentorName}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {session.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {session.time}
                          </div>
                        </div>
                        <div className="mt-3">
                          <button
                            onClick={() =>
                              setActiveChatSession(session.id.toString())
                            }
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Open Chat</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
                  <div className="space-y-4">
                    {feedback.map((fb) => (
                      <div key={fb.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{fb.name}</h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">
                              {fb.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{fb.comment}</p>
                        <p className="text-xs text-gray-500">{fb.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Box */}
      {activeChatSession && (
        <ChatBox
          sessionId={activeChatSession}
          currentUserRole={isMentor ? "mentor" : "learner"}
          currentUserName={user?.name || "User"}
          otherUserName={isMentor ? "Learner" : "Mentor"}
          isOpen={true}
          onClose={() => setActiveChatSession(null)}
        />
      )}
    </div>
  );
};

export default BothDashboard;
