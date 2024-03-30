import { useEffect, useState } from 'react';
import { DefaultToolbarRender } from './DefaultToolbarRender';
import {
  useFloating,
  offset,
  flip,
  shift,
  inline,
  autoUpdate,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react';
import throttle from 'lodash.throttle';
import { useYooptaEditor } from '@yoopta/editor';

const Toolbar = () => {
  const editor = useYooptaEditor();
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [hold, setHold] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: isToolbarOpen,
    onOpenChange: setIsToolbarOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 100,
  });

  const selectionChange = () => {
    if (hold) return;

    const domSelection = window.getSelection();

    if (!domSelection || domSelection?.isCollapsed) return setIsToolbarOpen(false);

    const domRange = domSelection.getRangeAt(0);
    const selectionRect = domRange.getBoundingClientRect();
    const text = domRange.toString().trim();

    const pluginWithCustomEditor = document.querySelectorAll('[data-custom-editor]');
    const yooptaEditorEl = document.getElementById('yoopta-editor');
    const ancestor = domRange?.commonAncestorContainer;

    let isInsideCustomEditor = false;
    for (let i = 0; i < pluginWithCustomEditor.length; i++) {
      if (pluginWithCustomEditor[i].contains(ancestor)) {
        isInsideCustomEditor = true;
        break;
      }
    }

    if (!yooptaEditorEl?.contains(ancestor) || isInsideCustomEditor) {
      return setIsToolbarOpen(false);
    }

    if (domRange && text.length > 0) {
      refs.setReference({
        getBoundingClientRect: () => selectionRect,
        getClientRects: () => domRange.getClientRects(),
      });

      setIsToolbarOpen(true);
    }
  };

  const onSelectionChange = throttle(selectionChange, 200);

  useEffect(() => {
    window.document.addEventListener('selectionchange', onSelectionChange);
    return () => window.document.removeEventListener('selectionchange', onSelectionChange);
  }, [editor.selectedBlocks, hold, editor.children]);

  if (!isMounted) return null;

  const activeBlock = Object.values(editor.blocks).find((block) => block.isActive());
  const style = { ...floatingStyles, ...transitionStyles };

  const onHoldToolbarChange = (hold: boolean) => setHold(hold);

  return (
    // [TODO] - take care about SSR
    <FloatingPortal id="yoo-toolbar-portal" root={document.getElementById('yoopta-editor')}>
      <div style={style} ref={refs.setFloating} onClick={(e) => e.stopPropagation()}>
        <DefaultToolbarRender activeBlock={activeBlock} editor={editor} onHoldToolbarChange={onHoldToolbarChange} />
      </div>
    </FloatingPortal>
  );
};

export { Toolbar };
