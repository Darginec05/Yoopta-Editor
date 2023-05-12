import { createYooptaPlugin, cx, generateId, RenderYooptaElementProps, getElementClassname } from '@yoopta/editor';
import { Transforms } from 'slate';
import { CalloutElement } from '../types';
import s from './Callout.module.scss';

const CalloutRender = ({ attributes, children, element, HTMLAttributes }: RenderYooptaElementProps<CalloutElement>) => {
  return (
    <div
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<CalloutElement>({ element, HTMLAttributes, className: s.callout })}
      {...attributes}
    >
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

const Callout = createYooptaPlugin<any, CalloutElement>({
  type: 'callout',
  renderer: (editor) => CalloutRender,
  shortcut: '<',
  defineElement: () => ({
    id: generateId(),
    type: 'callout',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor) {
    const node: CalloutElement = Callout.getPlugin.defineElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `> ${text}`,
    },
    html: {
      serialize: (node, children) =>
        `<div style="background: #f5f7f9; border-radius: 5px; color: #292929; padding: 12px 14px">${children}</div>`,
      deserialize: {
        nodeName: 'BLOCKQUOTE',
      },
    },
  },
});

export { Callout };
