import { Availability } from './availability';
import { Chat } from './chat';
import { Common } from './common';
import { Feed } from './feed';
import { Invitation } from './invitation';
import { Job } from './job';
import { Notifications } from './notifications';
import { Pagination } from './pagination';
import { Skill, SkillLevel } from './skill';
import { Tasks } from './tasks';
import { User } from './user';

export interface UploadApiResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  created_at: string;
  tags: Array<string>;
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  moderation: Array<string>;
  access_control: Array<string>;
  colors?: [string, number][];
}

export namespace Api {
  export type Get =
    | '/user'
    | '/user/posts'
    | '/user/tasks'
    | '/user/:id'
    | '/user/:id/connections'
    | '/user/:id/posts'
    | '/users'
    | '/creators'
    | '/professionals'
    | '/job-offer/:id'
    | '/job-offer/:id/others'
    | '/job-offers'
    | '/creator/job-offers'
    | '/creator/:id/job-offers'
    | '/professional/job-applications'
    | '/professional/:id/job-applications'
    | '/posts'
    | '/chat/:id'
    | '/chat/:id/messages'
    | '/chat-requests'
    | '/dashboard'
    | '/leaderboard'
    | '/notifications';

  export type Post =
    | '/auth/signup-creator'
    | '/auth/signup-professional'
    | '/auth/signin'
    | '/auth/activate'
    | '/auth/reset-password'
    | '/auth/change-password'
    | '/upload/image'
    | '/upload/file'
    | '/user/update-youtube-info'
    | '/user/:id/invitation'
    | '/user/:id/invitation/accept'
    | '/user/:id/invitation/reject'
    | '/job-offer'
    | '/job-offer/:id/cancel'
    | '/job-offer/:id/complete'
    | '/job-offer/:id/review'
    | '/job-offer/:id/application'
    | '/job-offer/:id/application/:id/reject'
    | '/job-offer/:id/application/:id/accept'
    | '/job-offer/:id/application/:id/cancel'
    | '/post'
    | '/post/:id/like'
    | '/post/:id/comment'
    | '/post/:id/comment/:id/like'
    | '/chat/:id/messages/read'
    | '/notifications/mark-all-read'
    | '/buy-points';

  export type Put =
    | '/post/:id'
    | '/chat/:id'
    | '/notification/:id'
    | '/user';

  export interface GetParams {
    '/professionals': {
      skills?: Skill[];
      skillLevel?: SkillLevel;
      tier?: string[];
      country?: string[];
      search?: string;
    } & Pagination.Params;
    '/job-offers': {
      skills?: Skill[];
      country?: string[];
      search?: string;
      availability?: Availability.Type;
      availabilityDuration?: Availability.ProjectBase;
    } & Pagination.Params;
    '/user/posts': Pagination.Params;
    '/user/:id/posts': Pagination.Params;
    '/user/:id/connections': Pagination.Params;
    '/creator/job-offers': { status: Job.Offer['status'] } & Pagination.Params;
    '/creator/:id/job-offers': Pagination.Params;
    '/professional/job-applications': { status: Job.Application['status'] } & Pagination.Params;
    '/professional/:id/job-applications': Pagination.Params;
    '/posts': { feedbackOnly?: boolean } & Pagination.Params;
    '/chat/:id/messages': Pagination.Params;
    '/notifications': Pagination.Params;
  }

