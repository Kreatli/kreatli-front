import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { requestLikePost } from '../../../services/feed';
import { Common } from '../../../typings/common';
import { ProfileUnverifiedTooltip } from '../../profile/Profile/ProfileUnverifiedTooltip';
import { Icon } from '../../various/Icon';

interface Props {
  postId: Common.Id;
  hasLiked: boolean;
  likeCount: number;
}

export const PostLikeButton = ({ hasLiked, likeCount, postId }: Props) => {
  const [isLiked, setIsLiked] = React.useState(hasLiked);

  const { currentUser } = useSession();
  const { mutate } = useMutation({
    mutationFn: requestLikePost,
  });

  const toggleIsLiked = () => {
    mutate(postId);
    setIsLiked((is) => !is);
  };

  return (
    <ProfileUnverifiedTooltip>
      <Button
        variant="ghost"
        isDisabled={!currentUser?.isVerified}
        className={`border-default-200 hover:!bg-default-100 hover:text-red-500 text-red-500 ${!isLiked ? 'text-default-200' : ''}`}
        onClick={toggleIsLiked}
      >
        <Icon icon="heart" size={20} />
        <span className="text-foreground font-bold">{likeCount - Number(hasLiked) + Number(isLiked)}</span>
      </Button>
    </ProfileUnverifiedTooltip>
  );
};
