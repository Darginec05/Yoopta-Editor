import { createContext, useContext, useRef } from 'react';
import { Editor } from 'slate';
import { YooEditor, YooptaBlockPath } from '../../editor/types';
import { PluginOptions } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';

export type UltraYooptaContextPluginsEditorMap = Record<string, Editor>;

export type YooptaEditorContext = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS: YooptaEditorContext = {
  editor: {
    getBlock: () => undefined,
    insertBlock: () => undefined,
    updateBlock: () => undefined,
    moveBlock: () => undefined,
    splitBlock: () => undefined,
    deleteBlock: () => undefined,
    focusBlock: () => undefined,
    setSelection: () => undefined,
    applyChanges: () => undefined,
    decreaseBlockDepth: () => undefined,
    increaseBlockDepth: () => undefined,
    setBlockSelected: () => undefined,
    selectedBlocks: [],
    duplicateBlock: () => undefined,
    getEditorValue: () => undefined,
    blur: () => undefined,
    blocks: {},
    shortcuts: {},
    plugins: {},
    formats: {},
    selection: null,
    blockEditorsMap: {},
    children: {},
  },
};

export const UltraYooptaContext = createContext<YooptaEditorContext>(DEFAULT_HANDLERS);

/**
 *
 */
const UltraYooptaContextProvider = ({ children, editorState }) => {
  const contextValueRef = useRef<YooptaEditorContext>(DEFAULT_HANDLERS);

  contextValueRef.current = {
    editor: editorState.editor,
  };

  return <UltraYooptaContext.Provider value={contextValueRef.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = (): YooEditor => {
  const context = useContext(UltraYooptaContext);

  if (!context) {
    throw new Error('useYooptaEditor must be used within a YooptaEditorContext');
  }

  return context.editor;
};
const useBlockData = (blockId: string) => useYooptaEditor().children[blockId];
const useYooptaBlock = (blockType: string) => useYooptaEditor().blocks[blockType];
const useYooptaPlugin = (type: string) => useYooptaEditor().plugins[type];
const useYooptaPluginOptions = <TOptions,>(blockId: string): PluginOptions<TOptions> =>
  useYooptaPlugin(blockId)?.options;

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
  useYooptaPlugin,
  useYooptaPluginOptions,
  useYooptaBlock,
  useBlockSelected,
  UltraYooptaContextProvider,
};
