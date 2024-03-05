import { useYooptaEditor, useYooptaPluginOptions } from '@yoopta/editor';
import { Element, Transforms } from 'slate';
import { ImageElement } from '../types';

const ImageFileUploader = ({ accept = 'image/*' }) => {
  const options = useYooptaPluginOptions('Image');
  const editor = useYooptaEditor();

  const handeUploading = (file: File) => {
    if (!options?.onUpload) {
      console.warn('onUpload not provided');
      return;
    }

    const pluginId = 'image';
    const slate = editor.blockEditorsMap[pluginId];

    options
      ?.onUpload(file)
      .then((response) => {
        editor.blocks.Image.update({
          elements: {
            image: {
              src: response.url,
              srcSet: response.srcSet,
              alt: response.alt,
              sizes: response.sizes,
            },
          },
        });

        // Transforms.setNodes<ImageElement>(
        //   slate,
        //   {
        //     props: {
        //       src: 'https://res.cloudinary.com/ench-app/image/upload/v1709585773/GHuDjvNWkAAD5aU_rxrzfn.jpg',
        //       srcSet: null,
        //       alt: 'cloudinary',
        //       sizes: response.sizes,
        //     },
        //   },
        //   { at: [0], voids: true, match: (n) => Element.isElement(n) && n.type === 'image' },
        // );

        // editor.applyChanges();

        console.log('slate', slate.children);
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
