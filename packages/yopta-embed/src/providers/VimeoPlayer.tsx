import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './VimeoPlayer.module.scss';

const VIMEO_API_URI = 'https://vimeo.com/api/v2/video';

function VimeoPlayer({ providerId, ...other }) {
  const vimeoRootRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(vimeoRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    fetch(`${VIMEO_API_URI}/${providerId}.json`)
      .then((data) => data.json())
      .then((data) => setSrc(data[0].thumbnail_medium))
      .catch(() => setSrc(null));
  }, [providerId]);

  return (
    <div className={s.root} ref={vimeoRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          <img
            src={src || ''}
            alt="vimeo_video_preview"
            width="100%"
            height="100%"
            className={s.iframePreview}
            style={{
              opacity: isInViewport && isFrameLoaded ? 0 : 1,
              zIndex: isInViewport && isFrameLoaded ? -1 : 0,
            }}
          />
          {isInViewport && (
            <iframe
              title="Vimeo Player"
              // https://developer.vimeo.com/player/embedding
              src={`https://player.vimeo.com/video/${providerId}?badge=0&byline=0&portrait=0&title=0`}
              frameBorder={0}
              allowFullScreen
              onLoad={() => setFrameLoaded(true)}
              className={s.iframe}
              {...other}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VimeoPlayer;
