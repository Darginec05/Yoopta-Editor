import { ClipboardEvent, CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { useYooptaEditor, useYooptaReadOnly } from '../../contexts/YooptaContext/YooptaContext';
import { RenderBlocks } from './RenderBlocks';
import { YooptaMark } from '../../marks';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { buildBlockData } from './utils';
import { generateId } from '../../utils/generateId';
import { HOTKEYS } from '../../utils/hotkeys';
import { Editor as SlateEditor, Element, Path, Range, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { ReactEditor } from 'slate-react';
import { YooptaBlockPath, YooptaContentValue } from '../../editor/types';
import { useRectangeSelectionBox } from '../SelectionBox/hooks';
import { SelectionBox } from '../SelectionBox/SelectionBox';
import { Blocks } from '../../editor/blocks';

type Props = {
  marks?: YooptaMark<any>[];
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  width?: number | string;
  children: ReactNode;
  style?: CSSProperties;
};

const getEditorStyles = (styles: CSSProperties) => ({
  ...styles,
  width: styles.width || 400,
  paddingBottom: typeof styles.paddingBottom === 'number' ? styles.paddingBottom : 100,
});

type State = {
  selectionStarted: boolean;
  indexToSelect: null | number;
  startedIndexToSelect: null | number;
};

const DEFAULT_STATE: State = {
  selectionStarted: false,
  indexToSelect: null,
  startedIndexToSelect: null,
};

const Editor = ({
  placeholder,
  marks,
  className,
  selectionBoxRoot,
  width,
  style,
  children,
  autoFocus = true,
}: Props) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const selectionBox = useRectangeSelectionBox({ editor, root: selectionBoxRoot });

  let state = useRef<State>(DEFAULT_STATE).current;

  useEffect(() => {
    if (!autoFocus || isReadOnly) return;
    editor.focus();
  }, [autoFocus, isReadOnly]);

  useEffect(() => {
    if (isReadOnly) return;

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [editor.selectedBlocks, isReadOnly]);

  const handleEmptyZoneClick = (e: React.MouseEvent) => {
    const editorEl = editor.refElement;
    if (!editorEl) return;

    const { bottom } = editorEl.getBoundingClientRect();
    const paddingBottom = parseInt(getComputedStyle(editorEl).paddingBottom, 10);
    const paddingBottomAreaTop = bottom - paddingBottom;
    const defaultBlock = buildBlockData({ id: generateId() });

    if (e.clientY >= paddingBottomAreaTop) {
      const lastPath = Object.keys(editor.children).length - 1;
      const lastBlock = findPluginBlockBySelectionPath(editor, { at: [lastPath] });
      const lastSlate = findSlateBySelectionPath(editor, { at: [lastPath] });

      if (lastBlock && lastSlate && lastSlate.selection) {
        const string = SlateEditor.string(lastSlate, lastSlate.selection.anchor.path);
        const parentPath = Path.parent(lastSlate.selection.anchor.path);
        const [lastNode] = SlateEditor.node(lastSlate, parentPath);

        if (
          lastBlock.type === defaultBlock.type &&
          Element.isElement(lastNode) &&
          lastNode.props?.nodeType !== 'void' &&
          string.trim().length === 0
        ) {
          editor.focusBlock(lastBlock.id, { slate: lastSlate });
          return;
        }
      }

      const nextPath = lastPath + 1;
      editor.insertBlock(defaultBlock, { at: [nextPath], focus: true });
    }
  };

  const resetSelectedBlocks = () => {
    if (isReadOnly) return;

    if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks.length > 0) {
      editor.setBlockSelected(null);
    }
  };

  const resetSelectionState = () => {
    state.indexToSelect = null;
    state.startedIndexToSelect = null;
    state.selectionStarted = false;
  };

  const onMouseDown = (event: React.MouseEvent) => {
    if (isReadOnly) return;

    // if (event.shiftKey) {
    //   const currentSelectionIndex = editor.selection;
    //   if (!currentSelectionIndex) return;

    //   const targetBlock = (event.target as HTMLElement).closest('div[data-yoopta-block]');
    //   const targetBlockId = targetBlock?.getAttribute('data-yoopta-block-id') || '';
    //   const targetBlockIndex = editor.children[targetBlockId]?.meta.order;
    //   if (typeof targetBlockIndex !== 'number') return;

    //   const indexesBetween = Array.from({ length: Math.abs(targetBlockIndex - currentSelectionIndex[0]) }).map(
    //     (_, index) =>
    //       targetBlockIndex > currentSelectionIndex[0]
    //         ? currentSelectionIndex[0] + index + 1
    //         : currentSelectionIndex[0] - index - 1,
    //   );

    //   editor.blur();
    //   editor.setBlockSelected([currentSelectionIndex[0], ...indexesBetween], { only: true });
    //   return;
    // }

    resetSelectionState();
    handleEmptyZoneClick(event);
    resetSelectedBlocks();
  };

  const onBlur = (event: React.FocusEvent) => {
    const isInsideEditor = editor.refElement?.contains(event.relatedTarget as Node);
    if (isInsideEditor || isReadOnly) return;

    resetSelectionState();
    resetSelectedBlocks();
  };

  const onKeyDown = (event) => {
    if (isReadOnly) return;

    if (HOTKEYS.isSelect(event)) {
      const isAllBlocksSelected = editor.selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        return;
      }

      if (state.selectionStarted) {
        event.preventDefault();
        editor.setBlockSelected([], { allSelected: true });
        return;
      }
    }

    if (HOTKEYS.isCopy(event) || HOTKEYS.isCut(event)) {
      if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks.length > 0) {
        event.preventDefault();

        const htmlString = editor.getHTML(editor.getEditorValue());
        const textString = editor.getPlainText(editor.getEditorValue());
        const htmlBlob = new Blob([htmlString], { type: 'text/html' });
        const textBlob = new Blob([textString], { type: 'text/plain' });

        const clipboardItem = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        });

        navigator.clipboard.write([clipboardItem]).then(() => {
          const html = new DOMParser().parseFromString(htmlString, 'text/html');
          console.log('HTML copied\n', html.body);
        });

        if (HOTKEYS.isCut(event)) {
          const isAllBlocksSelected = editor.selectedBlocks.length === Object.keys(editor.children).length;

          editor.deleteBlocks({ paths: editor.selectedBlocks, focus: false });
          editor.setBlockSelected(null);
          resetSelectionState();

          if (isAllBlocksSelected) {
            editor.insertBlock(buildBlockData({ id: generateId() }), { at: [0], focus: true });
          }
        }
        return;
      }
    }

    if (HOTKEYS.isBackspace(event)) {
      event.stopPropagation();

      const isAllBlocksSelected =
        Array.isArray(editor.selectedBlocks) && editor.selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        editor.deleteBlocks({ deleteAll: true });
        editor.setBlockSelected(null);
        resetSelectionState();
        return;
      }

      if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks?.length > 0) {
        event.preventDefault();
        editor.deleteBlocks({ paths: editor.selectedBlocks, focus: false });
        editor.setBlockSelected(null);
        resetSelectionState();
        return;
      }
    }

    // [TODO] - handle sharing cursor between blocks
    if (HOTKEYS.isShiftArrowUp(event)) {
      if (typeof event.isDefaultPrevented === 'function' && event.isDefaultPrevented()) return;

      if (state.selectionStarted && state.startedIndexToSelect !== null && state.indexToSelect !== null) {
        const currentIndex = state.indexToSelect;
        const nextTopIndex = currentIndex - 1;
        if (currentIndex === 0) return;

        // jump to next index if started selection from this index
        if (currentIndex === state.startedIndexToSelect) {
          editor.setBlockSelected([nextTopIndex]);
          state.indexToSelect = nextTopIndex;
          return;
        }

        if (nextTopIndex < state.startedIndexToSelect) {
          editor.setBlockSelected([nextTopIndex]);
          state.indexToSelect = nextTopIndex;
          return;
        }

        if (editor.selectedBlocks?.includes(currentIndex) && currentIndex !== state.startedIndexToSelect) {
          const filteredIndexes = editor.selectedBlocks.filter((index) => index !== currentIndex);
          editor.setBlockSelected(filteredIndexes, { only: true });
          state.indexToSelect = nextTopIndex;
          return;
        }

        return;
      }

      const block = findPluginBlockBySelectionPath(editor);
      const slate = findSlateBySelectionPath(editor);

      if (!slate || !slate.selection || !block) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      // [TODO] - handle cases for inline node elements
      const isStart = SlateEditor.isStart(slate, slate.selection.focus, parentPath);

      if (Range.isExpanded(slate.selection) && isStart) {
        const prevPath: YooptaBlockPath = editor.selection ? [editor.selection[0] - 1] : [0];
        const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevPath });

        if (block && prevBlock) {
          event.preventDefault();

          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
          Transforms.deselect(slate);

          editor.setSelection(null);
          editor.setBlockSelected([block?.meta.order, block.meta.order - 1]);

          state.startedIndexToSelect = block.meta.order;
          state.indexToSelect = block.meta.order - 1;
          state.selectionStarted = true;
        }
      }
    }

    if (HOTKEYS.isShiftArrowDown(event)) {
      if (state.selectionStarted && state.indexToSelect !== null && state.startedIndexToSelect !== null) {
        const currentIndex = state.indexToSelect;
        const nextIndex = currentIndex + 1;

        if (nextIndex === Object.keys(editor.children).length) return;

        // jump to next index if started selection from this index
        if (currentIndex === state.startedIndexToSelect) {
          editor.setBlockSelected([nextIndex]);
          state.indexToSelect = nextIndex;
          return;
        }

        if (nextIndex > state.startedIndexToSelect) {
          editor.setBlockSelected([nextIndex]);
          state.indexToSelect = nextIndex;
          return;
        }

        if (editor.selectedBlocks?.includes(currentIndex) && currentIndex !== state.startedIndexToSelect) {
          const filteredIndexes = editor.selectedBlocks.filter((index) => index !== currentIndex);
          editor.setBlockSelected(filteredIndexes, { only: true });
          state.indexToSelect = nextIndex;
          return;
        }

        return;
      }

      const block = findPluginBlockBySelectionPath(editor);
      const slate = findSlateBySelectionPath(editor);
      if (!slate || !slate.selection || !block) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      // [TODO] - handle cases for inline node elements
      const isEnd = SlateEditor.isEnd(slate, slate.selection.focus, parentPath);

      if (Range.isExpanded(slate.selection) && isEnd) {
        const nextPath: YooptaBlockPath = editor.selection ? [editor.selection[0] + 1] : [0];
        const nextBlock = findPluginBlockBySelectionPath(editor, { at: nextPath });

        if (block && nextBlock) {
          event.preventDefault();

          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
          Transforms.deselect(slate);

          editor.setSelection(null);
          editor.setBlockSelected([block?.meta.order, block?.meta.order + 1]);

          state.startedIndexToSelect = block.meta.order;
          state.indexToSelect = block.meta.order + 1;
          state.selectionStarted = true;
        }
      }
    }

    if (HOTKEYS.isTab(event)) {
      const selectedBlocks = editor.selectedBlocks;
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
        event.preventDefault();

        // [TODO] - maybe we need to add support for passing blockIds?
        selectedBlocks.forEach((index) => {
          const block = Blocks.getBlock(editor, { at: [index] });
          editor.increaseBlockDepth({ blockId: block?.id });
        });
      }
      return;
    }

    if (HOTKEYS.isShiftTab(event)) {
      const selectedBlocks = editor.selectedBlocks;
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
        event.preventDefault();

        // [TODO] - maybe we need to add support for passing blockIds?
        selectedBlocks.forEach((index) => {
          const block = Blocks.getBlock(editor, { at: [index] });
          editor.decreaseBlockDepth({ blockId: block?.id });
        });
      }
      return;
    }
  };

  // This event handler will be fired only in read-only mode
  const onCopy = (e: ClipboardEvent) => {
    if (!isReadOnly) return;
    const clipboardData: Pick<DataTransfer, 'getData' | 'setData'> = e.clipboardData;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range.collapsed) return;

      const clonedContent = range.cloneContents();
      const blocksEl = clonedContent.querySelectorAll('[data-yoopta-block-id]');

      if (!blocksEl.length) return;

      const content: YooptaContentValue = Array.from(blocksEl).reduce((acc, blockEl) => {
        const blockId = blockEl.getAttribute('data-yoopta-block-id') || '';
        const block = editor.children[blockId];
        if (block) acc[blockId] = block;
        return acc;
      }, {});

      const htmlString = editor.getHTML(content);
      const textString = editor.getPlainText(content);

      clipboardData.setData('text/html', htmlString);
      clipboardData.setData('text/plain', textString);
      return;
    }
  };

  const editorStyles: CSSProperties = getEditorStyles({
    userSelect: selectionBox.selection ? 'none' : 'auto',
    pointerEvents: selectionBox.selection ? 'none' : 'auto',
    width: width || style?.width,
    paddingBottom: style?.paddingBottom,
  });

  return (
    <div
      ref={(ref) => (editor.refElement = ref)}
      className={className ? `yoopta-editor ${className}` : 'yoopta-editor'}
      style={editorStyles}
      onMouseDown={onMouseDown}
      onBlur={onBlur}
      onCopy={onCopy}
      onCut={onCopy}
    >
      <RenderBlocks editor={editor} marks={marks} placeholder={placeholder} />
      {selectionBoxRoot !== false && (
        <SelectionBox
          origin={selectionBox.origin}
          coords={selectionBox.coords}
          isOpen={selectionBox.selection && !isReadOnly}
        />
      )}
      {children}
    </div>
  );
};

export { Editor };
