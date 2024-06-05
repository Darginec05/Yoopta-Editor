import { YooptaPlugin } from '@yoopta/editor';
import { SeparatorHorizontal } from 'lucide-react';
import { DividerRenderElement } from './renders/Divider';

const DividerPlugin = new YooptaPlugin({
  type: 'Divider',
  elements: {
    divider: {
      render: DividerRenderElement,
      props: {
        nodeType: 'void',
      },
    },
  },
  options: {
    shortcuts: ['--', '---'],
    display: {
      title: 'New Divider Plugin',
      description: 'Separate',
      icon: <SeparatorHorizontal />,
    },
  },
});

export { DividerPlugin };
