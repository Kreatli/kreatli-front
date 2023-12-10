export const TIERS = {
  NOVICE: 1,
  ENTHUSIAST: 2,
  INNOVATOR: 3,
  EXPERT: 4,
  LEGEND: 5,
};

export const TIER_LABELS = {
  [TIERS.NOVICE]: 'Novice',
  [TIERS.ENTHUSIAST]: 'Enthusiast',
  [TIERS.INNOVATOR]: 'Innovator',
  [TIERS.EXPERT]: 'Expert',
  [TIERS.LEGEND]: 'Legend',
};

export const TIER_COLORS = {
  [TIERS.NOVICE]: 'default',
  [TIERS.ENTHUSIAST]: 'warning',
  [TIERS.INNOVATOR]: 'success',
  [TIERS.EXPERT]: 'primary',
  [TIERS.LEGEND]: 'secondary',
};

export const TIER_POINTS = {
  [TIERS.NOVICE]: 0,
  [TIERS.ENTHUSIAST]: 1000,
  [TIERS.INNOVATOR]: 5000,
  [TIERS.EXPERT]: 15000,
  [TIERS.LEGEND]: 50000,
};

export const TIER_OPTIONS = [
  {
    label: TIER_LABELS[TIERS.NOVICE],
    value: 1,
  },
  {
    label: TIER_LABELS[TIERS.ENTHUSIAST],
    value: 2,
  },
  {
    label: TIER_LABELS[TIERS.INNOVATOR],
    value: 3,
  },
  {
    label: TIER_LABELS[TIERS.EXPERT],
    value: 4,
  },
  {
    label: TIER_LABELS[TIERS.LEGEND],
    value: 5,
  },
];

export const TIER_FEATURES = {
  [TIERS.NOVICE]: [
    {
      visibleFor: 'creator',
      text: 'Standard job posting visibility for YouTube creators, allowing them to reach professionals',
    },
    {
      visibleFor: 'professional',
      text: 'Standard profile visibility for professionals, allowing them to be discovered by YouTube creators',
    },
    {
      text: 'Maximum Connection Requests: 10 per month',
    },
    {
      visibleFor: 'professional',
      text: 'Maximum Job Applications: 10 per month',
    },
    {
      visibleFor: 'creator',
      text: 'Maximum Job Postings: 2 per month',
    },
  ],
  [TIERS.ENTHUSIAST]: [
    {
      visibleFor: 'creator',
      text: 'Enhanced job posting visibility for YouTube creators, allowing them to reach a wider range of professionals',
    },
    {
      visibleFor: 'professional',
      text: 'Expanded profile visibility for professionals, increasing their chances of being discovered by more YouTube creators',
    },
    {
      text: 'Maximum Connection Requests: 20 per month',
    },
    {
      visibleFor: 'professional',
      text: 'Maximum Job Applications: 20 per month',
    },
    {
      visibleFor: 'creator',
      text: 'Maximum Job Postings: 5 per month',
    },
  ],
  [TIERS.INNOVATOR]: [
    {
      visibleFor: 'professional',
      text: 'Featured profile placement, ensuring professionals receive increased visibility and exposure to potential YouTube creators',
    },
    {
      visibleFor: 'creator',
      text: 'Featured job postings in the search to make them stand out and increase exposure to professionals',
    },
    {
      text: 'Maximum Connection Requests: 50 per month',
    },
    {
      visibleFor: 'professional',
      text: 'Maximum Job Applications: 50 per month',
    },
    {
      visibleFor: 'creator',
      text: 'Maximum Job Postings: 15 per month',
    },
  ],
  [TIERS.EXPERT]: [
    {
      visibleFor: 'professional',
      text: 'New unique price filter',
    },
    {
      visibleFor: 'creator',
      text: 'New unique rating filter',
    },
    {
      text: '“Expert” visibility badge',
    },
    {
      text: 'Dedicated Support: subscribers receive dedicated support from the Kreatli team, ensuring a personalized and prompt response to their queries, concerns, and technical assistance needs',
    },
    {
      text: 'Maximum Connection Requests: Unlimited',
    },
    {
      visibleFor: 'professional',
      text: 'Maximum Job Applications: Unlimited',
    },
    {
      visibleFor: 'creator',
      text: 'Maximum Job Postings: Unlimited',
    },
  ],
  [TIERS.LEGEND]: [
    {
      text: 'Early access to upcoming platform features and updates, allowing users to experience and provide feedback on new developments. Also, the ability to influence what features are going to be developed/introduced in the future',
    },
    {
      text: '“Legend” visibility badge',
    },
    {
      text: 'VIP support with prioritized assistance for any platform-related issues or inquiries',
    },
    {
      text: 'Private Discord Server where legendary users will be able to share industry knowledge and expertise with each other, collaborate, and ask for any help',
    },
  ],
};

export const TIER_STRUCTURES = {
  [TIERS.NOVICE]: 'The starting tier for all users, offering a basic level of access and features.',
  [TIERS.ENTHUSIAST]: 'Achieved at 1,000 points, providing additional perks such as enhanced visibility and increased connection request limits.',
  [TIERS.INNOVATOR]: 'Attained at 5,000 points, offering all benefits of Tier 2, featured profile placement in the search, and increased connection request limits.',
  [TIERS.EXPERT]: 'Reached at 15,000 points, granting all benefits of Tier 3, new unique filters, an “Expert” visibility badge, and dedicated support.',
  [TIERS.LEGEND]: 'The highest tier for elite members who accumulate 50,000+ points, providing unparalleled privileges such as early access to upcoming platform features and updates, a “Legend” visibility badge, VIP support, and a Private Discord Server.',
};
