import { getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';
import { ReactNode } from 'react';
import DailyMotion from '../providers/DayliMotion';
import DefaultEmbed from '../providers/DefaultEmbed';
import FigmaEmbed from '../providers/FigmaEmbed';
import TweetEmbed from '../providers/TweetEmbed';
import VimeoPlayer from '../providers/VimeoPlayer';
import YouTubePlayer from '../providers/YoutubePlayer';
import { EmbedElement, EmbedElementData } from '../types';
import s from './Embed.module.scss';

type Props = RenderYooptaElementProps<EmbedElement> & {
  children?: ReactNode;
  size?: EmbedElementData['size'];
  updateSize?: (size: Partial<EmbedElementData['size']>) => void;
};

const PROVIDERS = {
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
  dailymotion: DailyMotion,
  twitter: TweetEmbed,
  figma: FigmaEmbed,
};

const Embed = ({ attributes, element, children, HTMLAttributes }: Props) => {
  if (typeof element.data.provider === 'string' && element.data.providerId && PROVIDERS[element.data.provider]) {
    const ProviderComponent = PROVIDERS[element.data.provider];
    return (
      <div
        {...attributes}
        contentEditable={false}
        draggable={false}
        {...HTMLAttributes}
        className={getElementClassname<EmbedElement>({ element, HTMLAttributes, className: s.embedElement })}
      >
        <ProviderComponent {...element.data} providerId={element.data.providerId} />
        {children}
      </div>
    );
  }

  if (!element.data.url) return <div />;

  return (
    <div
      {...attributes}
      contentEditable={false}
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<EmbedElement>({ element, HTMLAttributes, className: s.embedElement })}
    >
      <DefaultEmbed {...element.data} providerId={element.data.providerId} />
      {children}
    </div>
  );
};

export { Embed };
