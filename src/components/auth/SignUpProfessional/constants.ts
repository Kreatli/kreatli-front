import { nanoid } from 'nanoid';
import { FieldPath, RegisterOptions } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
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

export const VALIDATIONS: Partial<Record<FieldPath<DefaultValues>, RegisterOptions>> = {
  email: VALIDATION_RULES.EMAIL,
  password: VALIDATION_RULES.PASSWORD,
  name: VALIDATION_RULES.SHORT_TEXT,
  avatarUrl: VALIDATION_RULES.REQUIRED,
  country: VALIDATION_RULES.REQUIRED,
  description: VALIDATION_RULES.DESCRIPTION.MIN_50,
  skills: VALIDATION_RULES.REQUIRED,
  skillLevels: VALIDATION_RULES.REQUIRED,
  portfolioUrl: VALIDATION_RULES.URL.OPTIONAL,
  discordUsername: VALIDATION_RULES.DISCORD_USERNAME,
  twitterUrl: VALIDATION_RULES.TWITTER_ACCOUNT_URL,
  instagramUsername: VALIDATION_RULES.INSTAGRAM_USERNAME,
  experiences: VALIDATION_RULES.REQUIRED,
  'experiences.0.companyName': VALIDATION_RULES.REQUIRED,
  'experiences.0.companyUrl': VALIDATION_RULES.URL.REQUIRED,
  'experiences.0.description': VALIDATION_RULES.DESCRIPTION.MIN_10,
  'certificates.0.name': VALIDATION_RULES.REQUIRED,
  'certificates.0.fileUrl': VALIDATION_RULES.REQUIRED,
};
