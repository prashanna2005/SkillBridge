import Dexie, { Table } from 'dexie';

export interface Skill {
  id: string;
  displayName: string;
  category: string;
  trending: boolean;
  mentorCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee';
  skills: string[];
  bio: string;
  avatar: string;
  rating: number;
}

class SkillBridgeDB extends Dexie {
  skills!: Table<Skill, string>;
  users!: Table<User, string>;

  constructor() {
    super('SkillBridgeDB');
    this.version(1).stores({
      skills: 'id',
      users: 'id',
    });
  }
}

export const db = new SkillBridgeDB();