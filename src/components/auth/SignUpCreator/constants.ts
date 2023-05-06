import { RegisterOptions } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';

export const DEFAULT_VALUES = {
  email: '',
  password: '',
  name: '',
  country: '',
  category: '',
  description: '',
  socialMediaUrl: '',
  socialMediaUrlOther: '',
  discordUsername: '',
  twitterUrl: '',
  interestSkills: [],
};

export const VALIDATIONS: Record<keyof typeof DEFAULT_VALUES, RegisterOptions> = {
  email: VALIDATION_RULES.EMAIL,
  password: VALIDATION_RULES.PASSWORD,
  name: VALIDATION_RULES.SHORT_TEXT,
  country: VALIDATION_RULES.REQUIRED,
  category: VALIDATION_RULES.REQUIRED,
  description: VALIDATION_RULES.DESCRIPTION.MIN_50,
  socialMediaUrl: VALIDATION_RULES.YOUTUBE_CHANNEL.REQUIRED,
  socialMediaUrlOther: VALIDATION_RULES.YOUTUBE_CHANNEL.OPTIONAL,
  discordUsername: VALIDATION_RULES.DISCORD_USERNAME,
  twitterUrl: VALIDATION_RULES.TWITTER_ACCOUNT_URL,
  interestSkills: VALIDATION_RULES.REQUIRED,
};

export type DefaultValues = typeof DEFAULT_VALUES;
