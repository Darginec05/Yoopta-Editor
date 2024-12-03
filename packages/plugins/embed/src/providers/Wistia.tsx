import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ProviderRenderProps } from '../types';

function Wistia({ provider, attributes, children }: ProviderRenderProps) {
  const wistiaRootRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(wistiaRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  const onRef = (node) => {
    wistiaRootRef.current = node;
    attributes.ref(node);
  };

  return (
    <div {...attributes} ref={onRef} className="yoo-embed-relative" style={{ paddingBottom: '56.25%' }}>
      {isInViewport && (
        <>
          <script src={`https://fast.wistia.com/embed/medias/${provider.id}.jsonp`} async />
          <script src="https://fast.wistia.com/assets/external/E-v1.js" async />
          <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <div
              className="wistia_responsive_wrapper"
              style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
            >
              <div
                className={`wistia_embed wistia_async_${provider.id} videoFoam=true`}
                style={{ height: '100%', position: 'relative', width: '100%' }}
              />
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

export { Wistia };
