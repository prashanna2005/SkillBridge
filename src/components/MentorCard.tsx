import React, { useState } from "react";
import { Star, MapPin, Clock, Languages, Award, Sparkles } from "lucide-react";
import { User } from "../types";

interface MentorCardProps {
  mentor: User;
  onClick?: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onClick }) => {
  const [aiBio, setAiBio] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: mentor.name,
          skills: mentor.skills,
          experience: mentor.experience,
          sessionCount: mentor.sessionCount,
        }),
      });

      const data = await response.json();
      setAiBio(data.bio);
    } catch (error) {
      setAiBio("⚠️ Failed to generate bio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
            {mentor.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {mentor.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({mentor.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-1 text-gray-600">
            <MapPin className="h-3 w-3" />
            <span className="text-sm">{mentor.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            ${mentor.hourlyRate}
          </div>
          <div className="text-sm text-gray-500">per hour</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

      {/* 🔹 Generate AI Bio Button */}
      <button
        className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
        onClick={(e) => {
          e.stopPropagation();
          generateBio();
        }}
        disabled={loading}
      >
        <Sparkles className="inline-block h-4 w-4 mr-1" />
        {loading ? "Generating..." : "Generate Bio"}
      </button>

      {/* 🔹 Display AI Bio */}
      {aiBio && (
        <div className="mt-3 text-sm bg-gray-100 p-3 rounded text-gray-700">
          <strong>AI-Generated Bio:</strong>
          <br />
          {aiBio}
        </div>
      )}

      <div className="flex flex-wrap gap-2 my-4">
        {mentor.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
        {mentor.skills.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
            +{mentor.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{mentor.experience}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>{mentor.sessionCount} sessions</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Languages className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {mentor.languages.slice(0, 2).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
