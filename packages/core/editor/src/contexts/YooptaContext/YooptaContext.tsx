import { createContext, useContext, useRef } from 'react';
import { YooEditor, YooptaBlockPath } from '../../editor/types';
import { PluginOptions } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';

export type YooptaEditorContext = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS: YooptaEditorContext = {
  editor: {
    id: '',
    getBlock: () => undefined,
    insertBlock: () => undefined,
    insertBlocks: () => undefined,
    updateBlock: () => undefined,
    moveBlock: () => undefined,
    splitBlock: () => undefined,
    deleteBlock: () => undefined,
    toggleBlock: () => undefined,
    focusBlock: () => undefined,
    setSelection: () => undefined,
    applyChanges: () => undefined,
    decreaseBlockDepth: () => undefined,
    increaseBlockDepth: () => undefined,
    setBlockSelected: () => undefined,
    selectedBlocks: [],
    duplicateBlock: () => undefined,
    getEditorValue: () => undefined,
    setEditorValue: () => undefined,
    blur: () => undefined,
    blocks: {},
    shortcuts: {},
    plugins: {},
    formats: {},
    selection: null,
    readOnly: false,
    blockEditorsMap: {},
    children: {},
    emit: () => undefined,
    on: () => undefined,
    off: () => undefined,
    once: () => undefined,
  },
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
const useYooptaBlock = (blockType: string) => useYooptaEditor().blocks[blockType];
const useYooptaPlugin = (type: string) => useYooptaEditor().plugins[type];
const useYooptaReadOnly = () => useYooptaEditor().readOnly;
const useYooptaPluginOptions = <TOptions,>(blockType: string): PluginOptions<TOptions> =>
  useYooptaPlugin(blockType)?.options as PluginOptions<TOptions>;

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
  useYooptaReadOnly,
  YooptaContextProvider,
};
