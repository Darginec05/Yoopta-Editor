import { CSSProperties, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll, useNodeElementSettings, YooptaBaseElement } from '@yoopta/editor';
import { ReactEditor } from 'slate-react';
import { Editor, Element } from 'slate';

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

export const useChatGPTTool = ({ editor, toolbarRef, selectionRef }) => {
  const ashGPTButtonRef = useRef<HTMLButtonElement>(null);
  const [, { changeSelectedNodeElement }] = useNodeElementSettings();
  const [selectedNodeText, setSelectedNodeText] = useState<null | string>(null);

  const [chatGPTToolProps, setChatGPTToolProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const onOpenChatGPT = () => {
    const askGPTButtonRect = ashGPTButtonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();

    // disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position: CSSProperties = {
      left: askGPTButtonRect.left - 5,
      top: toolbarRect.top + toolbarRect.height + askGPTButtonRect.height + 15,
      position: 'relative',
    };

    const [node] =
      Editor.above(editor, {
        at: editor.selection,
        match: (n) => Element.isElement(n),
      }) || [];

    changeSelectedNodeElement((node as YooptaBaseElement<string>) || null);

    const nodeHTMLElement = document.querySelector(`[data-element-id="${node?.id}"]`);
    setSelectedNodeText(nodeHTMLElement?.textContent || null);

    if (nodeHTMLElement) {
      const nodeElementRect = nodeHTMLElement.getBoundingClientRect();

      position.left = nodeElementRect.left;
      position.top = nodeElementRect.top + nodeElementRect.height + 15 + 30;
    }

    selectionRef.current = editor.selection;
    ReactEditor.deselect(editor);

    setChatGPTToolProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const onCloseChatGPT = () => {
    changeSelectedNodeElement(null);
    enableBodyScroll(document.body);
    setChatGPTToolProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });

    if (selectionRef.current) {
      Editor.removeMark(editor, 'selection');
      selectionRef.current = null;
    }
  };

  return {
    openChatGPTTool: onOpenChatGPT,
    closeChatGPTTool: onCloseChatGPT,
    chatGPTToolProps,
    ashGPTButtonRef,
    selectedNodeText,
  };
};
