import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersetionObserver';
import s from './EmbedRender.module.scss';

type EmbedProps = JSX.IntrinsicElements['iframe'];

const EmbedRender = ({ src, title }: EmbedProps) => {
  const embedContainerRef = useRef(null);
  const entry = useIntersectionObserver(embedContainerRef, { rootMargin: '50%', freezeOnceVisible: true });

  return (
    <div ref={embedContainerRef} className={s.embedContainer}>
      {entry.isIntersecting && (
        <iframe
          src={src}
          title={title || `embed-${src}`}
          className={s.embed}
          loading="lazy"
          height={500}
          width="100%"
          allowFullScreen
          frameBorder={0}
        />
      )}
    </div>
  );
};

export { EmbedRender };
