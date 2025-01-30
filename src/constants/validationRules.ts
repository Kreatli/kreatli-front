const EMAIL_PATTERN =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const URL_PATTERN = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const YOUTUBE_CHANNEL_URL_PATTERN =
  /^https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|user\/\S+|@[\w-]+)(?:\/[^?\s]*)?(?:\?.*)?$/;
const TWITTER_ACCOUNT_URL_PATTERN = /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g;

const getDescriptionRulesByMinLength = (minLength: number) => ({
  required: true,
  minLength: {
    message: `C'mon, make it at least ${minLength} characters 😉`,
    value: minLength,
  },
  maxLength: {
    message: 'Description must not exceed 1000 characters',
    value: 5000,
  },
});

const URL_RULES = {
  pattern: {
    message: 'The provided URL is incorrect',
    value: URL_PATTERN,
  },
};

const YOUTUBE_CHANNEL_RULES = {
  pattern: {
    message: 'The URL must point to your YouTube channel',
    value: YOUTUBE_CHANNEL_URL_PATTERN,
  },
};

export const VALIDATION_RULES = {
  REQUIRED: {
    required: true,
  },
  EMAIL: {
    required: true,
    maxLength: 200,
    pattern: {
      value: EMAIL_PATTERN,
      message: 'Email is not valid 😞',
    },
  },
  PASSWORD: {
    required: true,
    minLength: {
      message: 'Password must contain at least 8 characters',
      value: 8,
    },
    maxLength: 200,
    validate: (password: string, { password: passwordRepeat }: { password: string }) => {
      if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least 1 capital letter';
      }

      if (!/[0-9]/.test(password)) {
        return 'Password must contain at least 1 digit character';
      }

      if (password !== passwordRepeat) {
        return 'Passwords should match';
      }

      return undefined;
    },
  },
  NUMBER: {
    required: true,
    min: 1,
    max: 999999999,
  },
  SHORT_TEXT: {
    required: true,
    maxLength: {
      message: 'This field must not exceed 200 characters',
      value: 200,
    },
  },
  DESCRIPTION: {
    MIN_100: getDescriptionRulesByMinLength(100),
    OPTIONAL: {
      maxLength: {
        message: 'Description must not exceed 1000 characters',
        value: 5000,
      },
    },
  },
  URL: {
    REQUIRED: { required: true, ...URL_RULES },
    OPTIONAL: URL_RULES,
  },
  YOUTUBE_CHANNEL: {
    REQUIRED: { required: true, ...YOUTUBE_CHANNEL_RULES },
    OPTIONAL: YOUTUBE_CHANNEL_RULES,
  },
  TWITTER_ACCOUNT_URL: {
    pattern: { value: TWITTER_ACCOUNT_URL_PATTERN, message: 'The URL must point to your Twitter account' },
  },
};
