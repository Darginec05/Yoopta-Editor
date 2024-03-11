import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const getDayliMotionAPI = (embedId: string) => `https://api.dailymotion.com/embed/${embedId}?fields=thumbnail_url`;

function DailyMotion({ embedId, ...other }) {
  const dailyMotionRootRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(dailyMotionRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    fetch(getDayliMotionAPI(embedId))
      .then((data) => data.json())
      .then((data) => setSrc(data.thumbnail_url))
      .catch(() => setSrc(null));
  }, [embedId]);

  return (
    <div ref={dailyMotionRootRef} className="yoo-video-relative">
      <img
        src={src || ''}
        alt="daylimotion_embed_preview"
        width="100%"
        height="100%"
        className="yoo-video-absolute yoo-video-top-0 yoo-video-left-0 yoo-video-w-full yoo-video-h-full"
        style={{
          opacity: isInViewport && isFrameLoaded ? 0 : 1,
          zIndex: isInViewport && isFrameLoaded ? -1 : 0,
        }}
      />
      {isInViewport && (
        <iframe
          title="Dailymotion Embed Player"
          frameBorder={0}
          onLoad={() => setFrameLoaded(true)}
          src={`https://www.dailymotion.com/embed/embed/${embedId}`}
          allowFullScreen
          className="yoo-video-absolute yoo-video-top-0 yoo-video-left-0"
          {...other}
        />
      )}
    </div>
  );
}

export { DailyMotion };
