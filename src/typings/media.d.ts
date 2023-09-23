import mongoose from 'mongoose';
import { Common } from './common';

export namespace Media {
  interface Base {
    _id: Common.Id;
    src: string;
  }

  export interface Image extends Base {
    type: 'image';
  }

  export interface Video extends Base {
    type: 'video';
    videoId: string;
  }

  export type Any = Image | Video;
}
