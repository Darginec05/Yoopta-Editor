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
};

const Editor = ({ plugins, marks, autoFocus = true }: Props) => {
  const editor = useYooptaEditor();
  const yooptaEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstBlock = findPluginBlockBySelectionPath(editor, { at: [0] });
    if (firstBlock) editor.focusBlock(firstBlock.id);
  }, [autoFocus]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const domSelection = document.getSelection()!;
      let el = domSelection.anchorNode;

      // [TODO] - do nothing if selection the same
      while (el && !el.parentElement?.hasAttribute('data-yoopta-plugin')) {
        el = el.parentNode;
      }

      const pluginElement = el?.parentElement;
      const pluginId = pluginElement?.getAttribute('data-yoopta-plugin-id') || '';

      const updatedPath = pluginId ? [editor.children[pluginId].meta.order] : null;
      editor.setSelection(updatedPath);
    };

    window.document.addEventListener('selectionchange', handleSelectionChange);
    return () => window.document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  return (
    <div id="yoopta-editor" ref={yooptaEditorRef}>
      <RenderBlocks editor={editor} plugins={plugins} marks={marks} />
    </div>
  );
};

export { Editor };
