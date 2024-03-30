import { useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { useEffect } from 'react';
import { VideoElementProps, VideoPluginElements, VideoPluginOptions } from '../types';

type Props = {
  onClose: () => void;
  blockId: string;
  accept?: string;
  onSetLoading: (_s: boolean) => void;
};

const FileUploader = ({ accept = 'video/*', onClose, blockId, onSetLoading }: Props) => {
  const options = useYooptaPluginOptions<VideoPluginOptions>('Video');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      throw new Error('onUpload not provided in plugin options. Check Video.extend({}) method');
    }
    onClose();
    onSetLoading(true);

    try {
      // [TODO] - abort controller?
      const data = await options?.onUpload(file);

      editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(blockId, 'video', {
        src: data.src,
        sizes: data.sizes,
        bgColor: data.bgColor,
      });
    } catch (error) {
    } finally {
      onSetLoading(false);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) upload(file);
  };

  return (
    <div className="yoo-video-user-select-none yoo-video-transition-bg yoo-video-duration-20 yoo-video-ease-in yoo-video-white-space-nowrap yoo-video-rounded-[4px] yoo-video-h-[32px] yoo-video-px-[12px] yoo-video-border yoo-video-border-[rgba(55,53,47,0.16)] yoo-video-w-full yoo-video-cursor-pointer">
      <label
        htmlFor="video-uploader"
        className="yoo-video-text-[14px] yoo-video-leading-[1.2] yoo-video-font-medium yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-items-center yoo-video-justify-center yoo-video-h-full"
      >
        <input
          type="file"
          id="video-uploader"
          className="yoo-video-absolute yoo-video-left-0 yoo-video-top-0 yoo-video-invisible"
          accept={options?.accept || accept}
          onChange={onChange}
          multiple={false}
        />
        Upload video
      </label>
    </div>
  );
};

export { FileUploader };
