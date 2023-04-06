import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { CalloutElement } from '../types';
import s from './Callout.module.scss';

const CalloutRender = ({ attributes, children, element }: RenderElementProps<CalloutElement>) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

const Callout = createYoptaPlugin<any, CalloutElement>({
  type: 'callout',
  renderer: (editor) => CalloutRender,
  shortcut: '<',
  createNode: (editor, type, data) => {
    const node: CalloutElement = {
      id: generateId(),
      type: 'callout',
      children: [{ text: '' }],
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Callout };
