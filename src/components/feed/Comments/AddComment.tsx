import { Avatar, Button, Textarea } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { PostContext } from 'contexts/Post';
import { useNotifications } from 'hooks/useNotifications';
import { useSession } from 'hooks/useSession';
import React from 'react';
import { useMutation } from 'react-query';
import { requestPostCommentCreation } from 'services/feed';
import { getErrorMessage } from 'utils/getErrorMessage';

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

  const { isLoading, mutate } = useMutation(requestPostCommentCreation, {
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
    <form
      className="flex w-full gap-4 items-center z-10"
      onSubmit={handleSubmit}
    >
      <Avatar src={currentUser?.avatarUrl} className="shrink-0" />
      <div className="relative w-full">
        <Textarea
          ref={addCommentRef}
          value={comment}
          minRows={2}
          disabled={isLoading}
          placeholder="Type your comment"
          onChange={handleChange}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          startContent={!isLoading && <Icon icon="send" />}
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
