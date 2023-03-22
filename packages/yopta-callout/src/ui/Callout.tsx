import { memo } from 'react';
import { generateId, YoptaComponent } from '@yopta/editor';
import s from './Callout.module.scss';
import { RenderElementProps } from 'slate-react';
import { Transforms } from 'slate';

const CalloutRender = ({ attributes, children, element }) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

const Callout = new YoptaComponent({
  type: 'callout',
  renderer: (editor) => CalloutRender,
  shortcut: '<',
  createNode: (editor, type, data) => {
    const node = {
      id: generateId(),
      type,
      ...data,
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Callout };
