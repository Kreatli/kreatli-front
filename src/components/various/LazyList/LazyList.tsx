import { Spinner } from '@nextui-org/react';
import React from 'react';

interface Props {
  isLoading: boolean;
  hasMore?: boolean;
  scroll?: 'up' | 'down';
  children: React.ReactNode;
  onLoadMore: () => void;
}

export const LazyList = ({ children, isLoading, hasMore = false, scroll = 'down', onLoadMore }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current || !hasMore) {
      return;
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const { isIntersecting } = entries[0];

      if (isIntersecting && !isLoading) {
        onLoadMore();
      }
    };

    const loader = ref.current;
    const observer = new IntersectionObserver(handleObserver);

    observer.observe(loader);

    return () => {
      observer.unobserve(loader);
    };
  }, [ref, hasMore, isLoading]);

  return (
    <div>
      {scroll === 'up' && hasMore && (
        <div ref={ref} className="text-center">
          <Spinner className="mb-10" color="secondary" />
        </div>
      )}
      {children}
      {scroll === 'down' && hasMore && (
        <div ref={ref} className="text-center">
          <Spinner className="mt-10" color="secondary" />
        </div>
      )}
    </div>
  );
};
