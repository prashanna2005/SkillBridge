import {
  Bell,
  BookOpen,
  Menu,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      learnerName: "Mowneesh",
      date: "2024-03-25",
      time: "2:00 PM",
      topic: "React Hooks Deep Dive",
      duration: 60,
      status: "pending",
    },
    {
      id: 2,
      learnerName: "Jaivant",
      date: "2024-03-26",
      time: "10:00 AM",
      topic: "System Design Patterns",
      duration: 90,
      status: "pending",
    },
    {
      id: 3,
      learnerName: "Yeswanth",
      date: "2024-03-27",
      time: "3:00 PM",
      topic: "TypeScript Best Practices",
      duration: 60,
      status: "pending",
    },
  ]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/mentors", label: "Find Mentors" },
    { path: "/booking", label: "Book Session" },
    { path: "/feedback", label: "Feedback" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAcceptRequest = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    // Here you would typically add to upcoming sessions
    alert("Session request accepted!");
  };

  const handleDeclineRequest = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    alert("Session request declined.");
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    setShowNotifications(false);
    navigate("/");
  };

  const pendingCount = notifications.filter(
    (n) => n.status === "pending"
  ).length;
  const userRole = user?.role || "learner";

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              SkillBridge
            </span>
          </Link>

          {/* Desktop Navigation - Center Aligned */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Right Aligned */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Show Notification and Profile only when logged in */}
            {isLoggedIn && (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <Bell className="h-6 w-6" />
                    {(userRole === "mentor" || userRole === "both") &&
                      pendingCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                          {pendingCount}
                        </span>
                      )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Session Requests
                        </h3>
                        <p className="text-sm text-gray-600">
                          {pendingCount} pending requests
                        </p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {(userRole === "mentor" || userRole === "both") &&
                        notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {notification.learnerName}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {notification.topic}
                                  </p>
                                </div>
                                <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">
                                  Pending
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
                                <span>📅 {notification.date}</span>
                                <span>🕐 {notification.time}</span>
                                <span>⏱️ {notification.duration} min</span>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleAcceptRequest(notification.id)
                                  }
                                  className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeclineRequest(notification.id)
                                  }
                                  className="flex-1 py-2 px-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>
                              {userRole === "learner"
                                ? "Notifications are for mentors only"
                                : "No pending requests"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <User className="h-6 w-6" />
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <Link
                          to={
                            userRole === "both"
                              ? "/both-profile"
                              : userRole === "mentor"
                              ? "/mentor-profile"
                              : "/learner-profile"
                          }
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowProfile(false)}
                        >
                          View Profile
                        </Link>
                        <Link
                          to={
                            userRole === "both"
                              ? "/both-dashboard"
                              : "/dashboard"
                          }
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowProfile(false)}
                        >
                          Dashboard
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Login/Signup Buttons - Show when logged out */}
            {!isLoggedIn && (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-md font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-4 space-y-2 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {/* Mobile Notifications - Only when logged in */}
              {isLoggedIn && (
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  <span>Notifications</span>
                  {(userRole === "mentor" || userRole === "both") &&
                    pendingCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {pendingCount}
                      </span>
                    )}
                </button>
              )}

              {/* Mobile Profile - Only when logged in */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    navigate(
                      userRole === "both"
                        ? "/both-profile"
                        : userRole === "mentor"
                        ? "/mentor-profile"
                        : "/learner-profile"
                    );
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Profile
                </button>
              )}

              {/* Mobile Dashboard - Only when logged in */}
              {isLoggedIn && (
                <Link
                  to={
                    userRole === "both"
                      ? "/both-dashboard"
                      : "/dashboard"
                  }
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile Login/Logout */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-md font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
