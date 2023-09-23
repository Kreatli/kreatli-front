import { Button, Link, User } from '@nextui-org/react';
import React from 'react';
import { Common } from 'typings/common';
import NextLink from 'next/link';
import { formatRelativeTime } from 'utils/dates';
import { Icon } from 'components/various/Icon';
import { PostContext } from 'contexts/Post';
import { Feed } from 'typings/feed';
import { useMutation } from 'react-query';
import { requestLikePostComment } from 'services/feed';

interface Props extends Feed.Comment {
  parentCommentId?: Common.Id;
}

export const Comment = ({ _id, author, content, creationDate, parentCommentId, likeCount, comments, hasLiked }: Props) => {
  const { _id: authorId, name: authorName, avatarUrl } = author;
  const [isLiked, setIsLiked] = React.useState(hasLiked);
  const [areAnswersVisible, setAreAnswersVisible] = React.useState(false);
  const { post: { _id: postId }, setPost, replyToComment } = React.useContext(PostContext);

  const { mutate } = useMutation(requestLikePostComment, {
    onSuccess: (post) => {
      setPost(post);
    },
  });

  const toggleLike = () => {
    mutate([postId, _id]);
    setIsLiked(liked => !liked);
  };

  const toggleAnswersVisibility = () => {
    setAreAnswersVisible(areVisible => !areVisible);
  };

  return (
    <div className="flex flex-col gap-3 items-start border-b-1 pb-4 mb-4 last:border-none last:pb-0 last:mb-0">
      <div className="w-full flex items-center justify-between">
        <User
          as={NextLink}
          href={`/profile/${authorId}`}
          name={authorName}
          classNames={{ name: 'font-semibold' }}
          avatarProps={{ src: avatarUrl, size: 'sm' }}
        />
        <span className="text-xs text-default-400">{formatRelativeTime(creationDate)}</span>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-sm">{content}</p>
          <Link as="button" size="sm" className="text-default-400" onClick={() => replyToComment(parentCommentId ?? _id, authorName)}>
            <Icon icon="reply" size={20} />
            Reply
          </Link>
        </div>
        <Button size="sm" variant="light" className={`text-default-300 hover:text-red-500 ${isLiked ? 'text-red-500' : ''}`} onClick={toggleLike}>
          <Icon icon="heart" size={18} />
          <span className="text-foreground font-bold">{likeCount - Number(hasLiked) + Number(isLiked)}</span>
        </Button>
      </div>
      {comments.length > 0 && (
        <Link as="button" size="sm" color="secondary" className="font-semibold mt-2" onClick={toggleAnswersVisibility}>
          <Icon icon="chevronDown" size={16} className={`${areAnswersVisible && 'rotate-180'}`} />
          {comments.length} {comments.length > 1 ? 'replies' : 'reply'}
        </Link>
      )}
      {areAnswersVisible && (
        <div className="pl-10 border-t-1 pt-4 mt-2 w-full">
          {comments.map(comment => (
            <Comment key={comment._id} parentCommentId={_id} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};
