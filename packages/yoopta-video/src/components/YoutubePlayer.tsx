import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from '../ui/Video.module.scss';

function YouTubePlayer({ videoId, ...other }) {
  const youtubeRootRef = useRef(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(youtubeRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div ref={youtubeRootRef} className={s.iframeRoot}>
      <img
        src={`https://i.ytimg.com/vi/${videoId}/default.jpg`}
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
          title="Video Player"
          // https://developers.google.com/youtube/player_parameters?hl=en
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder={0}
          onLoad={() => setFrameLoaded(true)}
          allowFullScreen
          className={s.iframe}
          {...other}
        />
      )}
    </div>
  );
}

export default YouTubePlayer;
