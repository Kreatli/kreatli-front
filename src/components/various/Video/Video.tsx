import React from 'react';

interface Props {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
}

const observerOptions = {
  rootMargin: '100px',
  threshold: 0,
};

export const Video = ({ src, className, height, width, loading = 'lazy' }: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldRender, setShouldRender] = React.useState(loading === 'eager');

  React.useEffect(() => {
    const target = videoRef.current;

    if (!target || shouldRender) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setShouldRender(entry.isIntersecting);
    }, observerOptions);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [shouldRender]);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      className={className}
      playsInline
      autoPlay
      loop
      muted
      controls={false}
    >
      {shouldRender && <source src={src} type="video/mp4" />}
    </video>
  );
};
