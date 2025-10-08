import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import React from "react";
import ChatBox from "../components/ChatBox";
import HelpDesk from "../components/HelpDesk"; // Added this import
import { useAuth } from "../context/AuthContext";

const MentorProfile = () => {
  const { user } = useAuth();
  const [activeChatSession, setActiveChatSession] = React.useState<
    string | null
  >(null);

  // Use user data
  const mentorData = {
    name: user?.name || "Mentor",
    email: user?.email || "",
    avatar: "/Prashanna1.jpg", // TODO: add avatar to user
    bio: user?.bio || "Experienced mentor passionate about teaching.",
    skills: user?.skills || ["React", "JavaScript"],
    languages: user?.languages || ["English"],
    experience: user?.experience ? `${user.experience} years` : "5+ years",
    rating: 4.9,
    reviews: 127,
    sessionCount: 245,
    location: "San Francisco, CA", // TODO: add location
  };

  // Your original mock accepted sessions
  const acceptedSessions = [
    {
      id: 1,
      learnerName: "Rohit",
      date: "2024-03-25",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "upcoming",
    },
    {
      id: 2,
      learnerName: "Raaj",
      date: "2024-03-22",
      time: "10:00 AM",
      topic: "TypeScript Best Practices",
      duration: 90,
      status: "completed",
    },
    {
      id: 3,
      learnerName: "Mowneesh",
      date: "2024-03-20",
      time: "3:00 PM",
      topic: "Next.js Performance",
      duration: 60,
      status: "completed",
    },
    {
      id: 4,
      learnerName: "Kapilan",
      date: "2024-03-28",
      time: "1:00 PM",
      topic: "GraphQL Implementation",
      duration: 120,
      status: "upcoming",
    },
  ];

  const upcomingSessions = acceptedSessions.filter(
    (session) => session.status === "upcoming"
  );
  const completedSessions = acceptedSessions.filter(
    (session) => session.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={mentorData.avatar}
              alt={mentorData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {mentorData.name}
                </h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Mentor
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">
                    {mentorData.rating}
                  </span>
                  <span className="text-gray-600">
                    ({mentorData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{mentorData.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 mb-4">
                <Mail className="h-4 w-4" />
                <span>{mentorData.email}</span>
              </div>

              <p className="text-gray-700 mb-4">{mentorData.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {mentorData.experience}
                    </div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {mentorData.sessionCount}
                    </div>
                    <div className="text-sm text-gray-600">Sessions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {mentorData.languages.length}
                    </div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills & Languages */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {mentorData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Languages
              </h2>
              <div className="space-y-2">
                {mentorData.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{language}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="lg:col-span-2 space-y-6">
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
                        <span>{session.learnerName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <span>{session.duration} min</span>
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
                          <span>Chat with {session.learnerName}</span>
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
                <BookOpen className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Completed Sessions
                </h2>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {completedSessions.length}
                </span>
              </div>
              <div className="space-y-4">
                {completedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {session.topic}
                      </h3>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {session.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{session.learnerName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <span>{session.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      {activeChatSession && (
        <ChatBox
          sessionId={activeChatSession}
          currentUserRole="mentor"
          currentUserName={user?.name || "Mentor"}
          otherUserName={
            activeChatSession === "1"
              ? "Rohit"
              : activeChatSession === "4"
              ? "Kapilan"
              : "Learner"
          }
          isOpen={true}
          onClose={() => setActiveChatSession(null)}
        />
      )}
      
      {/* Help Desk Support -- Added This Component */}
      <HelpDesk />
    </div>
  );
};

export default MentorProfile;