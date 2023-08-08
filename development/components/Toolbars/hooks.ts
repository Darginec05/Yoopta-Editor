import { CSSProperties, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll, YooEditor } from '@yoopta/editor';
import { Editor, Element } from 'slate';
import { ReactEditor } from 'slate-react';

type TurnInto = {
  style?: CSSProperties;
  open: boolean;
};

const DEFAULT_TURN_INTO_STYLES: TurnInto['style'] = {
  position: 'fixed',
  opacity: 1,
  bottom: 'auto',
  right: 'auto',
};

export const getMatchedLinkNode = (editor: YooEditor, type: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

type Props = {
  editor: YooEditor;
  toolbarRef: any;
  selectionRef: any;
};

export const useLinkTool = ({ editor, toolbarRef, selectionRef }: Props) => {
  const linkToolButtonRef = useRef<HTMLButtonElement>(null);

  const [linkToolProps, setLinkToolProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const openLinkTools = () => {
    const linkToolButtonRect = linkToolButtonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();

    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position = {
      left: toolbarRect.left,
      top: toolbarRect.top,
    };

    if (position.top > window?.innerHeight) {
      position.top = linkToolButtonRect.top - 10;
    }

    selectionRef.current = editor.selection;
    ReactEditor.deselect(editor);

    setLinkToolProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const onCloseLinkTool = () => {
    enableBodyScroll(document.body);
    setLinkToolProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });

    if (selectionRef.current) {
      Editor.removeMark(editor, 'selection');
      selectionRef.current = null;
    }
  };

  const hasMatchedLink = !!getMatchedLinkNode(editor, 'link');

  return {
    closeLinkTool: onCloseLinkTool,
    openLinkTool: openLinkTools,
    linkToolProps,
    hasMatchedLink,
    selectionRef,
    linkToolButtonRef,
  };
};
