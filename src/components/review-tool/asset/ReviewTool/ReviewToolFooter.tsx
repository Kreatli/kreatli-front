import React from 'react';

import { ReviewToolColors } from './ReviewToolColors';
import { ReviewToolHistoryButtons } from './ReviewToolHistoryButtons';
import { ReviewToolShapes } from './ReviewToolShapes';
import { ReviewToolTextarea } from './ReviewToolTextarea';
import { ReviewToolTimestamp } from './ReviewToolTimestamp';

export const ReviewToolFooter = () => {
  return (
    <div className="relative p-6 pb-12 h-32 flex flex-col items-center">
      <ReviewToolTextarea />
      <div className="max-w-screen-xl w-full mx-auto relative">
        <div className="absolute right-2 top-2 w-full flex gap-4 justify-end items-center">
          <ReviewToolTimestamp />
          <ReviewToolHistoryButtons />
          <ReviewToolShapes />
          <ReviewToolColors />
        </div>
      </div>
    </div>
  );
};
