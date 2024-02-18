import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ToolAPI = {
  onOpen: (...args: any[]) => void;
  onClose: (...args: any[]) => void;
  onChange: (...args: any[]) => void;
  state: any;
  events: {
    [key: string]: (editor: any, slate: any, options: any) => (event: React.KeyboardEvent) => void;
  };
};

export type Tools = {
  [key: string]: ToolAPI;
};

type ToolsContextType = {
  tools: Tools;
  registerTool: (name: string, tool: ToolAPI) => void;
  unregisterTool: (name: string) => void;
};

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState<Tools>({});

  const registerTool = useCallback(
    (name: string, tool: ToolAPI): void => {
      setTools((prev) => ({ ...prev, [name]: tool }));
    },
    [tools],
  );

  const unregisterTool = useCallback(
    (name: string) => {
      setTools((prev) => {
        const newTools = { ...prev };
        delete newTools[name];
        return newTools;
      });
    },
    [tools],
  );

  const value = useMemo(
    () => ({
      tools,
      registerTool,
      unregisterTool,
    }),
    [tools, registerTool, unregisterTool],
  );

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
};

export const useTools = (): ToolsContextType => {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};
