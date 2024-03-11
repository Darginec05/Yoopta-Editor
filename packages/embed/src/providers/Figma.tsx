import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Figma = ({ provider }) => {
  const figmaRootRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(figmaRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className="relative" ref={figmaRootRef}>
      {isInViewport && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(provider.url)}`}
          frameBorder={0}
          allowFullScreen
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};

export { Figma };
