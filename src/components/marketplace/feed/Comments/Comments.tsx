import { ScrollShadow } from '@nextui-org/react';
import React from 'react';

import { PostContext } from '../../../../contexts/marketplace/Post';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export const Comments = () => {
  const {
    post: { comments },
    commentsRef,
  } = React.useContext(PostContext);

  return (
    <div className="flex flex-col w-full gap-4">
      <ScrollShadow ref={commentsRef} className="max-h-[50vh]">
        {comments.length > 0 && (
          <div className="flex flex-col bg-default-50 p-5 rounded-xl mt-4">
            {comments.map((comment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        )}
      </ScrollShadow>
      <AddComment />
    </div>
  );
};
