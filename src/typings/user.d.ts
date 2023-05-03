import { Category } from './category';
import { Skill, SkillLevel } from './skill';

export namespace User {
  export interface Base {
    _id: string;
    email: string;
    name?: string;
    country?: string;
    description: string;
    registrationDate: Date;
    isEmailVerified: boolean;
    isVerified: boolean;
    isActive: boolean;
  }

  export interface Creator extends Base {
    role: 'creator';
    avatarUrl?: string;
    category: Category;
    socialMediaUrl: string;
    socialMediaUrlOther: string;
    discordUsername: string;
    twitterUrl: string;
    interestSkills: Skill[];
  }

  export interface Professional extends Base {
    role: 'professional';
    avatarUrl: string;
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
    certificates?: {
      _id: string;
      name: string;
      fileUrl: string;
      share: boolean;
    }[];
  }

  export type Type = Professional | Creator;
}
