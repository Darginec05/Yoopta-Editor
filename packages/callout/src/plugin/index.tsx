import { YooptaPlugin } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys } from '../types';
import { CalloutRender } from '../renders/Callout';

const Callout = new YooptaPlugin<CalloutPluginElementKeys, CalloutElementProps>({
  type: 'Callout',
  elements: {
    callout: {
      render: CalloutRender,
      props: {
        theme: 'default',
      },
    },
  },
  options: {
    display: {
      title: 'Callout',
      description: 'Make writing stand out',
    },
    shortcuts: ['<'],
  },
});

export { Callout };
