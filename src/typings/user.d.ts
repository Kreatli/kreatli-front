import { Skill, SkillLevel } from './skill';

export namespace User {
  export interface Base {
    _id: string;
    avatarUrl: string;
    email: string;
    name: string;
    country: string;
    description: string;
    connectionsCount: number;
    registrationDate: Date;
    isEmailVerified: boolean;
    isVerified: boolean;
    isActive: boolean;
    hasInvitation?: boolean;
    hasConnection?: boolean;
  }

  export interface Creator extends Base {
    role: 'creator';
    youtubeUrl: string;
    youtubeUrlOther?: string;
    discordUsername?: string;
    twitterUrl?: string;
    interestSkills: Skill[];
    youtube: YoutubeInfo;
  }

  export interface Professional extends Base {
    role: 'professional';
    portfolioUrl?: string;
    twitterUrl?: string;
    discordUsername?: string;
    instagramUsername?: string;
    skills: Skill[];
    skillLevels: Partial<Record<Skill, SkillLevel>>;
    experiences: {
      _id: string;
      imageUrl?: string;
      companyName: string;
      companyUrl: string;
      description: string;
    }[];
    certificates: {
      _id: string;
      name: string;
      fileUrl: string;
      share: boolean;
    }[];
  }

  export interface YoutubeInfo {
    channelId: string;
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    thumbnail: string;
    country: string;
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
    topics: string[];
    bannerUrl: string;
  }

  export type Type = Professional | Creator;
}
