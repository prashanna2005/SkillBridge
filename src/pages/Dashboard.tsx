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
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChatSession, setActiveChatSession] = useState<string | null>(
    null
  );

  // Role-based stats
  const getStats = () => {
    if (user?.role === "mentor") {
      return [
        {
          label: "Sessions Conducted",
          value: "45",
          icon: BookOpen,
          color: "bg-blue-500",
        },
        { label: "Students Mentored", value: "23", icon: Users, color: "bg-green-500" },
        {
          label: "Average Rating",
          value: "4.9",
          icon: Star,
          color: "bg-yellow-500",
        },
        {
          label: "Experience",
          value: user.experience ? `${user.experience} years` : "5+ years",
          icon: TrendingUp,
          color: "bg-purple-500",
        },
      ];
    } else if (user?.role === "both") {
      return [
        {
          label: "Sessions Completed",
          value: "28",
          icon: BookOpen,
          color: "bg-blue-500",
        },
        { label: "Hours Learned", value: "42", icon: Clock, color: "bg-green-500" },
        {
          label: "Sessions Conducted",
          value: "15",
          icon: Users,
          color: "bg-yellow-500",
        },
        {
          label: "Skills Mastered",
          value: "8",
          icon: TrendingUp,
          color: "bg-purple-500",
        },
      ];
    } else {
      // learner
      return [
        {
          label: "Sessions Completed",
          value: "12",
          icon: BookOpen,
          color: "bg-blue-500",
        },
        { label: "Hours Learned", value: "18", icon: Clock, color: "bg-green-500" },
        {
          label: "Average Rating",
          value: "4.8",
          icon: Star,
          color: "bg-yellow-500",
        },
        {
          label: "Skills Improved",
          value: "6",
          icon: TrendingUp,
          color: "bg-purple-500",
        },
      ];
    }
  };

  const stats = getStats();

  const upcomingSessions = [
    {
      id: 1,
      mentorName: "Saranya",
      date: "2024-03-20",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "confirmed",
    },
    {
      id: 2,
      mentorName: "Tejes",
      date: "2024-03-22",
      time: "10:00 AM",
      topic: "System Design Patterns",
      duration: 90,
      status: "confirmed",
    },
  ];

  const recentFeedback = [
    {
      id: 1,
      mentorName: "Jaivant",
      rating: 5,
      comment: "Excellent UI/UX guidance, very practical examples!",
      date: "2024-03-15",
    },
    {
      id: 2,
      mentorName: "Mowneesh",
      rating: 4,
      comment: "Good DevOps session, learned a lot about containerization.",
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
                Track your learning progress and manage your sessions
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview" },
                { id: "sessions", label: "Sessions" },
                { id: "feedback", label: "Feedback" },
                { id: "progress", label: "Progress" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Sessions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {session.topic}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              session.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {session.mentorName}
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
                        {session.status === "confirmed" && (
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
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Feedback */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Feedback
                  </h3>
                  <div className="space-y-4">
                    {recentFeedback.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {feedback.mentorName}
                          </h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">
                              {feedback.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {feedback.comment}
                        </p>
                        <p className="text-xs text-gray-500">{feedback.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sessions" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Session History
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mentor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Topic
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {upcomingSessions.map((session) => (
                        <tr key={session.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {session.mentorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {session.topic}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                session.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {session.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1">4.8</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "feedback" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Feedback History
                </h3>
                <div className="space-y-6">
                  {recentFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-gray-50 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {feedback.mentorName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= feedback.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } fill-current`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Learning Progress
                </h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Skills Development
                    </h4>
                    <div className="space-y-4">
                      {[
                        { skill: "React", progress: 85, level: "Advanced" },
                        {
                          skill: "TypeScript",
                          progress: 70,
                          level: "Intermediate",
                        },
                        {
                          skill: "Node.js",
                          progress: 60,
                          level: "Intermediate",
                        },
                        {
                          skill: "System Design",
                          progress: 40,
                          level: "Beginner",
                        },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {item.skill}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.progress}% complete
                          </div>
                        </div>
                      ))}
                    </div>
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
          currentUserRole={user?.role === "mentor" ? "mentor" : "learner"}
          currentUserName={user?.name || "You"}
          otherUserName={
            activeChatSession === "1"
              ? "Saranya"
              : activeChatSession === "2"
              ? "Tejas"
              : "Mentor"
          }
          isOpen={true}
          onClose={() => setActiveChatSession(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
