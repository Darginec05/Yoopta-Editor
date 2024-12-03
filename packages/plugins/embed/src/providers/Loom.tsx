import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ProviderRenderProps } from '../types';

function Loom({ provider, attributes, children }: ProviderRenderProps) {
  const loomRootRef = useRef(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(loomRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  const onRef = (node) => {
    loomRootRef.current = node;
    attributes.ref(node);
  };

  return (
    <div {...attributes} ref={onRef} className="yoo-embed-relative" style={{ paddingBottom: '53.90625%' }}>
      {isInViewport && (
        <iframe
          title="Loom Video Player"
          src={`https://www.loom.com/embed/${provider.id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
          frameBorder="0"
          allowFullScreen
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          onLoad={() => setFrameLoaded(true)}
          className="yoo-embed-absolute yoo-embed-top-0 yoo-embed-left-0 yoo-embed-w-full yoo-embed-h-full"
        />
      )}
      {children}
    </div>
  );
}

export { Loom };
