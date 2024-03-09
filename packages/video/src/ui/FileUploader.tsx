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

  useEffect(() => {}, []);

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
    <div className="user-select-none transition-bg duration-20 ease-in white-space-nowrap rounded-[4px] h-[32px] px-[12px] border border-[rgba(55,53,47,0.16)] w-full cursor-pointer">
      <label
        htmlFor="video-uploader"
        className="text-[14px] leading-[1.2] font-medium cursor-pointer w-full flex items-center justify-center h-full"
      >
        <input
          type="file"
          id="video-uploader"
          className="absolute left-0 top-0 invisible"
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
