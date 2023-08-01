import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './DefaultEmbed.module.scss';

function DefaultEmbed({ providerId, url, ...other }) {
  const embedRootRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(embedRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className={s.root} ref={embedRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          {isInViewport && <iframe src={url} frameBorder={0} allowFullScreen className={s.iframe} height="450px" />}
        </div>
      </div>
    </div>
  );
}

export default DefaultEmbed;
