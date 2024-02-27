import { CSSProperties, useEffect, useRef } from 'react';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { RenderBlocks } from './RenderBlocks';
import { Plugin } from '../../plugins/types';
import { YooptaMark } from '../../textFormatters/createYooptaMark';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { getDefaultParagraphBlock, getDefaultYooptaChildren } from './defaultValue';
import { generateId } from '../../utils/generateId';
import { HOTKEYS } from '../../utils/hotkeys';
import { Editor as SlateEditor, Element, Path, Range, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { ReactEditor, Slate } from 'slate-react';
import { YooptaBlockPath } from '../../editor/types';

type Props = {
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  autoFocus?: boolean;
  className?: string;
};

const DEFAULT_STYLES: CSSProperties = {
  paddingBottom: 150,
};

type State = {
  startSelectionToTop: boolean;
  startSelectionToTopIndex: null | number;
};

const Editor = ({ plugins, marks, className, autoFocus = true }: Props) => {
  const editor = useYooptaEditor();
  const yooptaEditorRef = useRef<HTMLDivElement>(null);

  const state = useRef<State>({
    startSelectionToTop: false,
    startSelectionToTopIndex: null,
  });

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    if (!autoFocus) return;

    const firstBlock = findPluginBlockBySelectionPath(editor, { at: [0] });
    if (firstBlock) editor.focusBlock(firstBlock.id);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [autoFocus]);

  const handleEmptyZoneClick = (e: React.MouseEvent) => {
    const editorRef = yooptaEditorRef.current;
    if (!editorRef) return;

    const { bottom } = editorRef.getBoundingClientRect();
    const paddingBottom = parseInt(getComputedStyle(editorRef).paddingBottom, 10);
    const paddingBottomAreaTop = bottom - paddingBottom;

    if (e.clientY >= paddingBottomAreaTop) {
      const lastPath = Object.keys(editor.children).length - 1;
      const lastBlock = findPluginBlockBySelectionPath(editor, { at: [lastPath] });
      const lastSlate = findSlateBySelectionPath(editor, { at: [lastPath] });

      if (lastBlock && lastSlate && lastSlate.selection) {
        const string = SlateEditor.string(lastSlate, lastSlate.selection.anchor.path);
        const parentPath = Path.parent(lastSlate.selection.anchor.path);
        const [lastNode] = SlateEditor.node(lastSlate, parentPath);

        if (Element.isElement(lastNode) && lastNode.props.nodeType !== 'void' && string.trim().length === 0) {
          editor.focusBlock(lastBlock.id, { slate: lastSlate });
          return;
        }
      }

      const defaultBlock = getDefaultParagraphBlock(generateId());
      const nextPath = lastPath + 1;
      editor.insertBlock(defaultBlock, { at: [nextPath], focus: true });
    }
  };

  const resetSelectedBlocks = () => {
    if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks.length > 0) {
      editor.setBlockSelected(null);
    }
  };

  const onClick = (event: React.MouseEvent) => {
    handleEmptyZoneClick(event);
    resetSelectedBlocks();
  };

  const onBlur = () => {
    resetSelectedBlocks();
  };

  const onKeyDown = (event) => {
    if (HOTKEYS.isSelect(event)) {
      const isAllBlocksSelected = editor.selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        return;
      }
    }

    if (HOTKEYS.isBackspace(event)) {
      const isAllBlocksSelected = editor.selectedBlocks?.length === Object.keys(editor.children).length;
      if (isAllBlocksSelected) {
        event.preventDefault();

        editor.deleteBlock({ deleteAll: true });

        // // [TODO] - create delete all blocks
        // Object.keys(editor.children).forEach((key) => {
        //   const block = editor.children[key];
        //   editor.deleteBlock({ at: [block.meta.order], focus: false });
        // });

        return;
      }
    }

    // [TODO] - handle sharing cursor between blocks
    if (HOTKEYS.isShiftArrowUp(event)) {
      console.log('startSelectionToTop', state.current.startSelectionToTop);
      let currentIndex = state.current.startSelectionToTopIndex;
      console.log('currentIndex', currentIndex);
      console.log('state.current.startSelectionToTopIndex', state.current.startSelectionToTopIndex);

      if (state.current.startSelectionToTop) {
        event.preventDefault();
        return;
      }

      if (typeof event.isDefaultPrevented === 'function' && event.isDefaultPrevented()) return;

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
          state.current.startSelectionToTopIndex = block.meta.order;

          // setTimeout(() => {
          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
          Transforms.deselect(slate);

          editor.setSelection(null);
          editor.setBlockSelected([block?.meta.order, prevBlock.meta.order]);

          state.current.startSelectionToTopIndex = state.current.startSelectionToTopIndex - 1;
          state.current.startSelectionToTop = true;
          // }, 10);
        }
      }
    }

    if (HOTKEYS.isShiftArrowDown(event)) {
      const block = findPluginBlockBySelectionPath(editor);
      const slate = findSlateBySelectionPath(editor);
      if (!slate || !slate.selection || !block) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      // [TODO] - handle cases for inline node elements
      const isEnd = SlateEditor.isEnd(slate, slate.selection.anchor, parentPath);

      console.log('isEnd isShiftArrowUp', isEnd);
    }
  };

  return (
    <div
      id="yoopta-editor"
      className={className}
      style={DEFAULT_STYLES}
      ref={yooptaEditorRef}
      onClick={onClick}
      onBlur={onBlur}
      // onKeyDown={onKeyDown}
    >
      <RenderBlocks editor={editor} plugins={plugins} marks={marks} />
    </div>
  );
};

export { Editor };
