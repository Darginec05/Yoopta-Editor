import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './DayliMotion.module.scss';

const getDayliMotionAPI = (providerId: string) =>
  `https://api.dailymotion.com/video/${providerId}?fields=thumbnail_url`;

function DailyMotion({ providerId, ...other }) {
  const dailyMotionRootRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(dailyMotionRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    fetch(getDayliMotionAPI(providerId))
      .then((data) => data.json())
      .then((data) => setSrc(data.thumbnail_url))
      .catch(() => setSrc(null));
  }, [providerId]);

  return (
    <div className={s.root} ref={dailyMotionRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          <img
            src={src || ''}
            alt="daylimotion_video_preview"
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
              title="Dailymotion Video Player"
              frameBorder={0}
              onLoad={() => setFrameLoaded(true)}
              src={`https://www.dailymotion.com/embed/video/${providerId}`}
              allowFullScreen
              className={s.iframe}
              {...other}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyMotion;
