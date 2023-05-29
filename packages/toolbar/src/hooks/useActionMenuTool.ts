import { CSSProperties, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '@yoopta/editor';

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

export const useActionMenuTool = ({ editor, toolbarRef }) => {
  const handleIntoButtonRef = useRef<HTMLButtonElement>(null);

  const [turnIntoElementsProps, setTurnIntoElementsProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const handleTurnInto = () => {
    const handleIntoButtonRect = handleIntoButtonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();
    const actionMenuRect = document.querySelector('.yoopta-action-menu-list')?.getBoundingClientRect();

    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position = {
      left: handleIntoButtonRect.left - 5,
      top: handleIntoButtonRect.top + toolbarRect.height + (actionMenuRect?.height || 0) + 5,
    };

    if (position.top > window?.innerHeight) {
      position.top = handleIntoButtonRect.top - 10;
    }

    setTurnIntoElementsProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const onCloseActionMenu = () => {
    enableBodyScroll(document.body);
    setTurnIntoElementsProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });
  };

  return {
    openActionMenuTool: handleTurnInto,
    closeActionMenuTool: onCloseActionMenu,
    turnIntoElementsProps,
    handleIntoButtonRef,
  };
};