  export interface GetResponse {
    '/user': User.Type & {
      exceededLimits: {
        jobOffers: boolean;
        jobApplications: boolean;
        invitations: boolean;
      }
    };
    '/user/posts': {
      posts: Feed.Post[];
      postsCount: number;
    };
    '/user/:id': User.Type;
    '/user/:id/connections': {
      connections: User.ShortInfo[];
      connectionsCount: number;
      invitations: Invitation[];
    };
    '/user/:id/posts': {
      posts: Feed.Post[];
      postsCount: number;
    };
    '/user/tasks': {
      ongoingTasks: Tasks.Task[];
      newTasks: Tasks.Task[];
    };
    '/users': User.ShortInfo[];
    '/creators': User.Creator[];
    '/professionals': {
      professionals: User.Professional[];
      professionalsCount: number;
    };
    '/job-offer/:id': Job.Offer;
    '/job-offer/:id/others': Job.Offer[];
    '/job-offers': {
      jobOffers: Job.Offer[];
      jobOffersCount: number;
    };
    '/creator/job-offers': {
      jobOffers: Job.Offer[];
      jobOffersCount: number;
    };
    '/creator/:id/job-offers': Job.Offer[];
    '/professional/job-applications': {
      jobApplications: Job.Offer[];
      jobApplicationsCount: number;
    };
    '/professional/:id/job-applications': Job.Offer[];
    '/posts': {
      posts: Feed.Post[];
      postsCount: number;
    };
    '/chat/:id': Chat.Type;
    '/chat/:id/messages': {
      messages: Chat.Message[];
      messagesCount: number;
    };
    '/chat-requests': Chat.Type[];
    '/dashboard': {
      earnedToday: number;
      earnedTomorrow: number;
      dailyLimit: number;
      userTier: number;
      userPoints: number;
    };
    '/leaderboard': (User.ShortInfo & { tierPoints: number })[];
    '/notifications': {
      notifications: Notifications.Notification[];
      notificationsCount: number;
      unreadNotificationsCount: number;
    }
  }

  export interface PostPayload {
    '/auth/signup-creator': any; // TODO: change to payload type
    '/auth/signup-professional': any; // TODO: change to payload type
    '/auth/signin': {
      email: string;
      password: string;
    };
    '/auth/activate': {
      token: string;
    };
    '/auth/reset-password': {
      email: string;
    };
    '/auth/change-password': {
      token: string;
      password: string;
    };
    '/upload/image': FormData;
    '/upload/file': FormData;
    '/user/update-youtube-info': {};
    '/user/:id/invitation': {
      message: string;
      inviter: Id;
    };
    '/user/:id/invitation/accept': {
      invitationId: Id;
    };
    '/user/:id/invitation/reject': {
      invitationId: Id;
    };
    '/job-offer': Job.OfferPayload;
    '/job-offer/:id/application': {
      coverLetter: string;
    };
    '/job-offer/:id/complete': Job.OfferReviewPayload;
    '/job-offer/:id/review': Job.OfferReviewPayload;
    '/post': Feed.PostPayload;
    '/post/:id/like': {};
    '/post/:id/comment': Feed.CommentPayload;
    '/post/:id/comment/:id/like': {};
    '/chat/:id/messages/read': {
      ids: Common.Id[];
    };
    '/notifications/mark-all-read': {};
    '/buy-points': {
      points: number;
    };
  }

  export interface PostResponse {
    '/auth/signup-creator': User.Creator;
    '/auth/signup-professional': User.Professional;
    '/auth/signin': {
      user: User.Type;
      token: string;
    };
    '/auth/activate': {
      message: string;
    };
    '/auth/reset-password': {
      message: string;
    };
    '/auth/change-password': User.Type;
    '/upload/image': UploadApiResponse;
    '/upload/file': UploadApiResponse;
    '/user/update-youtube-info': User.Creator;
    '/user/:id/invitation': User.Type;
    '/user/:id/invitation/accept': {
      inviter: User.Type;
      invitee: User.Type;
    };
    '/user/:id/invitation/reject': {
      inviter: User.Type;
      invitee: User.Type;
    };
    '/job-offer': Job.Offer;
    '/job-offer/:id/cancel': Job.Offer;
    '/job-offer/:id/complete': Job.Offer;
    '/job-offer/:id/review': Job.Offer;
    '/job-offer/:id/application': Job.Offer;
    '/job-offer/:id/application/:id/reject': Job.Offer;
    '/job-offer/:id/application/:id/accept': Job.Offer;
    '/job-offer/:id/application/:id/cancel': Job.Offer;
    '/post': Feed.Post;
    '/post/:id/like': Feed.Post;
    '/post/:id/comment': Feed.Post;
    '/post/:id/comment/:id/like': Feed.Post;
    '/chat/:id/messages/read': undefined;
    '/buy-points': { paymentLink: string };
  }

  export interface PutPayload {
    '/post/:id': Partial<Feed.PostPayload>;
    '/chat/:id': { isRequest: boolean };
    '/notification/:id': { isRead: boolean };
    '/user': any; // TODO: change to payload type
  }

  export interface PutResponse {
    '/post/:id': Feed.Post;
    '/chat/:id': Chat.Type;
    '/notification/:id': Notifications.Notification;
  }
}
