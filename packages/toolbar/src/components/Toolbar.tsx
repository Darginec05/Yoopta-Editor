import { useEffect, useState } from 'react';
import { ToolbarComponent } from './ToolbarComponent';
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';
import throttle from 'lodash.throttle';
import { useYooptaEditor } from '@yoopta/editor';

const Toolbar = () => {
  const editor = useYooptaEditor();
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: 'top',
    open: isToolbarOpen,
    onOpenChange: setIsToolbarOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const handleSelectionChange = () => {
    const domSelection = window.getSelection();
    if (!domSelection || domSelection?.isCollapsed) return setIsToolbarOpen(false);

    const domRange = domSelection.getRangeAt(0);
    const selectionRect = domRange.getBoundingClientRect();
    const text = domRange.toString().trim();

    const yooptaEditorEl = document.getElementById('yoopta-editor');
    const ancestor = domRange?.commonAncestorContainer;

    if (!yooptaEditorEl?.contains(ancestor)) return setIsToolbarOpen(false);

    if (domRange && text.length > 0) {
      refs.setReference({
        getBoundingClientRect: () => selectionRect,
        getClientRects: () => domRange.getClientRects(),
      });

      setIsToolbarOpen(true);
    }
  };

  const onSelectionChange = throttle(handleSelectionChange, 200);

  useEffect(() => {
    window.document.addEventListener('selectionchange', onSelectionChange);
    return () => window.document.removeEventListener('selectionchange', onSelectionChange);
  }, [editor.selectedBlocks]);

  if (!isToolbarOpen) return null;

  const activeBlock = Object.values(editor.blocks).find((block) => block.isActive());

  return (
    // [TODO] - take care about SSR
    <FloatingPortal root={document.getElementById('yoopta-editor')}>
      <div style={floatingStyles} ref={refs.setFloating}>
        <ToolbarComponent activeBlock={activeBlock} editor={editor} />
      </div>
    </FloatingPortal>
  );
};

export { Toolbar };
