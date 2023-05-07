import { nanoid } from 'nanoid';

import { Skill, SkillLevel } from '../../../typings/skill';

export const DEFAULT_EXPERIENCE = {
  id: nanoid(),
  imageUrl: '',
  companyName: '',
  companyUrl: '',
  description: '',
};

export const DEFAULT_CERTIFICATE = {
  id: nanoid(),
  name: '',
  fileUrl: '',
  share: false,
};

export const DEFAULT_VALUES = {
  // Step 1
  email: '',
  password: '',
  name: '',
  country: '',
  // Step 2
  avatarUrl: '',
  description: '',
  portfolioUrl: '',
  discordUsername: '',
  twitterUrl: '',
  instagramUsername: '',
  // Step 3
  skills: [],
  skillLevels: {} as Partial<Record<Skill, SkillLevel>>,
  // Step 4
  experiences: [DEFAULT_EXPERIENCE],
  // Step 5
  certificates: [DEFAULT_CERTIFICATE],
};

export type DefaultValues = typeof DEFAULT_VALUES;
