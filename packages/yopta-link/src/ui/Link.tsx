import { MouseEvent } from 'react';
import { Editor, Element, Path, Transforms } from 'slate';
import { createYoptaComponent, generateId } from '@yopta/editor';
import s from './Link.module.scss';

const LinkRender = ({ attributes, element, children }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // if (isEdit) return;
    return;

    // e.preventDefault();
    // const url = new URL(element.url);

    // if (url.host === window.location.host) {
    //   window.open(element.url, '_self');
    // } else {
    //   window.open(element.url, '_blank');
    // }
  };

  return (
    <a
      draggable={false}
      {...attributes}
      href={element.url}
      rel="noreferrer"
      target="_blank"
      className={s.link}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

LinkRender.displayName = 'Link';

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

const Link = createYoptaComponent({
  type: 'link',
  renderer: (editor: Editor) => (props) => <LinkRender {...props} />,
  handlers: {
    onKeyDown:
      (editor, { hotkeys }) =>
      (event) => {
        if (!editor.selection) return;
        const node = getNodeByPath(editor, editor.selection.anchor.path);

        if (node.type !== 'link') return;
        const { anchor } = editor.selection;

        if (hotkeys.isSplitBlock(event.nativeEvent)) {
          const isEnd = Editor.isEnd(editor, anchor, anchor.path);
          const isStart = Editor.isStart(editor, anchor, anchor.path);

          if (isEnd) {
            event.preventDefault();
            Editor.insertBreak(editor);
            Transforms.setNodes(editor, { id: generateId() });
            Transforms.removeNodes(editor, {
              match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === 'link',
            });

            return;
          }

          if (!isEnd && !isStart) {
            event.preventDefault();
            Transforms.splitNodes(editor);
            Transforms.setNodes(editor, { id: generateId() });
            Transforms.setNodes(
              editor,
              { id: generateId() },
              { match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === 'link' },
            );
          }

          return;
        }

        if (hotkeys.isSpace(event.nativeEvent)) {
          const inline = Editor.above(editor, {
            match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === 'link',
            mode: 'highest',
          });

          if (inline) {
            const [, inlinePath] = inline;

            if (Editor.isEnd(editor, anchor, inlinePath)) {
              const afterPoint = Editor.after(editor, inlinePath)!;

              Transforms.setSelection(editor, {
                anchor: afterPoint,
                focus: afterPoint,
              });
            }
          }

          return;
        }
      },
  },
});

export { Link };
