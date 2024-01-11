import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { generateId } from '../../../../utils/generateId';

export type UltraYooptaContextPlugin = {
  value: any[];
  type: string;
  meta: {
    order: number;
  };
};

export type UltraYooptaContextReturnValue = {
  insertBlock: (data, at?: number[]) => void;
  updateBlock: (node, at) => void;
  deleteBlock: (at) => void;
  getBlock: (at) => void;
  moveBlock: (from: number[], to: number[]) => void;
  changeValue: (id, data) => void;
  plugins: Record<string, UltraYooptaContextPlugin>;
};

const DEFAULT_HANDLERS = {
  getBlock: () => undefined,
  insertBlock: () => undefined,
  updateBlock: () => undefined,
  moveBlock: () => undefined,
  deleteBlock: () => undefined,
  changeValue: () => undefined,
  plugins: {},
};

const UltraYooptaContext = createContext<UltraYooptaContextReturnValue>(DEFAULT_HANDLERS);

const UltraYooptaContextProvider = ({ children, value: initialValue }) => {
  const [editorValue, setEditorValue] = useState<Record<string, UltraYooptaContextPlugin>>(initialValue);
  const contextValueRef = useRef<UltraYooptaContextReturnValue>(DEFAULT_HANDLERS);

  const insertBlock = (blockData: UltraYooptaContextPlugin, at?: number[]) => {
    setEditorValue((plugins) => {
      const newBlock: UltraYooptaContextPlugin = {
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

      updatedPlugins[generateId()] = newBlock;

      return updatedPlugins;
    });
  };

  const onChange = useCallback((id, value) => {
    setEditorValue((plugins) => {
      const pluginValue = plugins[id];

      return {
        ...plugins,
        [id]: {
          ...pluginValue,
          value,
        },
      };
    });
  }, []);

  const updateBlock = (node, at) => {};
  const deleteBlock = (at) => {};
  const getBlock = (at) => {};

  const moveBlock = (from: number[], to: number[]) => {
    const [fromPosition] = from;
    const [toPosition] = to;

    setEditorValue((plugins) => {
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
    });
  };

  const contextValue = {
    getBlock,
    moveBlock,
    insertBlock,
    updateBlock,
    deleteBlock,
    plugins: editorValue,
    changeValue: onChange,
  };

  contextValueRef.current = contextValue;

  return <UltraYooptaContext.Provider value={contextValueRef.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = () => useContext(UltraYooptaContext);

export { UltraYooptaContextProvider, useYooptaEditor };
