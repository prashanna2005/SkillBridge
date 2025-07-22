import React from "react";
import {
  Star,
  Calendar,
  Clock,
  User,
  BookOpen,
  MessageSquare,
  Award,
} from "lucide-react";
import ChatBox from "../components/ChatBox";
import HelpDesk from "../components/HelpDesk";
import { useAuth } from "../context/AuthContext";

const LearnerProfile = () => {
  const { user } = useAuth();
  const [activeChatSession, setActiveChatSession] = React.useState<
    string | null
  >(null);

  // Mock learner data
  const learnerData = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatar:
      "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400",
    joinDate: "January 2024",
    totalSessions: 12,
    averageRating: 4.8,
  };

  // Mock sessions attended
  const sessionsAttended = [
    {
      id: 1,
      mentorName: "Sarah Chen",
      date: "2024-03-20",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      mentorName: "James Kim",
      date: "2024-03-18",
      time: "10:00 AM",
      topic: "System Design Patterns",
      duration: 90,
      status: "completed",
      rating: 5,
    },
    {
      id: 3,
      mentorName: "Aisha Patel",
      date: "2024-03-15",
      time: "3:00 PM",
      topic: "UI/UX Design Principles",
      duration: 60,
      status: "completed",
      rating: 4,
    },
    {
      id: 4,
      mentorName: "Michael Rodriguez",
      date: "2024-03-25",
      time: "1:00 PM",
      topic: "Node.js Best Practices",
      duration: 75,
      status: "upcoming",
      rating: null,
    },
  ];

  // Mock feedback data
  const feedbackData = [
    {
      id: 1,
      mentorName: "Sarah Chen",
      rating: 5,
      comment:
        "Excellent session on React Hooks! Sarah explained complex concepts in a very understandable way. The practical examples were extremely helpful.",
      date: "2024-03-20",
      topic: "React Hooks Deep Dive",
    },
    {
      id: 2,
      mentorName: "James Kim",
      rating: 5,
      comment:
        "Amazing system design session. James provided great insights into scalable architecture patterns and real-world examples from his experience.",
      date: "2024-03-18",
      topic: "System Design Patterns",
    },
    {
      id: 3,
      mentorName: "Aisha Patel",
      rating: 4,
      comment:
        "Good UI/UX session with practical design tips. Would have liked more hands-on exercises, but overall very informative.",
      date: "2024-03-15",
      topic: "UI/UX Design Principles",
    },
  ];

  const completedSessions = sessionsAttended.filter(
    (session) => session.status === "completed"
  );
  const upcomingSessions = sessionsAttended.filter(
    (session) => session.status === "upcoming"
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={learnerData.avatar}
              alt={learnerData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {learnerData.name}
                </h1>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Learner
                </span>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 mb-4">
                <User className="h-4 w-4" />
                <span>{learnerData.email}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {learnerData.totalSessions}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sessions Attended
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {learnerData.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">
                      Average Rating Given
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {learnerData.joinDate}
                    </div>
                    <div className="text-sm text-gray-600">Member Since</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sessions Section */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Upcoming Sessions
                </h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {upcomingSessions.length}
                </span>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {session.topic}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {session.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{session.mentorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                    {session.status === "upcoming" && (
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            setActiveChatSession(session.id.toString())
                          }
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Chat with {session.mentorName}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No upcoming sessions</p>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Completed Sessions
                </h2>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {completedSessions.length}
                </span>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {completedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {session.topic}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {session.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{session.mentorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <span>{session.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                My Feedback
              </h2>
            </div>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {feedbackData.map((feedback) => (
                <div
                  key={feedback.id}
                  className="border-l-4 border-purple-500 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {feedback.topic}
                      </h4>
                      <p className="text-sm text-gray-600">
                        with {feedback.mentorName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= feedback.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } fill-current`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    "{feedback.comment}"
                  </p>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      {activeChatSession && (
        <ChatBox
          sessionId={activeChatSession}
          currentUserRole="learner"
          currentUserName={user?.name || "Learner"}
          otherUserName={
            activeChatSession === "4" ? "Michael Rodriguez" : "Mentor"
          }
          isOpen={true}
          onClose={() => setActiveChatSession(null)}
        />
      )}

      {/* Help Desk Support */}
      <HelpDesk />
    </div>
  );
};

export default LearnerProfile;
