import { useYooptaEditor } from '@yoopta/editor';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { EmbedElementProps, EmbedPluginElements, ProviderRenderProps } from '../types';

function Twitter({ provider, blockId }: ProviderRenderProps) {
  const twitterRootRef = useRef<HTMLDivElement>(null);
  const editor = useYooptaEditor();

  const { isIntersecting: isInViewport } = useIntersectionObserver(twitterRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  const elementId = `${blockId}-${provider.id}`;

  useEffect(() => {
    if (!isInViewport) return;

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    twitterRootRef.current?.appendChild(script);

    script.onload = () => {
      if ((window as any).twttr) {
        (window as any).twttr.widgets.createTweet(provider.id, document.getElementById(elementId), {
          align: 'center',
          conversation: 'none',
          dnt: true,
          theme: 'dark',
          height: 500,
          width: 550,
        });

        editor.blocks.Embed.updateElement<EmbedPluginElements, EmbedElementProps>(blockId, 'embed', {
          sizes: {
            width: 'auto',
            height: 'auto',
          },
        });
      }
    };
  }, [provider.id, isInViewport]);

  return (
    <div className="yoo-embed-w-full yoo-embed-h-full" ref={twitterRootRef}>
      <div id={elementId} />
    </div>
  );
}

export default Twitter;
