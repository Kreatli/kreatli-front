import { Availability } from './availability';
import { Invitation } from './invitation';
import { Job } from './job';
import { Pagination } from './pagination';
import { Skill, SkillLevel } from './skill';
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
    | '/user/:id'
    | '/user/:id/connections'
    | '/users'
    | '/creators'
    | '/professionals'
    | '/job-offer/:id'
    | '/job-offer/:id/others'
    | '/job-offers'
    | '/creator/job-offers'
    | '/creator/:id/job-offers'
    | '/professional/job-applications'
    | '/professional/:id/job-applications';

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
    | '/job-offer/:id/application/:id/cancel';

  export type Put = '';

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
    '/user/:id/connections': Pagination.Params;
    '/creator/job-offers': Pagination.Params;
    '/creator/:id/job-offers': Pagination.Params;
    '/professional/job-applications': Pagination.Params;
    '/professional/:id/job-applications': Pagination.Params;
  }

  export interface GetResponse {
    '/user': User.Type;
    '/user/:id': User.Type;
    '/user/:id/connections': {
      connections: User.ShortInfo[];
      connectionsCount: number;
      invitations: Invitation[];
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
    '/creator/job-offers': Job.Offer[];
    '/creator/:id/job-offers': Job.Offer[];
    '/professional/job-applications': Job.Offer[];
    '/professional/:id/job-applications': Job.Offer[];
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
  }

  export interface PutPayload {
    '': {};
  }

  export interface PutResponse {
    '': {};
  }
}
