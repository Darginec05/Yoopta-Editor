import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Figma = ({ provider }) => {
  const figmaRootRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(figmaRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className="yoo-video-relative" ref={figmaRootRef}>
      {isInViewport && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(provider.url)}`}
          frameBorder={0}
          allowFullScreen
          className="yoo-video-absolute yoo-video-top-0 yoo-video-left-0"
        />
      )}
    </div>
  );
};

export { Figma };
