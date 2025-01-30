import { nanoid } from 'nanoid';

import { File } from '../../../../typings/marketplace/file';
import { Skill, SkillLevel } from '../../../../typings/marketplace/skill';

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
  file: null as File.Type | null,
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
  skills: [] as Skill[],
  skillLevels: {} as Partial<Record<Skill, SkillLevel>>,
  // Step 4
  experiences: [DEFAULT_EXPERIENCE],
  // Step 5
  certificates: [] as (typeof DEFAULT_CERTIFICATE)[],
};

export type DefaultValues = typeof DEFAULT_VALUES;
