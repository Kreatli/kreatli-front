import { Common } from './common';
import { Skill, SkillLevel } from './skill';

export namespace User {
  export interface Base {
    _id: Common.Id;
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
    hasConnection?: boolean;
    invitations: {
      _id: Common.Id;
      inviter: string;
      message?: string;
    }[];
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
      _id: Common.Id;
      imageUrl?: string;
      companyName: string;
      companyUrl: string;
      description: string;
    }[];
    certificates: {
      _id: Common.Id;
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
