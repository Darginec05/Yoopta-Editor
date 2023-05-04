import { Editor } from 'slate';
import React, { MouseEvent, ReactNode, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { YoptaBaseElement } from '../../types';
import { mergePlugins, YoptaPlugin, YoptaPluginType } from '../../utils/plugins';
import { YoptaMark } from '../../utils/marks';

export type HoveredElement = YoptaBaseElement<string> | null;

export type YoptaContextValues = {
  marks: MarksMap;
  plugins: PluginsMap;
};

export type YoptaContextHandlers = {};

export type YoptaContextType = YoptaContextValues;

const defaultValues: YoptaContextValues = { marks: {}, plugins: {} };

const YoptaContext = React.createContext<YoptaContextType>(defaultValues);

type NodeSettingsProps = {
  children: ReactNode;
  plugins: YoptaPlugin<any, any>[];
  marks: YoptaMark[];
};

type PluginsMap = Record<string, Pick<YoptaPluginType, 'type' | 'createElement' | 'defineElement'>>;

type MarksMap = {
  [x: string]: {
    toggle: (options?: { only: boolean }) => void;
    isActive: boolean;
  };
};

const YoptaContextProvider = ({ children, plugins: pluginList, marks: markList }: NodeSettingsProps) => {
  const editor = useSlate();

  const plugins = useMemo<PluginsMap>(() => {
    const yoptaPlugins = mergePlugins(pluginList);
    const PLUGINS_MAP = {};
    yoptaPlugins.forEach((plugin) => {
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

    markList.forEach((mark) => {
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

  return <YoptaContext.Provider value={value}>{children}</YoptaContext.Provider>;
};

const useYopta = () => useContext<YoptaContextType>(YoptaContext);

export { YoptaContextProvider, useYopta };
