import { User, Skill } from '../types';

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', trending: true, mentorCount: 124 },
  { name: 'Python', category: 'Backend', trending: true, mentorCount: 98 },
  { name: 'Machine Learning', category: 'AI/ML', trending: true, mentorCount: 76 },
  { name: 'Node.js', category: 'Backend', trending: true, mentorCount: 89 },
  { name: 'UI/UX Design', category: 'Design', trending: true, mentorCount: 67 },
  { name: 'DevOps', category: 'Infrastructure', trending: true, mentorCount: 54 },
  { name: 'TypeScript', category: 'Frontend', trending: false, mentorCount: 91 },
  { name: 'Java', category: 'Backend', trending: false, mentorCount: 145 },
];

export const mentors: User[] = [
  {
    id: '1',
    name: 'Prashanna',
    email: 'prashanna@email.com',
    avatar: '/public/Prashanna1.jpg',
    bio: 'Senior Frontend Developer with 5+ years of experience in React and modern web technologies.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 25,
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'India',
    experience: '5+ years',
    languages: ['English', 'Tamil' ],
    sessionCount: 245
  },
  {
    id: '2',
    name: 'Saranya',
    email: 'saranya@email.com',
    avatar: '/public/saranya.jpg',
    bio: 'Full-stack developer and ML enthusiast. Passionate about teaching and helping others grow.',
    skills: ['Python', 'Machine Learning', 'Django', 'TensorFlow'],
    rating: 4.8,
    reviews: 93,
    hourlyRate: 10,
    availability: ['Tue', 'Thu', 'Sat'],
    location: 'US',
    experience: '4+ years',
    languages: ['English', 'Kannada'],
    sessionCount: 156
  },
  {
    id: '3',
    name: 'Jaivant',
    email: 'jaivant@email.com',
    avatar: '/public/jaivant.jpg',
    bio: 'Product Designer with expertise in user research and interaction design.',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    rating: 4.9,
    reviews: 164,
    hourlyRate: 30,
    availability: ['Mon', 'Tue', 'Thu'],
    location: 'Canada',
    experience: '6+ years',
    languages: ['English', 'Hindi'],
    sessionCount: 312
  },
  {
    id: '4',
    name: 'Mowneesh',
    email: 'mowneesh@email.com',
    avatar: '/public/mowneesh.jpg',
    bio: 'DevOps engineer specializing in cloud infrastructure and automation.',
    skills: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    rating: 4.7,
    reviews: 78,
    hourlyRate: 40,
    availability: ['Wed', 'Fri', 'Sun'],
    location: 'Australia',
    experience: '7+ years',
    languages: ['English' , 'German'],
    sessionCount: 189
  },
  {
    id: '5',
    name: 'Yeswanth',
    email: 'yeswanth@email.com',
    avatar: '/public/yeswanth.jpg',
    bio: 'Mobile app developer with expertise in React Native and cross-platform development.',
    skills: ['React Native', 'Mobile Development', 'JavaScript', 'Swift'],
    rating: 4.8,
    reviews: 112,
    hourlyRate: 20,
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'UK',
    experience: '4+ years',
    languages: ['English', 'French'],
    sessionCount: 203
  },
  {
    id: '6',
    name: 'Rohit',
    email: 'rohit@email.com',
    avatar: '/public/rohit.jpg',
    bio: 'Backend engineer with strong expertise in system design and database optimization.',
    skills: ['Node.js', 'PostgreSQL', 'System Design', 'GraphQL'],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 35,
    availability: ['Tue', 'Thu', 'Sat'],
    location: 'Russia',
    experience: '8+ years',
    languages: ['English', 'Korean'],
    sessionCount: 298
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Pavan',
    role: 'Computer Science Student',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    comment: "SkillBridge connected me with an amazing React mentor who helped me land my first internship. The structured feedback system made every session valuable.",
    rating: 5
  },
  {
    id: '2',
    name: 'Titan Sojo',
    role: 'Bootcamp Graduate',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    comment: "As a career changer, I needed personalized guidance. My mentor on SkillBridge provided exactly that and more. Now I'm a confident full-stack developer!",
    rating: 5
  },
  {
    id: '3',
    name: 'Madhumitha',
    role: 'Software Engineer',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    comment: "Being a mentor on SkillBridge has been incredibly rewarding. The platform makes it easy to share knowledge and help the next generation of developers.",
    rating: 5
  }
];