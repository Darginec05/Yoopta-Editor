import { useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';

const FileUploader = ({ accept = 'image/*', onClose, blockId }) => {
  const options = useYooptaPluginOptions<ImagePluginOptions>('Image');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      console.warn('onUpload not provided');
      return;
    }

    const response = await options?.onUpload(file);

    editor.blocks.Image.updateElement<ImagePluginElements, ImageElementProps>(blockId, 'image', {
      src: response.src,
      alt: response.alt,
      sizes: response.sizes,
      bgColor: response.bgColor,
      fit: 'contain',
    });

    onClose();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) upload(file);
  };

  return (
    <div className="user-select-none transition-bg duration-20 ease-in white-space-nowrap rounded-[4px] h-[32px] px-[12px] border border-[rgba(55,53,47,0.16)] w-full cursor-pointer">
      <label
        htmlFor="image-uploader"
        className="text-[14px] leading-[1.2] font-medium cursor-pointer w-full flex items-center justify-center h-full"
      >
        <input
          type="file"
          id="image-uploader"
          className="absolute left-0 top-0 invisible"
          accept={options?.accept || accept}
          onChange={onChange}
          multiple={false}
        />
        Upload image
      </label>
    </div>
  );
};

export { FileUploader };
