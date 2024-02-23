import { CSSProperties, useEffect, useRef } from 'react';
import { Editor as SlateEditor } from 'slate';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { RenderBlocks } from './RenderBlocks';
import { Plugin } from '../../plugins/types';
import { YooptaMark } from '../../textFormatters/createYooptaMark';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { getDefaultParagraphBlock } from './defaultValue';
import { generateId } from '../../utils/generateId';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';

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

  console.log('editor.children', editor.children);

  useEffect(() => {
    if (!autoFocus) return;

    const firstBlock = findPluginBlockBySelectionPath(editor, { at: [0] });
    if (firstBlock) editor.focusBlock(firstBlock.id);
  }, [autoFocus]);

  const onEmptyZoneClick = (e: React.MouseEvent) => {
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

  return (
    <div
      id="yoopta-editor"
      className={className}
      style={DEFAULT_STYLES}
      ref={yooptaEditorRef}
      onClick={onEmptyZoneClick}
    >
      <RenderBlocks editor={editor} plugins={plugins} marks={marks} />
    </div>
  );
};

export { Editor };
