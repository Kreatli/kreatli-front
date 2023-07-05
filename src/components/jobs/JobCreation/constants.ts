import { Duration } from '../../../typings/duration';
import { Payment } from '../../../typings/payment';

export const DEFAULT_VALUES = {
  title: '',
  shortDescription: '',
  description: '',
  skills: [],
  paymentType: '' as Payment.Type,
  paymentPreferences: [],
  paymentValue: 0,
  duration: '' as Duration,
  location: 'remote',
  additionalInformation: '',
};

export type DefaultValues = typeof DEFAULT_VALUES;

export const SHORT_DESCRIPTION_PLACEHOLDER = 'Join our dynamic team as a YouTube Video Editor! We\'re seeking a skilled professional who can bring their creativity and expertise to help us produce compelling videos for our growing YouTube channel.';

// eslint-disable-next-line max-len
export const DESCRIPTION_PLACEHOLDER = `As a YouTube Video Editor, you will be responsible for editing and enhancing our video content to captivate and engage our audience. Collaborating closely with our content creators, you will have the opportunity to shape the visual style and storytelling of our videos, ensuring they align with our brand and resonate with our viewers.

Responsibilities:
- Edit and refine raw footage to create visually stunning YouTube videos
- Incorporate captivating visuals, transitions, and effects to enhance video quality
- Ensure seamless audio integration, including background music and voiceovers
- Implement engaging graphics, titles, and animations to support the video's message

Requirements:
- Proven experience as a Video Editor, specifically for YouTube content
- Proficiency in video editing software (e.g., Adobe Premiere Pro, Final Cut Pro)
- Solid understanding of YouTube platform, audience dynamics, and video optimization
- Creative flair with a keen eye for visual storytelling and attention to detail
- Knowledge of video SEO strategies and YouTube analytics is a plus`;
