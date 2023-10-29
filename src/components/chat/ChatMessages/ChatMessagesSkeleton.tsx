import { Skeleton } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';

export const ChatMessagesSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from(Array(10)).map((_, index) => {
        const shouldReverseMessage = index % 3 === 0;

        return (
          <div key={index} className={cx('flex gap-3', { 'flex-row-reverse': shouldReverseMessage })}>
            <div>
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className={cx('flex-1 flex flex-col gap-2 py-1', { 'items-end': shouldReverseMessage })}>
              <Skeleton className="h-3 w-36 rounded-xl" />
              <Skeleton
                className={cx('h-10 w-80 max-w-[50%] rounded-xl', {
                  'rounded-tl-sm -ml-2': !shouldReverseMessage,
                  'rounded-tr-sm -mr-2': shouldReverseMessage,
                })}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
