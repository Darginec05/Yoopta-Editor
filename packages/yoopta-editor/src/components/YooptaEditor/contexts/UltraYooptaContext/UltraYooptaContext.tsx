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
  moveBlock: (from, to) => void;
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

// export const PluginTransforms = {
//   addPlugin: (editor, plugin, path) => {},
//   getPlugin: (editor, path) => {},
//   deletePlugin: (editor, path) => {},
//   updatePlugin: (editor, path, plugin) => {},
//   movePlugin: (editor, path, plugin) => {},
// };

const UltraYooptaContextProvider = ({ children, value }) => {
  const [editorValue, setEditorValue] = useState<Record<string, UltraYooptaContextPlugin>>(value);
  const contextValueRef = useRef<UltraYooptaContextReturnValue>(DEFAULT_HANDLERS);

  const insertBlock = (blockData, at?: number[]) => {
    console.log('blockData', blockData);

    setEditorValue((plugins) => {
      return {
        ...plugins,
        [generateId()]: {
          value: blockData.value,
          type: blockData.type,
          meta: {
            order: Object.keys(plugins).length,
          },
        },
      };
    });

    // const order = at;

    // setEditorValue((plugin) => {
    //   const pluginValue = plugin[id];

    //   return {
    //     ...plugin,
    //     [id]: {
    //       ...pluginValue,
    //       value,
    //     },
    //   };
    // });
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
  const moveBlock = (from, at) => {};

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
