import { CSSProperties, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '@yoopta/editor';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { getMatchedLinkNode } from '../utils/getMatchedNode';

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

export const useLinkTool = ({ editor, toolbarRef, selectionRef }) => {
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
