import { useEffect, useState } from 'react';
import { DefaultToolbarRender } from './DefaultToolbarRender';
import { useFloating, offset, flip, shift, inline, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import throttle from 'lodash.throttle';
import { useYooptaEditor, UI } from '@yoopta/editor';
import { ToolbarToolProps } from '../types';

const { Portal } = UI;

const Toolbar = ({ render }: ToolbarToolProps) => {
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
    const ancestor = domRange?.commonAncestorContainer;

    let isInsideCustomEditor = false;
    for (let i = 0; i < pluginWithCustomEditor.length; i++) {
      if (pluginWithCustomEditor[i].contains(ancestor)) {
        isInsideCustomEditor = true;
        break;
      }
    }

    if (!editor.refElement?.contains(ancestor) || isInsideCustomEditor) {
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
  }, [editor.selection, hold, editor.children]);

  if (!isMounted) return null;

  const activeBlock = Object.values(editor.blocks).find((block) => block.isActive());
  const style = { ...floatingStyles, ...transitionStyles };

  const toggleHoldToolbar = (hold: boolean) => setHold(hold);

  if (render) {
    const RenderComponent = render;

    return (
      <Portal id="yoo-toolbar-portal">
        <div style={style} ref={refs.setFloating} className="yoo-toolbar-z-[99]" onClick={(e) => e.stopPropagation()}>
          <RenderComponent activeBlock={activeBlock} editor={editor} toggleHoldToolbar={toggleHoldToolbar} />
        </div>
      </Portal>
    );
  }

  return (
    // [TODO] - take care about SSR
    <Portal id="yoo-toolbar-portal">
      <div style={style} ref={refs.setFloating} className="yoo-toolbar-z-[99]" onClick={(e) => e.stopPropagation()}>
        <DefaultToolbarRender activeBlock={activeBlock} editor={editor} toggleHoldToolbar={toggleHoldToolbar} />
      </div>
    </Portal>
  );
};

export { Toolbar };
