import { Common } from './common';
import { Media } from './media';
import { User } from './user';

export namespace Feed {
  export interface Post {
    _id: Common.Id;
    author: User.ShortInfoBase;
    commentCount: number;
    comments: Comment[];
    content: string;
    creationDate: Date;
    isFeedback: boolean;
    likeCount: number;
    media: Media.Any[];
    hasLiked: boolean;
  }

  export interface Comment {
    _id: Common.Id;
    author: User.ShortInfoBase;
    commentCount: number;
    comments: Comment[];
    content: string;
    creationDate: Date;
    likeCount: number;
    hasLiked: boolean;
  }

  export type PostPayload = Pick<Post, 'content' | 'isFeedback'> & { media: Omit<Media.Any, '_id'>[] };
  export type CommentPayload = Pick<Post, 'content'> & { parentCommentId?: string };
}
