import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { generateId } from '../../../../utils/generateId';
import { PLUGIN_EDITOR_TO_ELEMENT } from '../../utils';

export type UltraYooptaContextPlugin = {
  id: string;
  value: any[];
  type: string;
  meta: {
    order: number;
    depth: number;
  };
};

export type YooEditor = {
  insertBlock: (data, options?: any) => void;
  updateBlock: (id, data, options?: any) => void;
  deleteBlock: (at: number[]) => void;
  getBlock: (at) => void;
  applyChanges: () => void;
  moveBlock: (from: number[], to: number[]) => void;
  focusBlock: (id, at?: number[]) => void;
  selection: number[] | null;
  children: Record<string, UltraYooptaContextPlugin>;
  setSelection: (path: number[] | null) => void;
  blockEditorsMap: UltraYooptaContextPluginsEditorMap;
};

export type UltraYooptaContextPluginsEditorMap = Record<string, Editor>;

export type UltraYooEditor = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS = {
  editor: {
    getBlock: () => undefined,
    insertBlock: () => undefined,
    updateBlock: () => undefined,
    moveBlock: () => undefined,
    deleteBlock: () => undefined,
    changeValue: () => undefined,
    focusBlock: () => undefined,
    setSelection: () => undefined,
    applyChanges: () => undefined,
    selection: null,
    blockEditorsMap: {},
    children: {},
  },
};

export const UltraYooptaContext = createContext<UltraYooEditor>(DEFAULT_HANDLERS);

/**
 *
 */
const UltraYooptaContextProvider = ({ children, editorState }) => {
  const contextValueRef = useRef<UltraYooEditor>(DEFAULT_HANDLERS);

  contextValueRef.current = {
    editor: editorState.editor,
  };

  return <UltraYooptaContext.Provider value={contextValueRef.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = (): YooEditor => {
  const editor = useContext(UltraYooptaContext).editor;
  return editor;
};
const useYooptaPlugin = (id: string) => useYooptaEditor().children[id];

export { useYooptaEditor, useYooptaPlugin, UltraYooptaContextProvider };
