import { Avatar, Button, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { PostContext } from '../../../contexts/Post';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { requestPostCommentCreation } from '../../../services/feed';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

export const AddComment = () => {
  const { currentUser } = useSession();
  const {
    addCommentRef,
    commentsRef,
    comment,
    post: { _id: postId },
    parentCommentId,
    setPost,
    setComment,
  } = React.useContext(PostContext);

  const { pushNotification } = useNotifications();

  const { isPending, mutate } = useMutation({
    mutationFn: requestPostCommentCreation,
    onSuccess: (post) => {
      setComment('');
      setPost(post);

      if (!parentCommentId) {
        requestAnimationFrame(() => {
          commentsRef.current?.scrollTo({
            top: commentsRef.current.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutate([postId, { content: comment, parentCommentId }]);
  };

  return (
    <form className="flex w-full gap-4 items-center z-10" noValidate onSubmit={handleSubmit}>
      <Avatar src={currentUser?.avatarUrl} className="shrink-0" />
      <div className="relative w-full">
        <Textarea
          ref={addCommentRef}
          value={comment}
          minRows={2}
          classNames={{ input: 'pr-10' }}
          disabled={isPending}
          placeholder="Type your comment"
          onChange={handleChange}
        />
        <Button
          type="submit"
          isLoading={isPending}
          isDisabled={comment.trim() === '' || currentUser?.role === 'admin'}
          startContent={!isPending && <Icon icon="send" />}
          isIconOnly
          variant="light"
          radius="full"
          color="secondary"
          className="absolute bottom-2 right-2"
        />
      </div>
    </form>
  );
};
