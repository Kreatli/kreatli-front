import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { PostContextProvider } from '../../../../contexts/marketplace/Post';
import { requestPosts } from '../../../../services/marketplace/feed';
import { Feed } from '../../../../typings/marketplace/feed';
import { LazyList } from '../../../various/LazyList';
import { EmptyState } from '../../chat/EmptyState';
import { Post } from '../Post';
import { PostsSkeleton } from './PostsSkeleton';

const LIMIT = 10;

const EMPTY_STATE_TITLES = {
  allPosts: 'There are no posts yet',
  feedbackPosts: 'There are no feedback posts yet',
  myPosts: 'You have no posts yet',
};

export const Posts = () => {
  const searchParams = useSearchParams();
  const filter = (searchParams.get('filter') ?? 'allPosts') as Feed.Filter;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isFetchingNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['posts', filter],
    queryFn: ({ pageParam = 1 }) => {
      return requestPosts({
        limit: LIMIT,
        offset: (pageParam - 1) * LIMIT,
        isFeedback: filter === 'feedbackPosts',
        myPosts: filter === 'myPosts',
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * LIMIT < (lastPage?.postsCount ?? 0) ? allPages.length + 1 : undefined;
    },
  });

  const posts = React.useMemo(() => {
    return data?.pages.flatMap((page) => page?.posts ?? []) ?? [];
  }, [data?.pages]);

  const shouldShowEmptyState = !isFetching && !posts.length;

  if (shouldShowEmptyState) {
    return <EmptyState title={EMPTY_STATE_TITLES[filter]} text="Go ahead and create the one!" />;
  }

  return (
    <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
      <div className="relative flex flex-col gap-8">
        {posts.map((post) => (
          <PostContextProvider key={post._id} post={post}>
            <Post />
          </PostContextProvider>
        ))}
        {(isLoading || isFetchingNextPage) && <PostsSkeleton />}
        <div className="absolute -inset-4 md:-inset-x-8 pointer-events-none transition-all rounded-large" />
      </div>
    </LazyList>
  );
};
