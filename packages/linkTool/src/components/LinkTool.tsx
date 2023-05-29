import { generateId, YooEditor, YooptaBaseElement } from '@yoopta/editor';
import { useState, ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { Editor, Element, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import DoneIcon from './icons/done.svg';
import CloseIcon from './icons/close.svg';
import s from './LinkTool.module.scss';

const removeLinkNode = (editor: YooEditor, selection: Range) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      at: selection.anchor.path,
      mode: 'lowest',
    });
  });
};

const addLinkNode = (editor: YooEditor, url: string, selection: Range) => {
  Editor.withoutNormalizing(editor, () => {
    let linkSelection: Range = selection;

    if (isLinkNodeActive(editor, selection)) {
      removeLinkNode(editor, selection);

      linkSelection = {
        anchor: { ...linkSelection.anchor, path: linkSelection.anchor.path.slice(0, -1) },
        focus: { ...linkSelection.focus, path: linkSelection.focus.path.slice(0, -1) },
      };
    }

    const link: YooptaBaseElement<'link'> = {
      id: generateId(),
      type: 'link',
      data: { url, skipDrag: true },
      children: [],
      nodeType: 'inline',
    };

    Transforms.wrapNodes(editor, link, { split: true, at: linkSelection });
    Transforms.collapse(editor, { edge: 'end' });
  });
};

const isLinkNodeActive = (editor: YooEditor, selection: Range) => {
  return !!getMatchedLinkNode(editor, selection);
};

const getMatchedLinkNode = (editor: Editor, selection: Range) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

const LinkTool = ({ asTool, style, selection, on }) => {
  const editor = useSlate() as YooEditor;

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
      addLinkNode(editor, url, selection);
    }

    on?.add?.();
  };

  useEffect(() => {
    if (asTool) {
      inputRef.current?.focus();
      const [matchedLinkNode] = getMatchedLinkNode(editor, selection) || [];

      if (matchedLinkNode) {
        setUrl(matchedLinkNode.data?.url);
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
