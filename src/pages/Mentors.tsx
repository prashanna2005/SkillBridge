import { BookOpen, Filter, Search, Star, Users } from 'lucide-react';
import { useState } from 'react';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mockData';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('rating');

  const filterAndSortMentors = () => {
    let filtered = mentors.filter(mentor => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSkill = selectedSkill === '' || mentor.skills.includes(selectedSkill);
      const matchesLocation = selectedLocation === '' || mentor.location.includes(selectedLocation);

      const matchesPrice =
        priceRange === '' ||
        (() => {
          switch (priceRange) {
            case 'under30': return mentor.hourlyRate < 30;
            case '10-30': return mentor.hourlyRate >= 10 && mentor.hourlyRate <= 30;
            case '20-40': return mentor.hourlyRate >= 20 && mentor.hourlyRate <= 40;
            case 'over35': return mentor.hourlyRate > 35;
            default: return true;
          }
        })();

      return matchesSearch && matchesSkill && matchesLocation && matchesPrice;
    });

    // Sorting logic
    switch (sortOption) {
      case 'priceLowHigh':
        filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'priceHighLow':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating); // assuming `mentor.rating` exists
        break;
      case 'experience':
       filtered.sort((a, b) => (Number(b.experience) || 0) - (Number(a.experience) || 0));
 // assuming `mentor.experience` exists
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredMentors = filterAndSortMentors();

  const uniqueSkills = [...new Set(mentors.flatMap(mentor => mentor.skills))];
  const uniqueLocations = ['India', 'US', 'Canada', 'Australia', 'UK', 'Russia'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with skilled professionals who are ready to guide you on your learning journey
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search mentors by name, skill, or expertise..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-4">
                {/* Skill Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                  >
                    <option value="">All Skills</option>
                    {uniqueSkills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="">All Prices</option>
                    <option value="under30">Under $30/hr</option>
                    <option value="10-30">$10-30/hr</option>
                    <option value="20-40">$20-40/hr</option>
                    <option value="over35">Over $35/hr</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedSkill('');
                    setSelectedLocation('');
                    setPriceRange('');
                    setSearchTerm('');
                    setSortOption('rating');
                  }}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">2,500+</div>
                    <div className="text-sm text-gray-600">Active Mentors</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-900">15,000+</div>
                    <div className="text-sm text-gray-600">Sessions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-gray-900">4.8/5</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredMentors.length} Mentors Found
              </h2>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="rating">Sort by Rating</option>
                <option value="priceLowHigh">Sort by Price (Low to High)</option>
                <option value="priceHighLow">Sort by Price (High to Low)</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No mentors found matching your criteria
                </div>
                <button
                  onClick={() => {
                    setSelectedSkill('');
                    setSelectedLocation('');
                    setPriceRange('');
                    setSearchTerm('');
                    setSortOption('rating');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
