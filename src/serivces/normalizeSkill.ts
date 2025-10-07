export function normalizeSkill(skillName: string): string {
  return skillName.trim().toLowerCase().replace(/\s+/g, '-');
}