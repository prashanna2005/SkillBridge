import { ArrowRight, CheckCircle, Target, TrendingUp, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Bridging the Gap Between{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Learning & Growth
                  </span>
                </h1>
                <p className="text-lg text-gray-600">
                  SkillBridge was created to solve the fundamental challenge of accessible, personalized mentorship in the rapidly evolving tech industry.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Problem We're Solving
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              In today's fast-paced tech industry, finding quality mentorship and guidance is one of the biggest challenges for aspiring developers and professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Limited Access</h3>
              <p className="text-gray-600">
                Traditional mentorship programs are often exclusive, expensive, or have long waiting lists that prevent many from accessing quality guidance.
              </p>
            </div>
            
            <div className="text-center p-8 bg-yellow-50 rounded-xl">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mismatched Connections</h3>
              <p className="text-gray-600">
                Finding the right mentor with relevant skills and experience in your specific area of interest is challenging and time-consuming.
              </p>
            </div>
            
            <div className="text-center p-8 bg-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lack of Structure</h3>
              <p className="text-gray-600">
                Many mentorship relationships lack proper structure, feedback mechanisms, and goal-setting, leading to ineffective learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solution: Peer-to-Peer Mentorship
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              SkillBridge creates a collaborative learning environment where students and professionals can both teach and learn from each other.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessible & Affordable</h3>
                  <p className="text-gray-600">
                    Our peer-to-peer model makes mentorship affordable and accessible to everyone, regardless of background or financial situation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
                  <p className="text-gray-600">
                    Advanced algorithms match learners with mentors based on skills, experience level, learning goals, and personality fit.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Structured Learning</h3>
                  <p className="text-gray-600">
                    Built-in feedback systems, goal tracking, and session management ensure productive and measurable learning outcomes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
                  <p className="text-gray-600">
                    Foster a supportive community where knowledge sharing and collaborative learning are the foundation of growth.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Collaborative learning"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Since our launch, SkillBridge has been transforming how people learn and grow in the tech industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">8,000+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            To democratize access to quality mentorship and create a world where anyone can learn from anyone, breaking down barriers and fostering collaborative growth in the tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/mentors"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;