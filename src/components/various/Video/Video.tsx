import React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  sources: { src: string; type: string }[];
}

const observerOptions = {
  rootMargin: '100px',
  threshold: 0,
};

export const Video = ({ sources = [], className, height, width }: Props) => {
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
    <video ref={videoRef} width={width} height={height} className={className} playsInline loop muted controls={false}>
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};
