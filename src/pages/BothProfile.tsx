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
  TrendingUp,
} from "lucide-react";
import React from "react";
import ChatBox from "../components/ChatBox";
import HelpDesk from "../components/HelpDesk";
import { useAuth } from "../context/AuthContext";

const BothProfile = () => {
  const { user } = useAuth();
  const [activeChatSession, setActiveChatSession] = React.useState<
    string | null
  >(null);

  // Use user data for both roles
  const profileData = {
    name: user?.name || "Mentor & Learner",
    email: user?.email || "",
    avatar: "/Prashanna1.jpg", // TODO: add avatar to user
    bio: user?.bio || "Experienced mentor passionate about teaching and continuous learning.",
    skills: user?.skills || ["React", "JavaScript", "TypeScript"],
    languages: user?.languages || ["English", "Spanish"],
    experience: user?.experience ? `${user.experience} years` : "5+ years",
    rating: 4.9,
    reviews: 127,
    sessionCount: 245,
    totalSessionsAttended: 12,
    averageRatingGiven: 4.8,
    joinDate: "January 2024",
    location: "San Francisco, CA", // TODO: add location
  };

  // Sessions as Mentor
  const acceptedSessionsAsMentor = [
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
  ];

  // Sessions as Learner
  const sessionsAttended = [
    {
      id: 3,
      mentorName: "Sarah Chen",
      date: "2024-03-20",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "completed",
      rating: 5,
    },
    {
      id: 4,
      mentorName: "James Kim",
      date: "2024-03-18",
      time: "10:00 AM",
      topic: "System Design Patterns",
      duration: 90,
      status: "completed",
      rating: 5,
    },
  ];

  // Feedback as Mentor
  const feedbackReceived = [
    {
      id: 1,
      learnerName: "Mowneesh",
      rating: 4,
      comment: "Good session, learned a lot about DevOps.",
      date: "2024-03-12",
    },
  ];

  // Feedback as Learner
  const feedbackGiven = [
    {
      id: 2,
      mentorName: "Jaivant",
      rating: 5,
      comment: "Excellent UI/UX guidance, very practical examples!",
      date: "2024-03-15",
    },
  ];

  const upcomingSessionsAsMentor = acceptedSessionsAsMentor.filter(
    (session) => session.status === "upcoming"
  );
  const completedSessionsAsMentor = acceptedSessionsAsMentor.filter(
    (session) => session.status === "completed"
  );

  const completedSessionsAsLearner = sessionsAttended.filter(
    (session) => session.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.name}
                </h1>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Mentor & Learner
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">
                    {profileData.rating}
                  </span>
                  <span className="text-gray-600">
                    ({profileData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 mb-4">
                <Mail className="h-4 w-4" />
                <span>{profileData.email}</span>
              </div>

              <p className="text-gray-700 mb-4">{profileData.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {profileData.experience}
                    </div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {profileData.sessionCount}
                    </div>
                    <div className="text-sm text-gray-600">Sessions Conducted</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {profileData.totalSessionsAttended}
                    </div>
                    <div className="text-sm text-gray-600">Sessions Attended</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {profileData.languages.length}
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
                {profileData.skills.map((skill, index) => (
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
                {profileData.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Learning Progress
              </h2>
              <div className="space-y-4">
                {[
                  { skill: "React", progress: 85 },
                  { skill: "TypeScript", progress: 70 },
                  { skill: "Node.js", progress: 60 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {item.skill}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* As Mentor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Mentoring Sessions
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Upcoming Sessions
                  </h3>
                  {upcomingSessionsAsMentor.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 bg-purple-50 rounded-lg border border-purple-100"
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
                  {upcomingSessionsAsMentor.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No upcoming mentoring sessions</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Completed Sessions
                  </h3>
                  {completedSessionsAsMentor.map((session) => (
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
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* As Learner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Learning Sessions
                </h2>
              </div>
              <div className="space-y-4">
                {completedSessionsAsLearner.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-green-50 rounded-lg border border-green-100"
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

            {/* Feedback */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Feedback
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Feedback Received (As Mentor)
                  </h3>
                  {feedbackReceived.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border-l-4 border-purple-500 pl-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {feedback.learnerName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center">
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
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Feedback Given (As Learner)
                  </h3>
                  {feedbackGiven.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border-l-4 border-green-500 pl-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {feedback.mentorName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center">
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
                    </div>
                  ))}
                </div>
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
              : activeChatSession === "2"
              ? "Raaj"
              : "Learner"
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

export default BothProfile;
