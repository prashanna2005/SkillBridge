import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";
import Booking from "./pages/Booking";
import BothDashboard from "./pages/BothDashboard";
import BothProfile from "./pages/BothProfile";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Landing from "./pages/Landing";
import LearnerProfile from "./pages/LearnerProfile";
import Login from "./pages/Login";
import LogoShowcase from "./pages/LogoShowcase";
import MentorProfile from "./pages/MentorProfile";
import Mentors from "./pages/Mentors";

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
              <Route path="/mentor-dashboard" element={<Dashboard />} />
              <Route path="/both-dashboard" element={<BothDashboard />} />
              <Route path="/both-profile" element={<BothProfile />} />
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
