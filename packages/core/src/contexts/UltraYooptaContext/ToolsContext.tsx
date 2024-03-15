import { createContext, useContext, useMemo } from 'react';

export type ToolProps = {
  render: React.ComponentType<any>;
  tool: React.ComponentType<any>;
};

export type Tools = {
  [key: string]: ToolProps;
};

export type ToolsContextType = {
  [key: string]: ToolProps['render'];
};

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

type Props = {
  tools?: Tools;
  children: React.ReactNode;
};

export const ToolsProvider = ({ children, tools }: Props) => {
  const value = useMemo(() => {
    if (!tools) return {};

    return Object.keys(tools).reduce((acc, key) => {
      return {
        ...acc,
        [key]: tools[key].render,
      };
    }, {});
  }, [tools]);

  return (
    <ToolsContext.Provider value={value}>
      <>
        {tools &&
          Object.keys(tools).map((key) => {
            const Tool = tools[key].tool;
            return <Tool key={key} />;
          })}
        {children}
      </>
    </ToolsContext.Provider>
  );
};

export const useYooptaTools = (): ToolsContextType => {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error('useYooptaTools must be used within a ToolsProvider');
  }

  return context;
};
