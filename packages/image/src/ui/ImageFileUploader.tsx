import { useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { Transforms } from 'slate';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';

const ImageFileUploader = ({ accept = 'image/*' }) => {
  const options = useYooptaPluginOptions<ImagePluginOptions>('Image');
  const editor = useYooptaEditor();

  const handeUploading = (file: File) => {
    if (!options?.onUpload) {
      console.warn('onUpload not provided');
      return;
    }

    options
      ?.onUpload(file)
      .then((response) => {
        const deviceSizes = options.deviceSizes;
        let srcSet = '';

        if (deviceSizes) {
          srcSet = deviceSizes.map((size) => `${response.src} ${size}w`).join(', ');
        }

        console.log('srcSet', srcSet);

        editor.blocks.Image.updateElement<ImagePluginElements, ImageElementProps>('image', {
          src: response.src,
          alt: response.alt,
          srcSet,
          sizes: response.sizes,
        });
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      handeUploading(file);
    }
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
          onChange={onChangeFile}
          multiple={false}
        />
        Upload image
      </label>
    </div>
  );
};

export { ImageFileUploader };
