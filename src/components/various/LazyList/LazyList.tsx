import { Loading } from '@nextui-org/react';
import React from 'react';

interface Props {
  hasMore: boolean;
  children: React.ReactNode;
  onLoadMore: () => void;
}

export const LazyList = ({ children, hasMore, onLoadMore }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current || !hasMore) {
      return;
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const { isIntersecting } = entries[0];

      if (isIntersecting) {
        onLoadMore();
      }
    };

    const loader = ref.current;
    const observer = new IntersectionObserver(handleObserver);

    observer.observe(loader);

    return () => {
      observer.unobserve(loader);
    };
  }, [ref, hasMore]);

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={ref} style={{ textAlign: 'center', display: hasMore ? 'block' : 'none' }}>
          <Loading css={{ mt: '$10' }} />
        </div>
      )}
    </div>
  );
};
