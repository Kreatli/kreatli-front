import { Common } from '../common';
import { User } from './user';

export interface Invitation {
  _id: Common.Id;
  inviter: User.ShortInfo;
  creationDate: Date;
  message?: string;
}
