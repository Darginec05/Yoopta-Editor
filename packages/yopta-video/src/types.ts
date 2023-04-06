export type VideoOptions = {
  size: { width: number; height: number };
  caption?: string;
};

export type VideoElement = {
  id: string;
  type: 'video';
  children: [{ text: '' }];
  options: VideoOptions;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
};
