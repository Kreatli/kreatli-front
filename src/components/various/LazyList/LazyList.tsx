import { Spinner } from '@nextui-org/react';
import React from 'react';

interface Props {
  isLoading: boolean;
  hasMore: boolean | undefined;
  children: React.ReactNode;
  onLoadMore: () => void;
}

export const LazyList = ({ children, isLoading, hasMore = false, onLoadMore }: Props) => {
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
      {children}
      {hasMore && (
        <div ref={ref} className="text-center">
          <Spinner className="mt-10" color="secondary" />
        </div>
      )}
    </div>
  );
};
