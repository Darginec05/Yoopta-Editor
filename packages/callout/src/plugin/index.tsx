import { YooptaPlugin } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys } from '../types';
import { CalloutEditor } from '../editor/CalloutEditor';
import { CalloutRenderer } from '../render/CalloutRenderer';

const Callout = new YooptaPlugin<CalloutPluginElementKeys, CalloutElementProps>({
  type: 'Callout',
  elements: {
    callout: {
      render: {
        editor: CalloutEditor,
        renderer: CalloutRenderer,
      },
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
