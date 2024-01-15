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

export type UltraYooptaContextPluginsEditorMap = Record<string, Editor>;

export type UltraYooEditor = {
  insertBlock: (data, at?: number[], options?: any) => void;
  updateBlock: (node, at) => void;
  deleteBlock: (at: number[]) => void;
  getBlock: (at) => void;
  moveBlock: (from: number[], to: number[]) => void;
  changeValue: (id, data) => void;
  focusBlock: (id, at?: number[]) => void;
  plugins: Record<string, UltraYooptaContextPlugin>;
  pluginsEditorMap: UltraYooptaContextPluginsEditorMap;
};

const DEFAULT_HANDLERS = {
  getBlock: () => undefined,
  insertBlock: () => undefined,
  updateBlock: () => undefined,
  moveBlock: () => undefined,
  deleteBlock: () => undefined,
  changeValue: () => undefined,
  focusBlock: () => undefined,
  plugins: {},
  pluginsEditorMap: {},
};

const UltraYooptaContext = createContext<UltraYooEditor>(DEFAULT_HANDLERS);

/**
 *
 */

function insertBlock(blockData, at) {
  return (plugins) => {
    const newBlock: UltraYooptaContextPlugin = {
      id: blockData.id,
      value: blockData.value,
      type: blockData.type,
      meta: {
        ...blockData.meta,
        order: 0,
      },
    };

    const updatedPlugins = { ...plugins };

    if (at) {
      const [position] = at;
      Object.values(updatedPlugins).forEach((plugin) => {
        if (plugin.meta.order >= position) {
          plugin.meta.order += 1;
        }
      });

      newBlock.meta.order = position;
    } else {
      const newIndex = Object.keys(updatedPlugins).length;
      newBlock.meta.order = newIndex;
    }

    updatedPlugins[blockData.id] = newBlock;
    console.log('updatedPlugins', updatedPlugins);

    return updatedPlugins;
  };
}

function updateValue(id, value) {
  return (plugins) => {
    const pluginValue = plugins[id];

    return {
      ...plugins,
      [id]: {
        ...pluginValue,
        value,
      },
    };
  };
}

function moveBlock(from: number[], to: number[]) {
  const [fromPosition] = from;
  const [toPosition] = to;

  return (plugins) => {
    const updatedPlugins = { ...plugins };

    const fromId = Object.keys(updatedPlugins).find((id) => updatedPlugins[id].meta.order === fromPosition);
    const toId = Object.keys(updatedPlugins).find((id) => updatedPlugins[id].meta.order === toPosition);

    const blockFrom = updatedPlugins[fromId || ''];
    const blockTo = updatedPlugins[toId || ''];

    if (blockFrom && blockTo) {
      blockFrom.meta.order = toPosition;
      blockTo.meta.order = fromPosition;
    }

    return updatedPlugins;
  };
}

function focusBlock(id: string, at?: number[]) {
  return (pluginEditors) => {
    const focusTimeout = setTimeout(() => {
      const editor = pluginEditors.current[id];
      Transforms.select(editor, { path: [0, 0], offset: 0 });
      ReactEditor.focus(editor);

      clearTimeout(focusTimeout);
    }, 0);
  };
}

function deleteBlock(at: number[]) {
  return (plugins) => {
    const [position] = at;
    const updatedPlugins = { ...plugins };
    const pluginKeys = Object.keys(updatedPlugins);
    const pluginToDeleteId = pluginKeys.find((id) => updatedPlugins[id].meta.order === position);

    pluginKeys.forEach((pluginId) => {
      const plugin = updatedPlugins[pluginId];
      if (plugin.meta.order > position) plugin.meta.order -= 1;
    });

    if (pluginToDeleteId) delete updatedPlugins[pluginToDeleteId];

    console.log('pluginToDeleteId', pluginToDeleteId);
    console.log('updatedPlugins', updatedPlugins);

    return updatedPlugins;
  };
}

const Commands = {
  updateValue,
  moveBlock,
  insertBlock,
  focusBlock,
  deleteBlock,
};

/**
 *
 */
const UltraYooptaContextProvider = ({ children, value: initialValue }) => {
  const [editorValue, setEditorValue] = useState<Record<string, UltraYooptaContextPlugin>>(initialValue);
  const pluginsEditorMap = useRef<UltraYooptaContextPluginsEditorMap>({});
  const contextValueRef = useRef<UltraYooEditor>(DEFAULT_HANDLERS);

  const changleBlockValue = (id, value) => setEditorValue(Commands.updateValue(id, value));
  const deleteBlock = (at: number[]) => setEditorValue(Commands.deleteBlock(at));
  const focusBlock = (id: string, at?: number[]) => Commands.focusBlock(id, at)(pluginsEditorMap);
  const insertBlock = (blockData: UltraYooptaContextPlugin, at?: number[], options) =>
    setEditorValue(Commands.insertBlock(blockData, at));

  const updateBlock = (node, at) => {};
  const getBlock = (at) => {};

  const moveBlock = (from: number[], to: number[]) => {
    setEditorValue(Commands.moveBlock(from, to));
  };

  const contextValue = {
    getBlock,
    moveBlock,
    insertBlock,
    updateBlock,
    deleteBlock,
    plugins: editorValue,
    changeValue: changleBlockValue,
    focusBlock,
    pluginsEditorMap: pluginsEditorMap.current,
  };

  contextValueRef.current = contextValue;

  return <UltraYooptaContext.Provider value={contextValueRef.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = () => useContext(UltraYooptaContext);

export { UltraYooptaContextProvider, useYooptaEditor };
