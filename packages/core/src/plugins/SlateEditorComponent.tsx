import { memo, useMemo, useRef } from 'react';
import { Editable, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useBlockData } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../marks';

import { ExtendedLeafProps, PluginElementRenderProps, PluginEventHandlerOptions, PluginParams } from './types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS } from '../utils/hotkeys';
import { Editor, NodeEntry, Range } from 'slate';
import { TextLeaf } from '../components/TextLeaf/TextLeaf';

import { generateId } from '../utils/generateId';
import { buildBlockData } from '../components/Editor/utils';

// [TODO] - test
import { withInlines } from './extenstions/withInlines';

type Props<TKeys extends string, TProps, TOptions> = PluginParams<TKeys, TProps, TOptions> & {
  id: string;
  marks?: YooptaMark<any>[];
  options: PluginParams<TKeys, TProps, TOptions>['options'];
  placeholder?: string;
};

const getMappedElements = (elements) => {
  const mappedElements = {};
  Object.keys(elements).forEach((type) => (mappedElements[type] = elements[type].render));
  return mappedElements;
};

const getMappedMarks = (marks?: YooptaMark<any>[]) => {
  const mappedMarks = {};
  if (!marks) return mappedMarks;

  marks.forEach((mark) => (mappedMarks[mark.type] = mark));
  return mappedMarks;
};

const SlateEditorComponent = <TKeys extends string, TProps, TOptions>({
  id,
  customEditor,
  elements,
  marks,
  events,
  options,
  placeholder = `Type '/' for commands`,
}: Props<TKeys, TProps, TOptions>) => {
  const editor = useYooptaEditor();
  const block = useBlockData(id);
  const initialValue = useRef(block.value).current;
  const type = block.type;

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const slate = useMemo(() => {
    let slateEditor = editor.blockEditorsMap[id];
    const elementTypes = Object.keys(elements);

    elementTypes.forEach((elementType) => {
      const nodeType = elements[elementType].props?.nodeType;

      const isInline = nodeType === 'inline';
      const isVoid = nodeType === 'void';
      const isInlineVoid = nodeType === 'inlineVoid';

      if (isInlineVoid) {
        slateEditor.markableVoid = (element) => element.type === elementType;
      }

      if (isVoid || isInlineVoid) {
        slateEditor.isVoid = (element) => element.type === elementType;
      }

      if (isInline || isInlineVoid) {
        slateEditor.isInline = (element) => element.type === elementType;

        // [TODO] - as test
        // [TODO] - should extend all slate editors for every block
        // slateEditor = withInlines(slateEditor);
      }
    });

    return slateEditor;
  }, []);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    if (!events) return {};

    const eventHandlersOptions: PluginEventHandlerOptions = {
      hotkeys: HOTKEYS,
      currentBlock: block,
      defaultBlock: buildBlockData({ id: generateId() }),
    };
    const eventHandlersMap = {};

    Object.keys(events).forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        if (events[eventType]) {
          const handler = events[eventType](editor, slate, eventHandlersOptions);
          handler(event);
        }
      };
    });

    return eventHandlersMap;
  }, [events, editor, block]);

  const onChange = (value) => editor.updateBlock(id, { value });

  const renderElement = (props: RenderElementProps) => {
    const ElementComponent = ELEMENTS_MAP[props.element.type];

    if (!ElementComponent) return <></>;
    return <ElementComponent {...props} blockId={id} options={options} />;
  };

  const renderLeaf = (props: ExtendedLeafProps<any, any>) => {
    let { children, leaf, attributes } = props;
    const { text, ...formats } = leaf;

    const isBlockSelected = editor.selection?.[0] === block.meta.order;

    if (formats) {
      Object.keys(formats).forEach((format) => {
        const mark = MARKS_MAP[format];
        if (mark) children = mark.render({ children, leaf });
      });
    }

    const isParentElementVoid = props.children?.props?.parent?.props?.nodeType === 'void';
    const showPlaceholder = !isParentElementVoid && isBlockSelected && leaf.withPlaceholder;

    return (
      <TextLeaf attributes={attributes} placeholder={showPlaceholder ? placeholder : undefined}>
        {children}
      </TextLeaf>
    );
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    eventHandlers.onKeyDown?.(event);
    EVENT_HANDLERS.onKeyDown(editor)(event);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    eventHandlers?.onKeyUp?.(event);
  };

  const onMouseDown = (event: React.MouseEvent) => {
    if (editor.selection?.[0] !== block.meta.order) {
      editor.setSelection([block.meta.order]);
    }
    eventHandlers?.onMouseDown?.(event);
  };

  const onBlur = (event: React.FocusEvent) => {
    event.preventDefault();
    eventHandlers?.onBlur?.(event);
  };

  const onFocus = (event: React.FocusEvent) => {
    eventHandlers?.onFocus?.(event);
  };

  const decorate = (nodeEntry: NodeEntry) => {
    const ranges = [] as NodeEntry[] & { withPlaceholder?: boolean }[];
    const [node, path] = nodeEntry;
    const isCurrent = editor.selection?.[0] === block.meta.order;

    if (slate.selection && isCurrent) {
      if (
        !Editor.isEditor(node) &&
        Editor.string(slate, [path[0]]) === '' &&
        Range.includes(slate.selection, path) &&
        Range.isCollapsed(slate.selection)
      ) {
        ranges.push({
          ...slate.selection,
          withPlaceholder: true,
        });
      }
    }

    return ranges;
  };

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <SlateEditorInstance
        id={id}
        slate={slate}
        initialValue={initialValue}
        onChange={onChange}
        decorate={decorate}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        eventHandlers={eventHandlers}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onBlur={onBlur}
        customEditor={customEditor}
      />
    </div>
  );
};

