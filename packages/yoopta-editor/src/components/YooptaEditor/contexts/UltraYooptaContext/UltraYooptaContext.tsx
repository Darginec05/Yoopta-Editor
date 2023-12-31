import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Transforms as SlateTransforms } from 'slate';

type UltraYooptaContextValue = {
  data: Record<string, any>;
};

const UltraYooptaContext = createContext<UltraYooptaContextValue>({
  data: {},
});

export const PluginTransforms = {
  addPlugin: (editor, plugin, path) => {},
  getPlugin: (editor, path) => {},
  deletePlugin: (editor, path) => {},
  updatePlugin: (editor, path, plugin) => {},
  movePlugin: (editor, path, plugin) => {},
};

const YooptaEditor = {};

const UltraYooptaContextProvider = ({ children, value }) => {
  const contextValue = useRef<UltraYooptaContextValue>({});

  contextValue.current = {
    data: value,
  };

  return <UltraYooptaContext.Provider value={contextValue.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = () => useContext(UltraYooptaContext);

export { UltraYooptaContextProvider, YooptaEditor, useYooptaEditor };
