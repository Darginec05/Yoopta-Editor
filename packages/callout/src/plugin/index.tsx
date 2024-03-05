import { YooptaPlugin } from '@yoopta/editor';
import { CalloutRender } from '../ui/Callout';

const Callout = new YooptaPlugin({
  type: 'CalloutPlugin',
  elements: {
    callout: {
      render: CalloutRender,
    },
  },
  options: {
    displayLabel: 'Callout',
    shortcuts: ['<'],
  },
});

export { Callout };
