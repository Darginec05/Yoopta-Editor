import { createContext, useContext, useRef } from 'react';
import { createYooptaEditor } from '../../editor';
import { YooEditor, YooptaBlockPath } from '../../editor/types';
import { PluginOptions } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';

export type YooptaEditorContext = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS: YooptaEditorContext = {
  editor: createYooptaEditor(),
};

export const YooptaContext = createContext<YooptaEditorContext>(DEFAULT_HANDLERS);

/**
 *
 */
const YooptaContextProvider = ({ children, editorState }) => {
  const contextValueRef = useRef<YooptaEditorContext>(DEFAULT_HANDLERS);

  contextValueRef.current = {
    editor: editorState.editor,
  };

  return <YooptaContext.Provider value={contextValueRef.current}>{children}</YooptaContext.Provider>;
};

const useYooptaEditor = (): YooEditor => {
  const context = useContext(YooptaContext);

  if (!context) {
    throw new Error('useYooptaEditor must be used within a YooptaEditorContext');
  }

  return context.editor;
};

const useBlockData = (blockId: string) => useYooptaEditor().children[blockId];
const useYooptaFocused = () => useYooptaEditor().isFocused();
const useYooptaReadOnly = () => useYooptaEditor().readOnly;
const useYooptaPluginOptions = <TOptions,>(pluginType: string): PluginOptions<TOptions> =>
  useYooptaEditor().plugins[pluginType]?.options as PluginOptions<TOptions>;

type UseBlockSelectedProps = { blockId: string; path?: YooptaBlockPath } | { path: YooptaBlockPath; blockId?: string };
const useBlockSelected = ({ blockId, path }: UseBlockSelectedProps) => {
  const editor = useYooptaEditor();

  if (!blockId && !path) {
    throw new Error('useBlockSelected must receive either blockId or path');
  }

  let block;

  if (blockId) {
    block = editor.children[blockId];
  }

  if (path) {
    block = findPluginBlockBySelectionPath(editor, { at: path });
  }

  return editor.selection?.[0] === block?.meta.order;
};

export {
  useYooptaEditor,
  useBlockData,
  useYooptaPluginOptions,
  useBlockSelected,
  useYooptaReadOnly,
  useYooptaFocused,
  YooptaContextProvider,
};
