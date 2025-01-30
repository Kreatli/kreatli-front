import { SKILL_LEVELS, SKILLS } from '../../constants/marketplace/skills';

export type Skill = (typeof SKILLS)[keyof typeof SKILLS];

export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];
