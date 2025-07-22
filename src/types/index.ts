export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: string[];
  location: string;
  experience: string;
  languages: string[];
  sessionCount: number;
}

export interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  topic: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  duration: number;
}

export interface Feedback {
  id: string;
  sessionId: string;
  rating: number;
  comment: string;
  mentorId: string;
  menteeId: string;
  date: string;
}

export interface Skill {
  name: string;
  category: string;
  trending: boolean;
  mentorCount: number;
}