import { CheckCircle, Star } from 'lucide-react';
import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    sessionId: '',
    rating: 0,
    mentorRating: 0,
    learningGoalsMet: 0,
    communicationRating: 0,
    comment: '',
    improvements: '',
    recommend: 'yes'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void; name: string }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. It helps us improve our platform and assists other learners in choosing the right mentors.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 pt-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Session Feedback
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Help us improve by sharing your mentorship session experience
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Session Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Session
                </label>
                <select
                  name="sessionId"
                  value={formData.sessionId}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose a completed session</option>
                  <option value="session1">React Hooks with Prashanna - july 7, 2025</option>
                  <option value="session2">System Design with Raj - july 9, 2025</option>
                  <option value="session3">UI/UX Design with Kapilan - july 12, 2025</option>
                </select>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Session Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => setFormData({ ...formData, rating })}
                  name="rating"
                />
                <p className="text-sm text-gray-500 mt-2">How would you rate this session overall?</p>
              </div>

              {/* Mentor Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Mentor Performance
                </label>
                <StarRating
                  rating={formData.mentorRating}
                  onRatingChange={(rating) => setFormData({ ...formData, mentorRating: rating })}
                  name="mentorRating"
                />
                <p className="text-sm text-gray-500 mt-2">How effective was your mentor in teaching and guidance?</p>
              </div>

              {/* Learning Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Learning Goals Achievement
                </label>
                <StarRating
                  rating={formData.learningGoalsMet}
                  onRatingChange={(rating) => setFormData({ ...formData, learningGoalsMet: rating })}
                  name="learningGoalsMet"
                />
                <p className="text-sm text-gray-500 mt-2">How well did the session meet your learning objectives?</p>
              </div>

              {/* Communication Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Communication Quality
                </label>
                <StarRating
                  rating={formData.communicationRating}
                  onRatingChange={(rating) => setFormData({ ...formData, communicationRating: rating })}
                  name="communicationRating"
                />
                <p className="text-sm text-gray-500 mt-2">How clear and helpful was the mentor's communication?</p>
              </div>

              {/* Written Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did you like most about this session?
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share the highlights of your session..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Improvements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What could be improved?
                </label>
                <textarea
                  name="improvements"
                  value={formData.improvements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Share suggestions for improvement..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you recommend this mentor to others?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="yes"
                      checked={formData.recommend === 'yes'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Yes, definitely
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="maybe"
                      checked={formData.recommend === 'maybe'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Maybe
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="no"
                      checked={formData.recommend === 'no'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">by Kavin </span>
              </div>
              <p className="text-gray-700 text-sm">
                "Excellent session on React Hooks! Prashanna explained complex concepts in a very understandable way."
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'} fill-current`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">by Vishvanth</span>
              </div>
              <p className="text-gray-700 text-sm">
                "Rohit provided great insights into system design. The session was well-structured and practical."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;