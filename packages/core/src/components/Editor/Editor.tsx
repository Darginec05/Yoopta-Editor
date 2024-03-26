import { CSSProperties, useEffect, useRef } from 'react';
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
import { YooptaBlockPath } from '../../editor/types';
import { useRectangeSelectionBox } from '../SelectionBox/hooks';
import { SelectionBox } from '../SelectionBox/SelectionBox';

type Props = {
  marks?: YooptaMark<any>[];
  selectionBoxRoot?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
};

const getEditorStyles = (styles) => ({
  paddingBottom: 150,
  ...styles,
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

const Editor = ({ placeholder, marks, className, autoFocus = true, selectionBoxRoot }: Props) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const yooptaEditorRef = useRef<HTMLDivElement>(null);
  const selectionBox = useRectangeSelectionBox({ editor, yooptaEditorRef, root: selectionBoxRoot });

  console.log('editor', editor.blocks);

  let state = useRef<State>(DEFAULT_STATE).current;

  useEffect(() => {
    if (!autoFocus || isReadOnly) return;
    const firstBlock = findPluginBlockBySelectionPath(editor, { at: [0] });

    if (firstBlock) editor.focusBlock(firstBlock.id, { waitExecution: true });
  }, [autoFocus, isReadOnly]);

  useEffect(() => {
    if (isReadOnly) return;

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [editor.selectedBlocks, isReadOnly]);

  const handleEmptyZoneClick = (e: React.MouseEvent) => {
    const editorRef = yooptaEditorRef.current;
    if (!editorRef) return;

    const { bottom } = editorRef.getBoundingClientRect();
    const paddingBottom = parseInt(getComputedStyle(editorRef).paddingBottom, 10);
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

  const onClick = (event: React.MouseEvent) => {
    if (isReadOnly) return;

    resetSelectionState();
    handleEmptyZoneClick(event);
    resetSelectedBlocks();
  };

  const onBlur = (event: React.FocusEvent) => {
    const isInsideEditor = yooptaEditorRef.current?.contains(event.relatedTarget as Node);
    if (isInsideEditor || isReadOnly) return;

    resetSelectionState();
    resetSelectedBlocks();
  };

  const onCopy = (event: React.ClipboardEvent) => {
    // function escapeHtml(text) {
    //   const map = {
    //     '&': '&amp;',
    //     '<': '&lt;',
    //     '>': '&gt;',
    //     '"': '&quot;',
    //     "'": '&#039;',
    //   };
    //   return text.replace(/[&<>"']/g, (m) => map[m]);
    // }
    // function serializeNode(node, plugins) {
    //   if (Text.isText(node)) {
    //     return escapeHtml(node.text);
    //   }
    //   const children = node.children.map((node) => serializeNode(node, plugins)).join('');
    //   const plugin = plugins[node.type];
    //   if (typeof plugin.exports?.html?.serialize === 'function') {
    //     return plugin.exports.html.serialize(node, children);
    //   }
    //   return children;
    // }
    // export function serializeHtml(data: Descendant[], pluginsMap) {
    //   const html = data.map((node) => serializeNode(node, pluginsMap)).join('');
    //   return html;
    // }
  };

  const onKeyDown = (event) => {
    if (isReadOnly) return;

    // [TODO] - handle shift+click?
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

    if (HOTKEYS.isBackspace(event)) {
      event.stopPropagation();

      const isAllBlocksSelected =
        Array.isArray(editor.selectedBlocks) && editor.selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        editor.deleteBlock({ deleteAll: true });
        editor.setBlockSelected(null);
        resetSelectionState();
        return;
      }

      if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks?.length > 0) {
        event.preventDefault();
        editor.deleteBlock({ fromPaths: editor.selectedBlocks });
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
  };

  const editorStyles: CSSProperties = getEditorStyles({
    userSelect: selectionBox.selection ? 'none' : 'auto',
    pointerEvents: selectionBox.selection ? 'none' : 'auto',
  });

  return (
    <div
      id="yoopta-editor"
      className={className}
      style={editorStyles}
      ref={yooptaEditorRef}
      onClick={onClick}
      onBlur={onBlur}
    >
      <RenderBlocks editor={editor} marks={marks} placeholder={placeholder} />
      <SelectionBox
        origin={selectionBox.origin}
        coords={selectionBox.coords}
        isOpen={(selectionBox.selection && !isReadOnly) || selectionBoxRoot === null}
      />
    </div>
  );
};

export { Editor };
