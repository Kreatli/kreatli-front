export const SKILLS = {
  ANIMATION: 'animation',
  GRAPHIC_DESIGNER: 'graphic-design',
  SCRIPT_WRITING: 'script-writing',
  SEO: 'seo',
  SOCIAL_MEDIA_MARKETING: 'social-media-marketing',
  SOUND_EDITING: 'sound-editing',
  VIDEO_EDITING: 'video-editing',
  VIDEO_PRODUCTION: 'video-production',
} as const;

export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;

export const SKILL_LEVEL_LABELS = {
  [SKILL_LEVELS.ADVANCED]: 'Advanced',
  [SKILL_LEVELS.BEGINNER]: 'Beginner',
  [SKILL_LEVELS.EXPERT]: 'Expert',
  [SKILL_LEVELS.INTERMEDIATE]: 'Intermediate',
};

export const SKILL_LABELS_FOR_CREATOR = {
  [SKILLS.ANIMATION]: '🪄 Animation Specialists',
  [SKILLS.GRAPHIC_DESIGNER]: '🎨 Graphic Designers',
  [SKILLS.SCRIPT_WRITING]: '✍ Script Writers',
  [SKILLS.SEO]: '🔍 SEO Specialists',
  [SKILLS.SOCIAL_MEDIA_MARKETING]: '📱 Social Media Specialists',
  [SKILLS.SOUND_EDITING]: '🎤 Voiceover Artists',
  [SKILLS.VIDEO_EDITING]: '🎞 Video Editors',
  [SKILLS.VIDEO_PRODUCTION]: '🎬 Producers',
} as const;

export const SKILL_LABELS_FOR_PROFESSIONAL = {
  [SKILLS.ANIMATION]: '🪄 Animation',
  [SKILLS.GRAPHIC_DESIGNER]: '🎨 Graphic Design',
  [SKILLS.SCRIPT_WRITING]: '✍ Script Writing',
  [SKILLS.SEO]: '🔍 Search engine optimization',
  [SKILLS.SOCIAL_MEDIA_MARKETING]: '📱 Social Media Marketing',
  [SKILLS.SOUND_EDITING]: '🎤 Sound editing',
  [SKILLS.VIDEO_EDITING]: '🎞 Video Editing',
  [SKILLS.VIDEO_PRODUCTION]: '🎬 Video production',
} as const;

export const SKILL_OPTIONS_FOR_CREATOR = Object.entries(SKILL_LABELS_FOR_CREATOR)
  .map(([value, label]) => ({ label, value: value as keyof typeof SKILLS }));

export const SKILL_OPTIONS_FOR_PROFESSIONAL = Object.entries(SKILL_LABELS_FOR_PROFESSIONAL)
  .map(([value, label]) => ({ label, value: value as keyof typeof SKILLS }));

export const SKILL_LEVEL_OPTIONS = [
  { label: SKILL_LEVEL_LABELS[SKILL_LEVELS.BEGINNER], value: SKILL_LEVELS.BEGINNER },
  { label: SKILL_LEVEL_LABELS[SKILL_LEVELS.INTERMEDIATE], value: SKILL_LEVELS.INTERMEDIATE },
  { label: SKILL_LEVEL_LABELS[SKILL_LEVELS.ADVANCED], value: SKILL_LEVELS.ADVANCED },
  { label: SKILL_LEVEL_LABELS[SKILL_LEVELS.EXPERT], value: SKILL_LEVELS.EXPERT },
];
