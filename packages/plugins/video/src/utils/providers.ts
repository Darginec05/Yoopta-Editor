import { VideoProviderTypes } from '../types';

export const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getVimeoId = (url: string) => {
  const vimeoUrl = new URL(url);
  const vimeoVideoId = vimeoUrl.pathname.split('/')[1];
  return vimeoVideoId;
};

export const getDailymotionId = (url: string) => {
  const m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
  if (m !== null) {
    if (m[4] !== undefined) {
      return m[4];
    }
    return m[2];
  }
  return null;
};

export function getProvider(url: string): VideoProviderTypes | null {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('vimeo.com')) {
    return 'vimeo';
  } else if (url.includes('dailymotion.com') || url.includes('dai.ly')) {
    return 'dailymotion';
  }
  // } else if (url.includes('twitch.tv')) {
  //   return 'Twitch';
  // }
  else {
    return null;
  }
}

export const ProviderGetters = {
  youtube: getYoutubeId,
  vimeo: getVimeoId,
  dailymotion: getDailymotionId,
};
