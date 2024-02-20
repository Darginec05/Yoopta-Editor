import { createYooptaPlugin } from '@yoopta/editor';
import { CalloutRender } from '../ui/Callout';

const Callout = createYooptaPlugin({
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
