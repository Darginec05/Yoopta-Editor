import { generateId, isElementActive, YoEditor, YooptaBaseElement } from '@yoopta/editor';
import { useState, ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { Editor, Element, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import DoneIcon from './icons/done.svg';
import CloseIcon from './icons/close.svg';
import s from './LinkTool.module.scss';

export const removeLinkNode = (editor: YoEditor, selection: Range) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      at: selection.anchor.path,
      mode: 'lowest',
    });
  });
};

export const addLinkNode = (editor: YoEditor, url: string, selection: Range) => {
  if (isElementActive(editor, 'link')) {
    removeLinkNode(editor, selection);
  }

  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: YooptaBaseElement<'link'> = {
    id: generateId(),
    type: 'link',
    data: { url, skipDrag: true },
    children: isCollapsed ? [{ text: url }] : [],
    nodeType: 'inline',
  };

  Editor.withoutNormalizing(editor, () => {
    if (isCollapsed) {
      Transforms.insertNodes(editor, link, { at: selection });
    } else {
      Transforms.wrapNodes(editor, link, { split: true, at: selection });
      Transforms.collapse(editor, { edge: 'end' });
    }
  });
};

export const getMatchedLinkNode = (editor: Editor, selection: Range) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

const LinkTool = ({ asTool, style, selection, on }) => {
  const editor = useSlate();

  const [url, setUrl] = useState('');
  const [linkNode, setLinkNode] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  const deleteLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    removeLinkNode(editor, selection);
    on?.delete?.();
  };

  const addLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (url.length === 0) {
      removeLinkNode(editor, selection);
    } else {
      if (linkNode) {
        Transforms.setNodes(
          editor,
          { data: { ...linkNode.data, url } },
          {
            match: (n) => Element.isElement(n) && n.type === 'link',
            at: selection,
          },
        );
      } else {
        addLinkNode(editor, url, selection);
      }
    }

    on?.add?.();
  };

  useEffect(() => {
    if (asTool) {
      inputRef.current?.focus();
      const [matchedLinkNode] = getMatchedLinkNode(editor, selection) || [];

      if (matchedLinkNode) {
        setUrl(matchedLinkNode.data.url);
        setLinkNode(linkNode);
      }
    }
  }, [inputRef.current, asTool, selection]);

  return (
    <div className={s.block} style={style}>
      <input
        className={s.input}
        value={url}
        onChange={onChange}
        placeholder="Paste link"
        onPaste={(e) => e.stopPropagation()}
        ref={inputRef}
      />
      {url.length > 0 && (
        <>
          <div className={s.separator} />
          <button type="button" className={s.button} onClick={deleteLink}>
            <CloseIcon width={20} height={20} />
          </button>
        </>
      )}
      <div className={s.separator} />
      <button type="button" className={s.button} onClick={addLink}>
        <DoneIcon />
      </button>
    </div>
  );
};

export { LinkTool };
