import { createContext, useContext, useMemo } from 'react';

export type ToolProps<RenderProps = any, ToolProps = any> = {
  render: React.ComponentType<RenderProps>;
  tool: React.ComponentType<ToolProps>;
  props?: Record<string, unknown>;
};

export type Tools = {
  ActionMenu: ToolProps;
  Toolbar: ToolProps;
  LinkTool: ToolProps;
  [key: string]: ToolProps;
};

export type ToolsContextType = {
  [key: string]: ToolProps['render'];
};

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

type Props = {
  tools?: Partial<Tools>;
  children: React.ReactNode;
};

export const ToolsProvider = ({ children, tools }: Props) => {
  const contextValues = useMemo(() => {
    if (!tools) return {};

    return Object.keys(tools).reduce((acc, toolname) => {
      return {
        ...acc,
        [toolname]: tools[toolname]?.render,
      };
    }, {});
  }, [tools]);

  const toolsRender = useMemo(() => {
    if (!tools) return null;

    return Object.keys(tools).map((toolname) => {
      const Tool = tools?.[toolname]?.tool;
      const render = tools?.[toolname]?.render;
      const props = tools?.[toolname]?.props;
      if (!Tool) return null;
      return <Tool key={toolname} render={render} {...props} />;
    });
  }, [useMemo]);

  return (
    <ToolsContext.Provider value={contextValues}>
      <>
        {toolsRender}
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
