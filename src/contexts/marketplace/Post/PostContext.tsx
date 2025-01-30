import React from 'react';

import { Common } from '../../../typings/common';
import { Feed } from '../../../typings/marketplace/feed';

interface Context {
  addCommentRef: React.RefObject<HTMLTextAreaElement>;
  commentsRef: React.RefObject<HTMLDivElement>;
  comment: string;
  parentCommentId: Common.Id | undefined;
  post: Feed.Post;
  setPost: (post: Feed.Post) => void;
  replyToComment: (id: Common.Id, name: string) => void;
  setComment: (comment: string) => void;
}

const initialContext = {
  addCommentRef: { current: null },
  commentsRef: { current: null },
  comment: '',
  parentCommentId: undefined,
  post: {} as Feed.Post,
  setPost: () => null,
  replyToComment: () => null,
  setComment: () => null,
};

interface Props {
  children: React.ReactNode;
  post: Feed.Post;
}

export const PostContext = React.createContext<Context>(initialContext);

export const PostContextProvider = ({ children, post: initialPost }: Props) => {
  const addCommentRef = React.useRef<HTMLTextAreaElement>(null);
  const commentsRef = React.useRef<HTMLDivElement>(null);
  const [post, setPost] = React.useState(initialPost);
  const [comment, setComment] = React.useState('');
  const [parentCommentId, setParentCommentId] = React.useState<Common.Id | undefined>();

  React.useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  React.useEffect(() => {
    if (!comment) {
      setParentCommentId(undefined);
    }
  }, [comment]);

  const replyToComment = (id: Common.Id, name: string) => {
    addCommentRef.current?.focus({ preventScroll: true });
    setComment(`${name}, `);
    setParentCommentId(id);
    addCommentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const memoizedValue = React.useMemo(
    () => ({
      addCommentRef,
      commentsRef,
      comment,
      parentCommentId,
      post,
      setPost,
      replyToComment,
      setComment,
    }),
    [comment, post],
  );

  return <PostContext.Provider value={memoizedValue}>{children}</PostContext.Provider>;
};
