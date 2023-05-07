import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './FigmaEmbed.module.scss';

function FigmaEmbed({ providerId, url, ...other }) {
  const figmaRootRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(figmaRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className={s.root} ref={figmaRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          {isInViewport && (
            <iframe
              src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`}
              frameBorder={0}
              allowFullScreen
              className={s.iframe}
              height="450px"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FigmaEmbed;
