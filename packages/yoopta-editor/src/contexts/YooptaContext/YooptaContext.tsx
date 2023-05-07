import { Editor } from 'slate';
import React, { ReactNode, useContext, useMemo } from 'react';
import { useSlate } from 'slate-react';
import { YooptaBaseElement } from '../../types';
import { mergePlugins, YooptaPlugin, YooptaPluginType } from '../../utils/plugins';
import { YooptaMark } from '../../utils/marks';

export type HoveredElement = YooptaBaseElement<string> | null;

export type YooptaContextValues = {
  marks: MarksMap;
  plugins: PluginsMap;
};

export type YooptaContextHandlers = {};

export type YooptaContextType = YooptaContextValues;

const defaultValues: YooptaContextValues = { marks: {}, plugins: {} };

const YooptaContext = React.createContext<YooptaContextType>(defaultValues);

type NodeSettingsProps = {
  children: ReactNode;
  plugins: YooptaPlugin<any, any>[];
  marks?: YooptaMark[];
};

type PluginsMap = Record<string, Pick<YooptaPluginType, 'type' | 'createElement' | 'defineElement'>>;

type MarksMap = {
  [x: string]: {
    toggle: (options?: { only: boolean }) => void;
    isActive: boolean;
  };
};

const YooptaContextProvider = ({ children, plugins: pluginList, marks: markList }: NodeSettingsProps) => {
  const editor = useSlate();

  const plugins = useMemo<PluginsMap>(() => {
    const yooptaPlugins = mergePlugins(pluginList);
    const PLUGINS_MAP = {};
    yooptaPlugins.forEach((plugin) => {
      const { createElement, defineElement, type, options } = plugin;
      PLUGINS_MAP[plugin.type] = { createElement, defineElement, type, options };
    });

    return PLUGINS_MAP;
  }, [pluginList]);

  const checkIsMarkActive = (mark) => {
    const marks = Editor.marks(editor);
    const isActive = !!marks?.[mark];
    return isActive;
  };

  const toggleMark = (mark: any, only: boolean = false) => {
    if (only) {
      Object.keys(Editor.marks(editor) || {}).forEach((activeMark) => {
        Editor.removeMark(editor, activeMark);
      });
    }

    if (!checkIsMarkActive(mark)) Editor.addMark(editor, mark, true);
    else Editor.removeMark(editor, mark);
  };

  const marks = useMemo<MarksMap>(() => {
    const mapper: MarksMap = {};

    markList?.forEach((mark) => {
      mapper[mark.type] = {
        toggle: (options) => toggleMark(mark.type, options?.only),
        isActive: checkIsMarkActive(mark.type),
      };
    });

    return mapper;
  }, [markList, editor.selection]);

  const value = useMemo(() => {
    return { plugins, marks };
  }, [editor.selection, marks, plugins]);

  return <YooptaContext.Provider value={value}>{children}</YooptaContext.Provider>;
};

const useYoopta = () => useContext<YooptaContextType>(YooptaContext);
// const usePlugins = () => useContext<YooptaContextType>(YooptaContext).marks;
// const useElements = () => useContext<YooptaContextType>(YooptaContext).marks;
// const useMarks = () => useContext<YooptaContextType>(YooptaContext).marks;

export { YooptaContextProvider, useYoopta };
