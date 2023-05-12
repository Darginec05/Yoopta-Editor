import { MouseEvent } from 'react';
import { Editor, Element, Node, NodeEntry, Path, Transforms } from 'slate';
import {
  getElementByPath,
  generateId,
  RenderYooptaElementProps,
  createYooptaPlugin,
  getElementClassname,
} from '@yoopta/editor';
import isUrl from 'is-url';
import { addLinkNode } from '../utils/addLink';
import { LinkEditor } from './LinkEditor';
import { LinkElement } from '../types';
import s from './Link.module.scss';

const LinkRender = ({ attributes, element, children, HTMLAttributes }: RenderYooptaElementProps<LinkElement>) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!element.data.url) return;

    const url = new URL(element.data.url);

    if (url.host === window.location.host) {
      window.open(element.data.url, '_self');
    } else {
      window.open(element.data.url, '_blank');
    }
  };

  return (
    <a
      draggable={false}
      href={element.data.url || ''}
      rel="noreferrer"
      target="_blank"
      onClick={handleClick}
      {...HTMLAttributes}
      className={getElementClassname<LinkElement>({ element, HTMLAttributes, className: s.link })}
      {...attributes}
    >
      {children}
    </a>
  );
};

LinkRender.displayName = 'Link';

const LINK_NODE_TYPE = 'link';

const Link = createYooptaPlugin<any, LinkElement>({
  type: LINK_NODE_TYPE,
  renderer: {
    editor: () => LinkEditor,
    render: LinkRender,
  },
  defineElement: (): LinkElement => ({
    id: generateId(),
    type: 'link',
    children: [{ text: '' }],
    nodeType: 'inline',
    data: { url: null, skipDrag: true },
  }),
  extendEditor(editor) {
    const { insertData, insertText, isInline, normalizeNode } = editor;

    editor.isInline = (element) => (element.type === LINK_NODE_TYPE ? true : isInline(element));

    editor.normalizeNode = (entry) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === LINK_NODE_TYPE) {
        if (node.children.length > 0 && Node.child(node, 0)?.text?.length === 0) {
          Transforms.removeNodes(editor, {
            at: entry[1],
            match: (n) => Element.isElement(n) && n.type === LINK_NODE_TYPE,
          });
        }
      }

      normalizeNode(entry);
    };

    editor.insertText = (text: string) => {
      if (text && isUrl(text)) {
        addLinkNode(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData('text/plain');

      if (text && isUrl(text)) {
        addLinkNode(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { hotkeys }) =>
      (event) => {
        if (!editor.selection) return;
        const node = getElementByPath(editor, editor.selection.anchor.path);

        if (node.type !== LINK_NODE_TYPE) return;
        const { anchor } = editor.selection;

        if (hotkeys.isEnter(event)) {
          const isEnd = Editor.isEnd(editor, anchor, anchor.path);
          const isStart = Editor.isStart(editor, anchor, anchor.path);

          console.log({ isStart });

          if (isStart) {
            event.preventDefault();
            const linkEntry: NodeEntry<LinkElement> | undefined = Editor.above(editor, {
              match: (n) => Element.isElement(n) && n.type === LINK_NODE_TYPE,
            });

            if (!linkEntry) return;
            const [, linkElementPath] = linkEntry;
            const parentEntry = Editor.parent(editor, linkElementPath);

            const [, parentElementPath] = parentEntry;

            Transforms.splitNodes(editor, {
              match: (n) => Element.isElement(n),
              mode: 'highest',
              always: true,
            });

            Transforms.setNodes(
              editor,
              { id: generateId() },
              {
                at: parentElementPath,
                match: (n) => Element.isElement(n),
                mode: 'highest',
              },
            );

            return;
          }

          if (isEnd) {
            event.preventDefault();
            Editor.insertBreak(editor);
            Transforms.setNodes(editor, { id: generateId() });
            Transforms.removeNodes(editor, {
              match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === LINK_NODE_TYPE,
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
              { match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === LINK_NODE_TYPE },
            );
          }

          return;
        }

        if (hotkeys.isSpace(event)) {
          const inline = Editor.above(editor, {
            match: (n) => Element.isElement(n) && Editor.isInline(editor, n) && n.type === LINK_NODE_TYPE,
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
  exports: {
    markdown: {
      serialize: (node, text) => `[${text}](${node.data.url})`,
    },
    html: {
      serialize: (node, children) =>
        `<a target="_blank" rel="noopener noreferrer" href="${node.data.url}">${children}</a>`,
      deserialize: {
        nodeName: 'A',
        parse: (el): LinkElement['data'] => {
          return {
            url: el.getAttribute('href'),
            skipDrag: true,
          };
        },
      },
    },
  },
});

export { Link, LinkElement };
