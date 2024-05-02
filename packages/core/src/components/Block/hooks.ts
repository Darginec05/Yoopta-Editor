import { useYooptaTools } from '../../contexts/YooptaContext/ToolsContext';
import {
  useFloating,
  offset,
  flip,
  inline,
  shift,
  useTransitionStyles,
  autoUpdate,
  FloatingPortal,
  FloatingOverlay,
} from '@floating-ui/react';
import { useState } from 'react';
import { buildActionMenuRenderProps } from '../../UI/BlockOptions/utils';

export const useActionMenuToolRefs = ({ editor }) => {
  const tools = useYooptaTools();
  const ActionMenu = tools.ActionMenu;

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const {
    refs: actionMenuRefs,
    floatingStyles: actionMenuFloatingStyles,
    context: actionMenuContext,
  } = useFloating({
    placement: 'bottom-start',
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted: isMountedActionMenu, styles: actionMenuTransitionStyles } = useTransitionStyles(
    actionMenuContext,
    { duration: 100 },
  );

  const actionMenuStyles = { ...actionMenuFloatingStyles, ...actionMenuTransitionStyles };
  const onChangeActionMenuOpen = (state) => setIsActionMenuOpen(state);

  const onCloseActionMenu = () => onChangeActionMenuOpen(false);
  const actionMenuRenderProps = buildActionMenuRenderProps({
    editor,
    view: 'default',
    mode: 'create',
    onClose: onCloseActionMenu,
  });

  return {
    isActionMenuOpen: isMountedActionMenu,
    actionMenuStyles,
    actionMenuRefs,
    hasActionMenu: !!ActionMenu,
    onChangeActionMenuOpen,
    actionMenuRenderProps,
    onCloseActionMenu,
    ActionMenu,
  };
};
