import { Editor, Element, NodeEntry, Path, Text, Transforms } from 'slate';
import React, { ReactNode, useContext, useMemo } from 'react';
import { useSlate } from 'slate-react';
import { YooptaBaseElement } from '../../types';
import { mergePlugins, YooptaPlugin, YooptaPluginType } from '../../utils/plugins';
import { YooptaMark } from '../../utils/marks';
import { getDefaultParagraphLine } from '../../components/Editor/utils';
import { generateId } from '../../utils/generateId';
import { YooptaTools } from '../../components/YooptaEditor/YooptaEditor';

export type HoveredElement = YooptaBaseElement<string> | null;

export type YooptaContextReturnValues = {
  marks: MarksMap;
  elements: ElementsMap;
  tools?: YooptaTools;
};

export type YooptaContextHandlers = {};

export type YooptaContextType = YooptaContextReturnValues;

const defaultValues: YooptaContextReturnValues = { marks: {}, elements: {}, tools: {} };

const YooptaContext = React.createContext<YooptaContextType>(defaultValues);

type YooptaContextProps = {
  children: ReactNode;
  plugins: YooptaPlugin<any, any>[];
  marks?: YooptaMark[];
  tools?: YooptaTools;
};

export type ToggleOptions = {
  shouldDeleteText: boolean;
};

export type ElementsMap = {
  [x: string]: {
    type: YooptaPluginType['type'];
    create: YooptaPluginType['createElement'];
    define: YooptaPluginType['defineElement'];
    toggle: (options?: ToggleOptions) => void;
  };
};

export type MarksMap = {
  [x: string]: {
    toggle: (options?: { only: boolean }) => void;
    isActive: boolean;
  };
};

const YooptaContextProvider = ({ children, plugins: pluginList, marks: markList, tools }: YooptaContextProps) => {
  const editor = useSlate();

  const toggleNodeElement = (plugin, options?: ToggleOptions) => {
    Editor.withoutNormalizing(editor, () => {
      if (!editor.selection) return;
      const { offset, path } = editor.selection.anchor;
      const { shouldDeleteText } = options || {};

      if (shouldDeleteText) {
        Transforms.delete(editor, {
          at: {
            anchor: { path, offset: 0 },
            focus: { path, offset },
          },
        });
      }

      const currentNodeEntry = Editor.above(editor, {
        at: editor.selection,
        mode: 'highest',
        match: (n) => !Editor.isEditor(n) && Element.isElement(n),
      }) as NodeEntry<YooptaBaseElement<string>>;

      const [parentNode, parentPath] = Editor.parent(editor, Path.parent(editor.selection.anchor.path));
      const [currentNode] = currentNodeEntry || [];

      if (currentNode?.type === plugin.type) {
        Transforms.setNodes(editor, getDefaultParagraphLine(generateId()), {
          mode: 'highest',
          match: (n) => !Editor.isEditor(n) && Element.isElement(n),
        });
        return;
      }

      if (Element.isElement(parentNode) && !Editor.isEditor(parentNode)) {
        Transforms.unwrapNodes(editor, {
          at: parentPath,
          match: (n) =>
            !Editor.isEditor(n) && !Text.isText(n) && Element.isElement(parentNode) && n.type === parentNode.type,
        });
      }

      plugin.createElement?.(editor);
    });
  };

  const elements = useMemo<ElementsMap>(() => {
    const yooptaPlugins = mergePlugins(pluginList);
    const ELEMENTS_MAP: ElementsMap = {};

    yooptaPlugins.forEach((plugin) => {
      const { createElement, defineElement, type, hasParent } = plugin;
      if (!hasParent) {
        ELEMENTS_MAP[plugin.type] = {
          create: createElement,
          define: defineElement,
          toggle: (options) => toggleNodeElement(plugin, options),
          type,
        };
      }
    });

    return ELEMENTS_MAP;
  }, [pluginList, editor.selection]);

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

  const yooptaTools = useMemo(() => {
    return tools;
  }, [tools]);

  const value = useMemo(() => {
    return { elements, marks, tools: yooptaTools };
  }, [editor.selection, marks, elements]);

  return <YooptaContext.Provider value={value}>{children}</YooptaContext.Provider>;
};

const useYoopta = () => useContext<YooptaContextType>(YooptaContext);
const useMarks = () => useContext<YooptaContextType>(YooptaContext).marks;
const useElements = () => useContext<YooptaContextType>(YooptaContext).elements;
const useTools = () => useContext<YooptaContextType>(YooptaContext).tools;

export { YooptaContextProvider, useYoopta, useMarks, useElements, useTools };
