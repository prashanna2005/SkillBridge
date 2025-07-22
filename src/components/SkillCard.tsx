import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{skill.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {skill.name}
            </h3>
            <p className="text-sm text-gray-500">{skill.category}</p>
          </div>
        </div>
        {skill.trending && (
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">Trending</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-1 text-gray-600">
        <Users className="h-4 w-4" />
        <span className="text-sm">{skill.mentorCount} mentors available</span>
      </div>
    </div>
  );
};

export default SkillCard;