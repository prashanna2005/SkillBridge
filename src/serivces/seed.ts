import { db } from './db';
import { mentors, skills as seedSkills } from '../data/mockData';
import { normalizeSkill } from './normalizeSkill';

const SEED_KEY = 'skillbridge_seeded_v1';

export async function seedIfNeeded() {
  if (localStorage.getItem(SEED_KEY)) return;

  await db.skills.bulkPut(
    seedSkills.map(s => ({
      id: normalizeSkill(s.name),
      displayName: s.name,
      category: s.category,
      trending: s.trending,
      mentorCount: s.mentorCount,
    }))
  );

  await db.users.bulkPut(
    mentors.map(m => ({
      id: m.email,
      name: m.name,
      email: m.email,
      role: 'mentor',
      skills: m.skills.map(normalizeSkill),
      bio: m.bio,
      avatar: m.avatar,
      rating: m.rating ?? 4.5,
    }))
  );

  localStorage.setItem(SEED_KEY, 'true');
}