type SlateEditorInstanceProps = {
  id: string;
  slate: any;
  initialValue: any;
  onChange: (value: any) => void;
  renderLeaf: (props: ExtendedLeafProps<any, any>) => JSX.Element;
  renderElement: (props: RenderElementProps) => JSX.Element;
  eventHandlers: EditorEventHandlers;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onKeyUp: (event: React.KeyboardEvent) => void;
  onFocus: (event: React.FocusEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  customEditor?: (props: PluginElementRenderProps) => JSX.Element;
  decorate: (nodeEntry: NodeEntry) => any[];
};

// [TODO] - no need memo
const SlateEditorInstance = memo<SlateEditorInstanceProps>(
  ({
    id,
    slate,
    initialValue,
    onChange,
    renderLeaf,
    renderElement,
    eventHandlers,
    onKeyDown,
    onKeyUp,
    onFocus,
    onMouseDown,
    onBlur,
    customEditor,
    decorate,
  }) => {
    // if (typeof customEditor === 'function') {
    //   return customEditor({
    //     id,
    //     type: '',
    //     editor: slate,
    //     // attributes: {},
    //     children: [],
    //   });
    // }

    return (
      <Slate key={`slate-${id}`} editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          key={`editable-${id}`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="focus-visible:outline-none focus:outline-none"
          spellCheck
          {...eventHandlers}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          decorate={decorate}
          // [TODO] - carefully check onBlur, e.x. transforms using functions, e.x. highlight update
          onBlur={onBlur}
          onPaste={(event) => {
            const html = event.clipboardData.getData('text/html');
            const parsetHTML = new DOMParser().parseFromString(html, 'text/html');
            if (parsetHTML.body.childNodes.length > 0) {
              event.preventDefault();
              // [TODO] - link https://github.com/rollup/plugins/issues/1122 to test

              const HTML_NODENAME_MATCHERS = {
                H1: 'HeadingOne',
                H2: 'HeadingTwo',
                H3: 'HeadingThree',
                P: 'Paragraph',
                OL: 'NumberedList',
                UL: 'BulletedList',
                BLOCKQUOTE: 'Blockquote',
              };

              const nodes = Array.from(parsetHTML.body.childNodes)
                .map((node, i) => {
                  if (HTML_NODENAME_MATCHERS[node.nodeName]) {
                    const blockType = HTML_NODENAME_MATCHERS[node.nodeName];

                    const blockData = buildBlockData({
                      id: generateId(),
                      type: blockType,
                      value: [],
                      meta: {
                        order: i,
                        depth: 0,
                      },
                    });

                    return blockData;
                  }
                })
                .filter(Boolean);

              console.log('nodes', nodes);
              console.log('parsetHTML.body', parsetHTML.body);
            }
          }}
        />
      </Slate>
    );
  },
);

SlateEditorInstance.displayName = 'SlateEditorInstance';

export { SlateEditorComponent };
