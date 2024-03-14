import { YooptaPlugin } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys } from '../types';
import { CalloutRender } from '../ui/Callout';

const Callout = new YooptaPlugin<CalloutPluginElementKeys, CalloutElementProps>({
  type: 'CalloutPlugin',
  elements: {
    callout: {
      render: CalloutRender,
      props: {
        theme: 'default',
      },
    },
  },
  options: {
    displayLabel: 'Callout',
    shortcuts: ['<'],
  },
});

export { Callout };
