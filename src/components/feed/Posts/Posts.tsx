import React from 'react';
import { Post } from '../Post';
import { useInfiniteQuery } from 'react-query';
import { requestPosts } from 'services/feed';
import { LazyList } from 'components/various/LazyList';
import { PostContextProvider } from 'contexts/Post';
import { usePostsFilters } from 'hooks/usePostsFilters';
import { EmptyState } from 'components/various/EmptyState';
import { PostsSkeleton } from './PostsSkeleton';

const LIMIT = 10;

export const Posts = () => {
  const { filter } = usePostsFilters();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    cacheTime: 0,
    keepPreviousData: true,
    queryKey: ['posts', filter],
    queryFn: ({ pageParam = 1 }) => {
      return requestPosts({ limit: LIMIT, offset: (pageParam - 1) * LIMIT, feedbackOnly: filter === 'feedbackPosts' });
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * LIMIT < (lastPage?.postsCount ?? 0)
        ? allPages.length + 1
        : undefined;
    },
  });

  const posts = React.useMemo(() => {
    return data?.pages.flatMap((page) => page?.posts ?? []) ?? [];
  }, [data?.pages]);

  const shouldShowSkeleton = isFetching && !posts.length;
  const shouldShowLoader = isFetching && !isFetchingNextPage && posts.length;
  const shouldShowEmptyState = !isFetching && !posts.length;

  if (shouldShowEmptyState) {
    return (
      <EmptyState
        title={filter === 'allPosts'
          ? 'There are no posts yet'
          : 'There are no feedback posts yet'}
        text="Go ahead and create the one!"
      />
    );
  }

  return (
    <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
      <div className={`relative flex flex-col gap-8 ${shouldShowLoader ? 'pointer-events-none' : ''}`}>
        {posts.map(post => (
          <PostContextProvider key={post._id} post={post}>
            <Post />
          </PostContextProvider>
        ))}
        {shouldShowSkeleton && <PostsSkeleton />}
        <div className={`absolute -inset-4 md:-inset-x-8 pointer-events-none transition-all rounded-large ${shouldShowLoader ? 'z-10 bg-background/70' : ''}`} />
      </div>
    </LazyList>
  );
};
