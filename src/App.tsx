import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Mentors from "./pages/Mentors";
import Booking from "./pages/Booking";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogoShowcase from "./pages/LogoShowcase";
import MentorProfile from "./pages/MentorProfile";
import LearnerProfile from "./pages/LearnerProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logos" element={<LogoShowcase />} />
              <Route path="/mentor-profile" element={<MentorProfile />} />
              <Route path="/learner-profile" element={<LearnerProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
