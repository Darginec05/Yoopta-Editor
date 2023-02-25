import { KeyboardEvent, memo } from 'react';
import { Editor, Element, Path, Transforms } from 'slate';
import { createYoptaComponent, HandlersOptions } from '@yopta/editor';
import { codeDecorator } from '../utils/decorator';
import s from './Code.module.scss';

const CodeRender = memo<any>(({ attributes, children }) => {
  return (
    <code className={s.code} {...attributes}>
      <pre className={s.pre}>{children}</pre>
    </code>
  );
});

CodeRender.displayName = 'Code';

export const getNodeByPath = (editor: Editor, path?: Path, mode: 'all' | 'highest' | 'lowest' = 'lowest') => {
  const nodeEntry = Array.from(
    Editor.nodes(editor, {
      match: (node) => Editor.isEditor(editor) && Element.isElement(node),
      at: path || editor.selection?.anchor.path,
      mode,
    }),
  )[0];

  if (nodeEntry) return nodeEntry[0];

  return editor.children[0];
};

const NODE_TYPE = 'code';

const Code = createYoptaComponent({
  type: NODE_TYPE,
  renderer: (editor: Editor) => (props) => <CodeRender {...props} />,
  shortcut: '<',
  decorator: (editor: Editor) => codeDecorator,
  handlers: {
    onKeyDown: (editor: Editor, options: HandlersOptions) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (!editor.selection) return;

      const node = getNodeByPath(editor, editor.selection.anchor.path);

      if (node.type !== NODE_TYPE) return;
      const { hotkeys, defaultComponent } = options;

      if (hotkeys.isSoftBreak(event.nativeEvent)) {
        event.preventDefault();

        Transforms.splitNodes(editor, { always: true });
        Transforms.setNodes(editor, defaultComponent);
        return;
      }

      if (hotkeys.isSplitBlock(event.nativeEvent)) {
        event.preventDefault();
        editor.insertText('\n');
      }
    },
  },
});

export { Code };
