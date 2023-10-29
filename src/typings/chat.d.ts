import { Common } from './common';
import { File } from './file';
import { Job } from './job';
import { Media } from './media';
import { User } from './user';

export namespace Chat {
  export interface Type {
    _id: Common.Id;
    participants: User.ShortInfoBase[];
    creationDate: Date;
    lastMessage: Message | null;
    isRequest: boolean;
  }

  interface UserMessage {
    _id: Common.Id;
    chatId: Common.Id;
    sender: Common.Id;
    content: string;
    media: Media.Image[];
    files: File.Type[];
    creationDate: Date;
    isSystem: false;
    isReadBy: Common.Id[];
  }

  interface JobMessage extends UserMessage {
    isSystem: true;
    type: 'requestJob' | 'acceptJob' | 'rejectJob' | 'endJob';
    data: {
      jobOfferTitle: string;
      jobOfferId: Common.Id;
      jobApplicationId: Common.Id;
      jobApplicationStatus: Job.Application['status'];
    };
  }

  type SystemMessage = JobMessage;

  export type Message = UserMessage | SystemMessage;
}
