import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './YoutubePlayer.module.scss';

function YouTubePlayer({ providerId, ...other }) {
  const youtubeRootRef = useRef(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(youtubeRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className={s.root} ref={youtubeRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          <img
            src={`https://i.ytimg.com/vi/${providerId}/default.jpg`}
            alt="youtube_video_preview"
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
              title="Youtube Player"
              // https://developers.google.com/youtube/player_parameters
              src={`https://www.youtube.com/embed/${providerId}`}
              frameBorder={0}
              onLoad={() => setFrameLoaded(true)}
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

export default YouTubePlayer;
