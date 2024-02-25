import { CSSProperties, useEffect, useRef } from 'react';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { RenderBlocks } from './RenderBlocks';
import { Plugin } from '../../plugins/types';
import { YooptaMark } from '../../textFormatters/createYooptaMark';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { getDefaultParagraphBlock } from './defaultValue';
import { generateId } from '../../utils/generateId';
import { HOTKEYS } from '../../utils/hotkeys';

type Props = {
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  autoFocus?: boolean;
  className?: string;
};

const DEFAULT_STYLES: CSSProperties = {
  paddingBottom: 150,
};

const Editor = ({ plugins, marks, className, autoFocus = true }: Props) => {
  const editor = useYooptaEditor();
  const yooptaEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoFocus) return;

    const firstBlock = findPluginBlockBySelectionPath(editor, { at: [0] });
    if (firstBlock) editor.focusBlock(firstBlock.id);
  }, [autoFocus]);

  const handleEmptyZoneClick = (e: React.MouseEvent) => {
    const editorRef = yooptaEditorRef.current;
    if (!editorRef) return;

    const { bottom } = editorRef.getBoundingClientRect();
    const paddingBottom = parseInt(getComputedStyle(editorRef).paddingBottom, 10);
    const paddingBottomAreaTop = bottom - paddingBottom;

    if (e.clientY >= paddingBottomAreaTop) {
      const defaultBlock = getDefaultParagraphBlock(generateId());
      const nextPath = Object.keys(editor.children).length;
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

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (HOTKEYS.isBackspace(event)) {
      const isAllBlocksSelected = editor.selectedBlocks?.length === Object.keys(editor.children).length;

      if (isAllBlocksSelected) {
        event.preventDefault();
        // delete all blocks and insert default block
        return;
      }
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
      onKeyDown={onKeyDown}
    >
      <RenderBlocks editor={editor} plugins={plugins} marks={marks} />
    </div>
  );
};

export { Editor };
