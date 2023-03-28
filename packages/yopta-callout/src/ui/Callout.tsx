import { generateId, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import s from './Callout.module.scss';

const CalloutRender = ({ attributes, children, element }) => {
  console.log('element', element);

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
