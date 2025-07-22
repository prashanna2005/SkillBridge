import React from 'react';
import { 
  BookOpen, 
  Zap, 
  Users, 
  Target, 
  TrendingUp, 
  Layers, 
  GitBranch, 
  Compass,
  Hexagon,
  Triangle,
  Circle,
  Square
} from 'lucide-react';

const LogoShowcase = () => {
  const logoDesigns = [
    {
      id: 1,
      name: "Lightning Bridge (Current)",
      description: "Dynamic lightning bolt representing quick skill bridging and energy",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-80"></div>
        </div>
      )
    },
    {
      id: 2,
      name: "Connected Users",
      description: "Two users connecting, emphasizing peer-to-peer mentorship",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
        </div>
      )
    },
    {
      id: 3,
      name: "Target Growth",
      description: "Target symbol representing focused skill development and goals",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Target className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-90"></div>
        </div>
      )
    },
    {
      id: 4,
      name: "Trending Skills",
      description: "Upward trend representing skill growth and learning progress",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
            <TrendingUp className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        </div>
      )
    },
    {
      id: 5,
      name: "Layered Learning",
      description: "Stacked layers representing building knowledge step by step",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Layers className="h-7 w-7 text-white" />
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"></div>
        </div>
      )
    },
    {
      id: 6,
      name: "Skill Branching",
      description: "Git branch symbol representing diverse learning paths and connections",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <GitBranch className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-80"></div>
        </div>
      )
    },
    {
      id: 7,
      name: "Navigation Compass",
      description: "Compass representing guidance and direction in learning journey",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Compass className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
        </div>
      )
    },
    {
      id: 8,
      name: "Geometric Bridge",
      description: "Abstract hexagon with connecting elements, modern and minimal",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Hexagon className="h-7 w-7 text-white" />
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"></div>
        </div>
      )
    },
    {
      id: 9,
      name: "Classic Book (Original)",
      description: "Traditional book icon representing knowledge and learning",
      component: (
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SkillBridge Logo Options</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect logo design that represents your peer-to-peer mentorship platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logoDesigns.map((logo) => (
            <div key={logo.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  {logo.component}
                  <div>
                    <span className="text-2xl font-bold text-gray-900">SkillBridge</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{logo.name}</h3>
                  <p className="text-sm text-gray-600">{logo.description}</p>
                </div>

                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Select This Logo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Logo in Context Preview */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Logo in Context Preview</h2>
          
          {/* Navbar Preview */}
          <div className="bg-white border-b border-gray-200 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-80"></div>
                </div>
                <span className="text-2xl font-bold text-gray-900">SkillBridge</span>
              </div>
              <div className="flex space-x-6 text-sm text-gray-600">
                <span>Home</span>
                <span>About</span>
                <span>Mentors</span>
                <span>Contact</span>
              </div>
            </div>
          </div>

          {/* Hero Section Preview */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/30 rounded-full"></div>
              </div>
              <span className="text-3xl font-bold">SkillBridge</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Bridge Your Skills to Real Growth</h1>
            <p className="text-blue-100">Connect with skilled mentors and passionate learners</p>
          </div>
        </div>

        {/* Design Principles */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Logo Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">✨ Modern & Minimal</h4>
              <p>Clean, simple designs that work well at any size</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎨 Brand Colors</h4>
              <p>Blue to purple gradients representing growth and connection</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Meaningful Symbols</h4>
              <p>Icons that represent mentorship, learning, and skill development</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📱 Scalable Design</h4>
              <p>Works perfectly on mobile, desktop, and print materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;