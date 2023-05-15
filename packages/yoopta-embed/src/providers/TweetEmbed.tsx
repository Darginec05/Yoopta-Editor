import { useEffect, useRef, useState } from 'react';
import { EmbedElementData } from '../types';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import s from './TweetEmbed.module.scss';

type Props = {
  providerId: EmbedElementData['providerId'];
};

function TweetEmbed({ providerId }: Props) {
  const twitterRootRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(twitterRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    if (!isInViewport) return;

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    twitterRootRef.current?.appendChild(script);

    script.onload = () => {
      if ((window as any).twttr) {
        (window as any).twttr.widgets.createTweet(providerId, document.getElementById(providerId!), {
          align: 'center',
          conversation: 'none',
          dnt: true,
          theme: 'dark',
          height: 300,
        });
      }
    };
  }, [providerId, isInViewport]);

  return (
    <div className={s.root} ref={twitterRootRef}>
      <div className={s.container}>
        <div className={s.embed}>
          <div id={providerId!} />
        </div>
      </div>
    </div>
  );
}

export default TweetEmbed;
