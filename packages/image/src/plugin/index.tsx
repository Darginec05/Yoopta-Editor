import { createYooptaPlugin } from '@yoopta/editor';
import { ImageRender } from '../ui/Image';

const Image = createYooptaPlugin({
  type: 'ImagePlugin',
  elements: {
    image: {
      render: ImageRender,
      options: {
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Image',
  },
});

export { Image };
