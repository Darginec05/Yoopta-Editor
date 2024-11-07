import { YooptaPlugin } from '@yoopta/editor';
import { MousePointer } from 'lucide-react';
import { ButtonRender } from './ButtonRender';
import { ButtonPluginMap } from './types';

const ButtonPlugin = new YooptaPlugin<ButtonPluginMap>({
  type: 'Button',
  elements: {
    button: {
      render: ButtonRender,
      props: {
        href: '',
        color: '#fff',
        backgroundColor: '#000',
        variant: 'default',
      },
    },
  },
  options: {
    display: {
      title: 'Button',
      description: 'Add a button',
      icon: MousePointer,
    },
  },
});

export { ButtonPlugin };
