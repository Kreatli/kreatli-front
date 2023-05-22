import { Invitation } from './invitation';
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
    | `/user/${string}`
    | `/user/${string}/connections`;

  export type Post =
    | '/auth/signup-creator'
    | '/auth/signup-professional'
    | '/auth/signin'
    | '/auth/activate'
    | '/auth/reset-password'
    | '/auth/change-password'
    | '/upload/image'
    | '/upload/file'
    | `/user/${string}/invitation`;

  export type Put = '';

  export interface GetResponse {
    '/user': User.Type;
    [userById: `/user/${string}`]: User.Type;
    [userConnections: `/user/${string}/connections`]: {
      connections: User.Base[];
      invitations: Invitation[];
    };
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
    [userInvitation: `/user/${string}/invitation`]: {
      message: string;
      inviter: string;
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
    [userInvitation: `/user/${string}/invitation`]: {};
  }

  export interface PutPayload {
    '': {};
  }

  export interface PutResponse {
    '': {};
  }
}
