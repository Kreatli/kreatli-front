import React from 'react';
import { Comment } from './Comment';
import { AddComment } from './AddComment';
import { PostContext } from 'contexts/Post';
import { ScrollShadow } from '@nextui-org/react';

export const Comments = () => {
  const { post: { comments }, commentsRef } = React.useContext(PostContext);

  return (
    <div className="flex flex-col w-full gap-4">
      <ScrollShadow ref={commentsRef} className="max-h-[50vh]">
        {comments.length > 0 && (
          <div className="flex flex-col bg-default-50 p-5 rounded-xl mt-4">
            {comments.map(comment => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        )}
      </ScrollShadow>
      <AddComment />
    </div>
  );
};
