import { Common } from './common';
import { Skill, SkillLevel } from './skill';

export namespace User {
  export interface ShortInfoBase {
    _id: Common.Id;
    avatarUrl: string;
    connectionsCount: number;
    country: string;
    isVerified: boolean;
    name: string;
  }

  export interface ShortInfoCreator extends ShortInfoBase {
    role: 'creator';
    youtube: {
      customUrl: string;
      topics: string[];
    };
  }

  export interface ShortInfoProfessional extends ShortInfoBase {
    role: 'professional';
    skills: Skill[];
  }

  export type ShortInfo = ShortInfoProfessional | ShortInfoCreator;

  export interface Base extends ShortInfoBase {
    email: string;
    description: string;
    registrationDate: Date;
    isEmailVerified: boolean;
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
    lastUpdateAt: Date;
  }

  export type Type = Professional | Creator;
}
