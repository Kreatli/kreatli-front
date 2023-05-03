import { nanoid } from 'nanoid';
import { FieldPath, RegisterOptions } from 'react-hook-form';

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
  email: { required: true, maxLength: 200, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i },
  password: { required: true, maxLength: 200 },
  name: { required: true, maxLength: 50 },
  avatarUrl: { required: true },
  country: { required: true },
  description: { required: true, minLength: 50, maxLength: 500 },
  skills: { required: true },
  skillLevels: { required: true },
  portfolioUrl: { pattern: /^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/ },
  discordUsername: { pattern: /^.{3,32}#[0-9]{4}$/ },
  twitterUrl: { pattern: /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g },
  instagramUsername: { pattern: /^@[\w.\d-]{1,30}$/ },
  experiences: { required: true },
  'experiences.0.companyName': { required: true },
  'experiences.0.companyUrl': { required: true, pattern: /^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/ },
  'experiences.0.description': { required: true, minLength: 50, maxLength: 500 },
  'certificates.0.name': { required: true },
  'certificates.0.fileUrl': { required: true },
};
