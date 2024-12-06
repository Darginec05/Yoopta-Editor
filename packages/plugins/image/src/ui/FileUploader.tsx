import { Elements, useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { limitSizes } from '../utils/limitSizes';
import { ImageLoadingState } from './Image';

type Props = {
  onClose: () => void;
  blockId: string;
  accept?: string;
  onUpdateLoadingState: (state: ImageLoadingState) => void;
};

function toBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const FileUploader = ({ accept = 'image/*', onClose, blockId, onUpdateLoadingState }: Props) => {
  const options = useYooptaPluginOptions<ImagePluginOptions>('Image');
  const editor = useYooptaEditor();

  const upload = async (file: File) => {
    if (!options?.onUpload) {
      console.warn('onUpload not provided');
      return;
    }
    onClose();

    try {
      const base64 = (await toBase64(file)) as string;
      onUpdateLoadingState({ progress: 100, base64, loading: true });

      const data = await options?.onUpload(file);
      const defaultImageProps = editor.plugins.Image.elements.image.props as ImageElementProps;
      const sizes = data.sizes || defaultImageProps.sizes;
      const maxSizes = (editor.plugins.Image.options as ImagePluginOptions)?.maxSizes;
      const limitedSizes = limitSizes(sizes!, {
        width: maxSizes!.maxWidth!,
        height: maxSizes!.maxHeight!,
      });

      Elements.updateElement<ImagePluginElements, ImageElementProps>(editor, blockId, {
        type: 'image',
        props: {
          src: data.src,
          alt: data.alt,
          sizes: limitedSizes,
          bgColor: data.bgColor || defaultImageProps.bgColor,
          fit: data.fit || defaultImageProps.fit || 'fill',
        },
      });
    } catch (error) {
    } finally {
      onUpdateLoadingState(null);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) upload(file);
  };

  return (
    <div className="yoo-image-user-select-none yoo-image-transition-bg yoo-image-duration-20 yoo-image-ease-in yoo-image-white-space-nowrap yoo-image-rounded-[4px] yoo-image-h-[32px] yoo-image-px-[12px] yoo-image-border yoo-image-border-solid yoo-image-border-[rgba(55,53,47,0.16)] yoo-image-w-full yoo-image-cursor-pointer">
      <label
        htmlFor="image-uploader"
        className="yoo-image-text-[14px] yoo-image-leading-[1.2] yoo-image-font-medium yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-items-center yoo-image-justify-center yoo-image-h-full"
      >
        <input
          type="file"
          id="image-uploader"
          className="yoo-image-absolute yoo-image-left-0 yoo-image-top-0 yoo-image-invisible"
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
