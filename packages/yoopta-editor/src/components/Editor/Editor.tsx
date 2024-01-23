import { Key, useEffect, useRef } from 'react';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { OFFLINE_STORAGE } from '../../utils/storage';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { RenderBlocks } from './RenderBlocks';

export type YooptaEditorProps<V> = {
  key?: Key;
  placeholder?: string;
  plugins: YooptaPlugin<any, any>[];
  readOnly?: boolean;
  autoFocus?: boolean;
  offline?: OFFLINE_STORAGE;
  marks?: YooptaMark[];
  className?: string;
};

const Editor = () => {
  const editor = useYooptaEditor();
  const yooptaEditorRef = useRef<HTMLDivElement>(null);

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
      <RenderBlocks editor={editor} />
    </div>
  );
};

export { Editor };
