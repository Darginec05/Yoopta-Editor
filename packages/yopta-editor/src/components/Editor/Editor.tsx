import { Editor, Transforms, Range, Element, NodeEntry, Path } from 'slate';
import React, { useCallback, MouseEvent, useMemo, KeyboardEvent, MouseEventHandler, ReactNode } from 'react';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { getDefaultParagraphLine } from './utils';
import { ELEMENT_TYPES_MAP } from './constants';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { LibOptions, useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { onCopyYoptaNodes } from '../../utils/copy';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { ParentYoptaComponent, YoptaComponentType } from '../../utils/component';
import { getNodeByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import { generateId } from '../../utils/generateId';

type YoptaProps = {
  editor: Editor;
  placeholder: LibOptions['placeholder'];
  components: ParentYoptaComponent[];
  children: ReactNode | ReactNode[];
};

// [TODO] - defaultNode move to common event handler to avoid repeated id's
const handlersOptions = { hotkeys: HOTKEYS, defaultNode: getDefaultParagraphLine() };

const EditorYopta = ({ editor, placeholder, children, components }: YoptaProps) => {
  const { options } = useSettings();
  useScrollToElement();
  const [{ disableWhileDrag }, { changeHoveredNode }] = useNodeSettingsContext();

  const isReadOnly = disableWhileDrag;

  const renderElement = useMemo(() => {
    return (props: RenderElementProps) => {
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const { type, options } = component;

        const renderFn = component.renderer(editor, { type, options });
        // [TODO] - add strong checker for renderFn
        if (props.element.type === component.type) {
          return (
            <ElementWrapper
              element={props.element}
              attributes={props.attributes}
              component={component}
              render={renderFn}
            >
              {props.children}
            </ElementWrapper>
          );
        }
      }
      return <DefaultElement {...props} />;
    };
  }, [components, editor]);

  const decorate = useMemo(() => {
    return (nodeEntry: NodeEntry) => {
      const ranges: Range[] = [];
      const [node] = nodeEntry;

      components.forEach((component) => {
        const decoratorFn = component.decorator;

        if (typeof decoratorFn === 'function' && Element.isElement(node) && node.type === component.type) {
          ranges.push(...decoratorFn(editor)(nodeEntry));
        }
      });

      return ranges;
    };
  }, [components, editor]);

  const renderLeaf = useMemo(() => {
    return (leafProps: RenderLeafProps) => {
      const props = { ...leafProps };

      components.forEach((component) => {
        if (component.leaf) {
          const leafChildren = component.leaf(editor)(props);
          if (leafChildren) props.children = leafChildren;
        }
      });

      return <TextLeaf {...props} />;
    };
  }, [components, editor]);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    const events = components
      .map((component) => Object.keys(component.handlers || {}))
      .flat()
      .filter((event, i, self) => self.indexOf(event) === i);

    const eventHandlersMap = {};

    events.forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        components.forEach((component) => {
          if (component.handlers?.[eventType]) {
            const eventHandler = component.handlers[eventType](editor, handlersOptions);
            eventHandler(event);
          }
        });
      };
    });

    return eventHandlersMap;
  }, [components, editor]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    Editor.withoutNormalizing(editor, () => {
      eventHandlers.onKeyDown?.(event);

      if (!editor.selection) return;

      const defaultNode = { ...getDefaultParagraphLine(), id: generateId() };
      const nodeEntry = Editor.above(editor, {
        match: (n) => !Editor.isEditor(n),
        mode: 'lowest',
      });

      if (HOTKEYS.isEnter(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

        const parentPath = Path.parent(editor.selection.anchor.path);

        const text = Editor.string(editor, parentPath);
        const isDefaultNode = nodeEntry && nodeEntry[0].type !== defaultNode.type;

        if (isDefaultNode && text.length === 0) {
          Transforms.setNodes(editor, defaultNode, {
            at: parentPath,
          });

          return;
        }

        const isStart = Editor.isStart(editor, editor.selection.anchor, editor.selection.anchor.path);

        if (isStart && isDefaultNode) {
          const [currentNode] = nodeEntry;

          Transforms.setNodes(editor, defaultNode, { at: parentPath });
          Transforms.delete(editor, { unit: 'block' });
          Transforms.insertNodes(editor, structuredClone(currentNode), { at: Path.next(parentPath) });

          Transforms.select(editor, { path: [Path.next(editor.selection.anchor.path)[0] + 1, 0], offset: 0 });
          return;
        }

        Transforms.splitNodes(editor, { always: true });
        Transforms.setNodes(editor, defaultNode);

        return;
      }

      if (HOTKEYS.isShiftEnter(event)) {
        if (event.isDefaultPrevented()) return;

        event.preventDefault();
        editor.insertText('\n');
      }

      if (HOTKEYS.isSelect(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

        const nodeEntry = Editor.above(editor, {
          at: editor.selection.anchor.path,
          match: (n) => !Editor.isEditor(n) && Element.isElement(n),
        });

        if (!nodeEntry) return;

        const text = Editor.string(editor, nodeEntry[1]);
        if (Range.isExpanded(editor.selection) || text.length === 0) {
          Transforms.select(editor, []);
          return;
        }

        Transforms.select(editor, nodeEntry[1]);
        return;
      }
    });
  }, []);

  const handleEmptyZoneClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.currentTarget !== e.target || !editor.selection) return;

    Editor.withoutNormalizing(editor, () => {
      const lastPath = [editor.children.length - 1, 0];
      const lastNode: any = getNodeByPath(editor, lastPath, 'highest');
      const lastNodeText = Editor.string(editor, lastPath);

      const location = {
        anchor: { path: lastPath, offset: 0 },
        focus: { path: lastPath, offset: 0 },
      };

      if (lastNode.type === ELEMENT_TYPES_MAP.paragraph && lastNodeText.length === 0) {
        Transforms.select(editor, {
          path: location.anchor.path,
          offset: 0,
        });

        changeHoveredNode(lastNode);
        return ReactEditor.focus(editor);
      }

      const lineParagraph = getDefaultParagraphLine();
      changeHoveredNode(lineParagraph);

      Transforms.insertNodes(editor, lineParagraph, {
        at: [editor.children.length],
        select: true,
      });
      ReactEditor.focus(editor);
    });
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    eventHandlers.onMouseDown?.(e);
    stopPropagation(e);
  };

  const hasEditorChildren = React.Children.count(children) > 0;

  return (
    <div id="yopta-editor" className={options.className} onMouseDown={handleEmptyZoneClick}>
      {/* <OutsideClick onClose={hideToolbarTools}>
        <Toolbar toolbarRef={toolbarRef} toolbarStyle={toolbarStyle} editor={editor} />
      </OutsideClick> */}
      {hasEditorChildren &&
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          return React.cloneElement(child, {
            ...child.props,
            components,
          });
        })}
      <Editable
        id="yopta-contenteditable"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        readOnly={isReadOnly}
        decorate={decorate}
        onCopy={onCopyYoptaNodes}
        autoFocus
        spellCheck
        {...eventHandlers}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export { EditorYopta };
