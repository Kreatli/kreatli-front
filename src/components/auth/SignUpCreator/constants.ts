import { RegisterOptions } from 'react-hook-form';

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
  email: { required: true, maxLength: 200, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i },
  password: { required: true, maxLength: 200 },
  name: { required: true, maxLength: 50 },
  country: { required: true },
  category: { required: true, maxLength: 200 },
  description: { required: true, minLength: 50, maxLength: 500 },
  socialMediaUrl: { required: true, pattern: /^https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|user\/\S+|@[\w-]+)\/?[a-zA-Z0-9_-]{0,}$/ },
  socialMediaUrlOther: { pattern: /^https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|user\/\S+|@[\w-]+)\/?[a-zA-Z0-9_-]{0,}$/ },
  discordUsername: { pattern: /^.{3,32}#[0-9]{4}$/ },
  twitterUrl: { pattern: /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g },
  interestSkills: { required: true },
};

export type DefaultValues = typeof DEFAULT_VALUES;
