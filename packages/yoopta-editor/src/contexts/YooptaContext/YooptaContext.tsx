import { Editor, Element, NodeEntry, Path, Text, Transforms } from 'slate';
import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';
import { useSlate } from 'slate-react';
import { YooptaBaseElement } from '../../types';
import { ParentYooptaPlugin, YooptaPluginType } from '../../utils/plugins';
import { YooptaMark } from '../../utils/marks';
import { getDefaultParagraphLine } from '../../components/Editor/utils';
import { generateId } from '../../utils/generateId';
import { YooptaTools } from '../../components/YooptaEditor/YooptaEditor';

const defaultValues: YooptaContextReturnValues = { marks: {}, elements: {} };

const YooptaContext = React.createContext<YooptaContextType>(defaultValues);

export type HoveredElement = YooptaBaseElement<string> | null;

type YooptaToolsMap = {
  Toolbar: (props: any) => ReactElement;
  ActionMenu: (props: any) => ReactElement;
  ChatGPT: (props: any) => ReactElement;
  LinkTool: (props: any) => ReactElement;
  [x: string]: (props: any) => ReactElement;
};

export type YooptaContextReturnValues = {
  marks: MarksMap;
  elements: ElementsMap;
  tools?: YooptaToolsMap | undefined;
};

export type YooptaContextHandlers = {};

export type YooptaContextType = YooptaContextReturnValues;

type Props = {
  children: ReactNode;
  plugins: ParentYooptaPlugin[];
  marks?: YooptaMark[];
  tools?: YooptaTools | undefined;
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
    isActive: boolean;
    options: { displayLabel?: string };
  };
};

export type MarksMap = {
  [x: string]: {
    toggle: (options?: { only: boolean }) => void;
    isActive: boolean;
  };
};

const YooptaContextProvider = ({ children, plugins: pluginList, marks: markList, tools }: Props) => {
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

      plugin.createElement?.(editor, { id: currentNode.id });
    });
  };

  const isElementActive = (type: string) => {
    if (!editor.selection) return false;

    const [element] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    });

    return !!element;
  };

  const getElements = () => {
    const ELEMENTS_MAP: ElementsMap = {};

    pluginList.forEach((plugin) => {
      const { createElement, defineElement, type, options } = plugin;
      ELEMENTS_MAP[plugin.type] = {
        create: createElement,
        define: defineElement,
        toggle: (options) => toggleNodeElement(plugin, options),
        type,
        isActive: isElementActive(type),
        options: { displayLabel: options?.displayLabel },
      };
    });

    return ELEMENTS_MAP;
  };

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

  const yooptaTools = useMemo<YooptaToolsMap | undefined>(() => {
    const toolKeys = Object.keys(tools || {});
    if (toolKeys.length === 0) return undefined;

    const TOOLS = {} as YooptaToolsMap;

    toolKeys.forEach((toolKey) => {
      const ToolComponent = tools?.[toolKey];

      if (ToolComponent) {
        if (React.isValidElement(ToolComponent)) {
          TOOLS[toolKey] = ({ style, className, ...rest }) =>
            React.cloneElement(ToolComponent as ReactElement, {
              style,
              className,
              plugins: pluginList,
              asTool: true,
              ...rest,
              ...ToolComponent?.props,
            });
        }
      }
    });

    return TOOLS;
  }, [tools, editor.selection]);

  const value = useMemo(() => {
    const elements = getElements();
    return { elements, marks, tools: yooptaTools };
  }, [editor.selection, marks]);

  return <YooptaContext.Provider value={value}>{children}</YooptaContext.Provider>;
};

const useYoopta = () => useContext<YooptaContextType>(YooptaContext);
const useMarks = () => useContext<YooptaContextType>(YooptaContext).marks;
const useElements = () => useContext<YooptaContextType>(YooptaContext).elements;
const useTools = () => useContext<YooptaContextType>(YooptaContext).tools;

export { YooptaContextProvider, useYoopta, useMarks, useElements, useTools };
