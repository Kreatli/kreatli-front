import { Button } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';
import { useMutation } from 'react-query';
import { requestLikePost } from 'services/feed';
import { Common } from 'typings/common';

interface Props {
  postId: Common.Id;
  hasLiked: boolean;
  likeCount: number;
}

export const PostLikeButton = ({ hasLiked, likeCount, postId }: Props) => {
  const [isLiked, setIsLiked] = React.useState(hasLiked);

  const { mutate } = useMutation(requestLikePost);

  const toggleIsLiked = () => {
    mutate(postId);
    setIsLiked((is) => !is);
  };

  return (
    <Button
      variant="ghost"
      className={`border-default-200 hover:!bg-default-100 hover:text-red-500 text-red-500 ${!isLiked ? 'text-default-200' : ''}`}
      onClick={toggleIsLiked}
    >
      <Icon icon="heart" size={20} />
      <span className="text-foreground font-bold">{likeCount - Number(hasLiked) + Number(isLiked)}</span>
    </Button>
  );
};
