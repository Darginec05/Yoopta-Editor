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
import { useMultiSelection } from './selection';
import { getPreviousPath } from '../../editor/paths/getPreviousPath';
import { Paths } from '../../editor/paths';

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
  const multiSelection = useMultiSelection({ editor });

  let state = useRef<State>(DEFAULT_STATE).current;

  useEffect(() => {
    if (!autoFocus || isReadOnly) return;
    editor.focus();
  }, [autoFocus, isReadOnly]);

  console.log('editor.selection', editor.selection);

  useEffect(() => {
    if (isReadOnly) return;

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [editor.selection, isReadOnly]);

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
      editor.insertBlock(defaultBlock.type, { at: [nextPath], focus: true });
    }
  };

  const resetSelectionState = () => {
    state.indexToSelect = null;
    state.startedIndexToSelect = null;
    state.selectionStarted = false;
  };

  const onMouseDown = (event: React.MouseEvent) => {
    if (isReadOnly) return;

    multiSelection.onMouseDown(event);
    resetSelectionState();
    handleEmptyZoneClick(event);
  };

  const onBlur = (event: React.FocusEvent) => {
    const isInsideEditor = editor.refElement?.contains(event.relatedTarget as Node);
    if (isInsideEditor || isReadOnly) return;

    resetSelectionState();

    const selectedBlocks = Paths.getSelectedPaths(editor.selection);
    if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
      // editor.setBlockSelected(null);
      editor.setSelection([null]);
    }
  };

  const onKeyDown = (event) => {
    if (isReadOnly) return;

    if (HOTKEYS.isSelect(event)) {
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      const isAllBlocksSelected = selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        return;
      }

      if (state.selectionStarted) {
        const allBlockIndexes = Object.keys(editor.children).map((k, i) => i);
        event.preventDefault([null, allBlockIndexes]);
        // editor.setBlockSelected([], { allSelected: true });
        return;
      }
    }

    if (HOTKEYS.isCopy(event) || HOTKEYS.isCut(event)) {
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
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
          // [TEST]
          editor.batchOperations(() => {
            const selectedBlocks = Paths.getSelectedPaths(editor.selection);

            if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
              const isAllBlocksSelected = selectedBlocks.length === Object.keys(editor.children).length;

              selectedBlocks.forEach((index) => {
                const blockId = Blocks.getBlock(editor, { at: [index] })?.id;
                console.log('isAllBlocksSelected blockId', blockId);
                if (blockId) editor.deleteBlock({ blockId });
              });

              // editor.setBlockSelected(null);
              editor.setSelection([null]);
              resetSelectionState();

              if (isAllBlocksSelected) {
                const defaultBlock = buildBlockData({ id: generateId() });
                editor.insertBlock(defaultBlock.type, { at: [0], focus: true });
              }
            }
          });
        }
        return;
      }
    }

    if (HOTKEYS.isBackspace(event)) {
      event.stopPropagation();
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      const isAllBlocksSelected = selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();

        // [TEST]
        editor.batchOperations(() => {
          const allBlocks = Object.keys(editor.children);
          allBlocks.forEach((blockId) => editor.deleteBlock({ blockId }));

          // editor.setBlockSelected(null);
          editor.setSelection([null]);
          resetSelectionState();
        });

        return;
      }

      // [TEST]
      editor.batchOperations(() => {
        const selectedBlocks = Paths.getSelectedPaths(editor.selection);

        if (Array.isArray(selectedBlocks) && selectedBlocks?.length > 0) {
          event.preventDefault();
          selectedBlocks.forEach((index) => editor.deleteBlock({ at: [index] }));

          // editor.setBlockSelected(null);
          editor.setSelection([null]);
          resetSelectionState();
        }
      });

      return;
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
          // editor.setBlockSelected([nextTopIndex]);
          editor.setSelection([nextTopIndex]);
          state.indexToSelect = nextTopIndex;
          return;
        }

        if (nextTopIndex < state.startedIndexToSelect) {
          // editor.setBlockSelected([nextTopIndex]);
          editor.setSelection([nextTopIndex]);
          state.indexToSelect = nextTopIndex;
          return;
        }

        const selectedBlocks = Paths.getSelectedPaths(editor.selection);

        if (selectedBlocks?.includes(currentIndex) && currentIndex !== state.startedIndexToSelect) {
          const filteredIndexes = selectedBlocks.filter((index) => index !== currentIndex);
          // editor.setBlockSelected(filteredIndexes, { only: true });
          editor.setSelection([nextTopIndex, filteredIndexes]);
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
        const prevPath = getPreviousPath(editor.selection);
        if (!prevPath) return;

        const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevPath });

        if (block && prevBlock) {
          event.preventDefault();

          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
          Transforms.deselect(slate);

          editor.setSelection([null]);
          // editor.setBlockSelected([block?.meta.order, block.meta.order - 1]);

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
          // editor.setBlockSelected([nextIndex]);
          editor.setSelection([nextIndex]);
          state.indexToSelect = nextIndex;
          return;
        }

        if (nextIndex > state.startedIndexToSelect) {
          // editor.setBlockSelected([nextIndex]);
          editor.setSelection([nextIndex]);
          state.indexToSelect = nextIndex;
          return;
        }

        const selectedBlocks = Paths.getSelectedPaths(editor.selection);
        if (selectedBlocks?.includes(currentIndex) && currentIndex !== state.startedIndexToSelect) {
          const filteredIndexes = selectedBlocks.filter((index) => index !== currentIndex);
          // editor.setBlockSelected(filteredIndexes, { only: true });
          editor.setSelection([nextIndex, filteredIndexes]);
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
        const nextPath = Paths.getNextPath(editor.selection);
        const nextBlock = findPluginBlockBySelectionPath(editor, { at: nextPath });

        if (block && nextBlock) {
          event.preventDefault();

          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
          Transforms.deselect(slate);

          editor.setSelection([null]);
          // editor.setBlockSelected([block?.meta.order, block?.meta.order + 1]);

          state.startedIndexToSelect = block.meta.order;
          state.indexToSelect = block.meta.order + 1;
          state.selectionStarted = true;
        }
      }
    }

    if (HOTKEYS.isTab(event)) {
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
        event.preventDefault();

        editor.batchOperations(() => {
          selectedBlocks.forEach((index) => {
            const block = Blocks.getBlock(editor, { at: [index] });
            editor.increaseBlockDepth({ blockId: block?.id });
          });
        });
      }
      return;
    }

    if (HOTKEYS.isShiftTab(event)) {
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
        event.preventDefault();

        editor.batchOperations(() => {
          selectedBlocks.forEach((index) => {
            const block = Blocks.getBlock(editor, { at: [index] });
            editor.decreaseBlockDepth({ blockId: block?.id });
          });
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
