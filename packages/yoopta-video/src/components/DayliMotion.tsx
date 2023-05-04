import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from '../ui/Video.module.scss';

const getDayliMotionAPI = (videoId: string) => `https://api.dailymotion.com/video/${videoId}?fields=thumbnail_url`;

function DailyMotion({ videoId, ...other }) {
  const dailyMotionRootRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(dailyMotionRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    fetch(getDayliMotionAPI(videoId))
      .then((data) => data.json())
      .then((data) => setSrc(data.thumbnail_url))
      .catch(() => setSrc(null));
  }, [videoId]);

  return (
    <div ref={dailyMotionRootRef} className={s.iframeRoot}>
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
          src={`https://www.dailymotion.com/embed/video/${videoId}`}
          allowFullScreen
          className={s.iframe}
          {...other}
        />
      )}
    </div>
  );
}

export default DailyMotion;
