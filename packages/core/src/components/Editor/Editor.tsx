import { useEffect, useRef } from 'react';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { RenderBlocks } from './RenderBlocks';
import { Plugin } from '../../plugins/types';
import { YooptaMark } from '../../textFormatters/createYooptaMark';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';

type Props = {
  plugins: Plugin[];
  marks?: YooptaMark<any>[];
  autoFocus?: boolean;
  className?: string;
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

  return (
    <div id="yoopta-editor" className={className} ref={yooptaEditorRef}>
      <RenderBlocks editor={editor} plugins={plugins} marks={marks} />
    </div>
  );
};

export { Editor };
