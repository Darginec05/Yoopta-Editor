import { DailyMotion } from '../providers/DailyMotion';
import { Figma } from '../providers/Figma';
import Twitter from '../providers/Twitter';
import { Vimeo } from '../providers/Vimeo';
import { YouTube } from '../providers/Youtube';
import { EmbedElementProps } from '../types';

type EmbedComponentProps = Omit<EmbedElementProps, 'sizes'> & {
  width: number;
  height: number;
  blockId: string;
};

const PROVIDERS = {
  vimeo: Vimeo,
  youtube: YouTube,
  dailymotion: DailyMotion,
  figma: Figma,
  twitter: Twitter,
};

const EmbedComponent = ({ width, height, provider, blockId }: EmbedComponentProps) => {
  if (!provider) return null;

  if (provider && provider.id && provider.type && PROVIDERS[provider.type]) {
    const Provider = PROVIDERS[provider.type];
    return <Provider embedId={provider.id} provider={provider} width={width} height={height} blockId={blockId} />;
  }

  return (
    <div className="w-full">
      <iframe
        src={provider.url}
        width="100%"
        height="100%"
        frameBorder={0}
        allowFullScreen
        className="yoo-video-absolute yoo-video-top-0 yoo-video-left-0"
      />
    </div>
  );
};

export { EmbedComponent, EmbedComponentProps };
