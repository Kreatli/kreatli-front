import { User } from './user';

export interface Invitation {
  _id: string;
  inviter: User.Base;
  message?: string;
}
