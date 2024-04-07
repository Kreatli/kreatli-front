import React from 'react';

interface Props {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

const observerOptions = {
  rootMargin: '100px',
  threshold: 0,
};

export const Video = ({ src, className, height, width }: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const target = videoRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && target.paused) {
        target.play();
      }
    }, observerOptions);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      className={className}
      src={src}
      playsInline
      loop
      muted
      controls={false}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};
