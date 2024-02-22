import { createYooptaPlugin } from '@yoopta/editor';
import { ImageRender } from '../ui/Image';

const Image = createYooptaPlugin({
  type: 'Image',
  elements: {
    image: {
      render: ImageRender,
      props: {
        src: 'https://images.unsplash.com/photo-1599595344070-c456bea6ee98?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: null,
        srcSet: null,
        fit: 'cover',
        sizes: { width: 626, height: 400, maxWidth: 700, maxHeight: 400 },
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Image in action',
  },
});

export { Image };
