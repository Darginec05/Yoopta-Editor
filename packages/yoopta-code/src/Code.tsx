import { Editor, Element, Node, NodeEntry, Path, Range, Transforms } from 'slate';
import { getElementByPath, generateId, createYooptaPlugin, YoEditor, YooptaPluginBaseOptions } from '@yoopta/editor';
import { CodeLeaf } from './ui/CodeLeaf';
import { CodeRender } from './ui/CodeRender';
import { CodeLineRender } from './ui/CodeLineRender';
import { codeLineDecorator, getChildNodeToDecorations, mergeMaps } from './utils/decorator';
import { CodeEditor } from './ui/CodeEditor';
import { CodeChildElement, CodeElement } from './types';

const CODE_NODE_TYPE = 'code';
const CODE_CHILD_NODE_TYPE = 'code-line';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: CodeElement | CodeChildElement;
  }
}

const CodeLine = createYooptaPlugin<any, CodeChildElement>({
  type: CODE_CHILD_NODE_TYPE,
  renderer: CodeLineRender,
  leaf: () => CodeLeaf,
  decorator: codeLineDecorator,
  placeholder: null,
  defineElement: (): CodeChildElement => ({
    id: generateId(),
    type: 'code-line',
    children: [{ text: '' }],
    nodeType: 'block',
    // [TODO] - move it to render options
    data: { skipSettings: true, skipDrag: true },
  }),
  events: {
    onKeyDown:
      (editor, { hotkeys, defaultNode }) =>
      (event) => {
        if (!editor.selection) return;

        // [TODO] - define this function in options
        const node = getElementByPath(editor, editor.selection.anchor.path, 'lowest');

        if (node.type !== CODE_CHILD_NODE_TYPE) return;

        const codeLineEntry = Editor.above(editor, {
          at: editor.selection?.anchor.path,
          match: (n) => Element.isElement(n) && n.type === CODE_CHILD_NODE_TYPE,
        });

        const parentCodeEntry: NodeEntry<CodeElement> | undefined = Editor.above(editor, {
          at: editor.selection.anchor.path,
          match: (n) => Element.isElement(n) && n.type === CODE_NODE_TYPE,
        });

        if (hotkeys.isEnter(event)) {
          event.preventDefault();
          Editor.insertBreak(editor);
          Transforms.setNodes<CodeChildElement>(
            editor,
            { id: generateId() },
            {
              at: codeLineEntry?.[1] || editor.selection.anchor.path,
            },
          );
          return;
        }

        if (hotkeys.isTab(event)) {
          event.preventDefault();

          const text = ' '.repeat(2);
          Transforms.insertText(editor, text);
          return;
        }

        if (hotkeys.isSelect(event)) {
          event.preventDefault();
          if (!parentCodeEntry) return;

          if (Range.isExpanded(editor.selection)) {
            Transforms.select(editor, []);
            return;
          }

          Transforms.select(editor, parentCodeEntry[1]);
          return;
        }

        if (hotkeys.isBackspace(event)) {
          if (!parentCodeEntry || !codeLineEntry) return;

          const [parentCodeNode] = parentCodeEntry;
          const [, codeLinePath] = codeLineEntry;

          if (
            !Range.isExpanded(editor.selection) &&
            parentCodeNode.children.length === 1 &&
            Editor.isStart(editor, editor.selection.anchor, codeLinePath)
          ) {
            return event.preventDefault();
          }
        }

        if (hotkeys.isShiftEnter(event)) {
          event.preventDefault();
          if (!parentCodeEntry) return;

          const [, parentCodePath] = parentCodeEntry;

          Transforms.insertNodes(
            editor,
            { ...defaultNode, id: generateId() },
            {
              at: Path.next(parentCodePath),
              mode: 'highest',
              match: (n) => Element.isElement(n),
              select: true,
            },
          );

          return;
        }
      },
  },
});

const Code = createYooptaPlugin<YooptaPluginBaseOptions, CodeElement>({
  type: CODE_NODE_TYPE,
  renderer: {
    editor: CodeEditor,
    render: CodeRender,
  },
  shortcut: ['code', '```'],
  childPlugin: CodeLine,
  extendEditor(editor) {
    const { normalizeNode } = editor;

    (editor as YoEditor & { nodeToDecorations: (n: Element) => any }).nodeToDecorations = (node) => {
      const blockEntries = Array.from(
        Editor.nodes(editor, {
          at: [],
          mode: 'highest',
          match: (n) => Element.isElement(n) && n.type === 'code',
        }),
      );

      const nodeToDecorations = mergeMaps(...blockEntries.map(getChildNodeToDecorations));
      return nodeToDecorations.get(node);
    };

    editor.normalizeNode = (entry) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === 'code') {
        for (const [childNode, childPath] of Node.children(editor, path)) {
          if (Element.isElement(childNode) && childNode.type !== 'code-line') {
            const childNode: CodeChildElement = CodeLine.getPlugin.defineElement();
            Transforms.setNodes(editor, childNode, { at: childPath });
            return;
          }
        }
      }

      normalizeNode(entry);
    };

    return editor;
  },
  defineElement: (): CodeElement => ({
    id: generateId(),
    type: 'code',
    children: [CodeLine.getPlugin.defineElement()],
    nodeType: 'block',
    data: { language: 'javascript' },
  }),
  createElement: function (editor) {
    const childNode: CodeChildElement = CodeLine.getPlugin.defineElement();

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code',
      split: true,
    });

    Transforms.setNodes(editor, childNode, {
      at: editor.selection?.anchor,
    });

    const parentBlock: CodeElement = Code.getPlugin.defineElement();

    Transforms.wrapNodes(editor, parentBlock, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => {
        return ` \`\`\`${text}\`\`\`\n`;
      },
    },
    html: {
      serialize: (node, children) =>
        `<pre style="background-color: #263238; color: #fff; padding: 20px 24px; white-space: pre-line;"><code>${children}</code></pre>`,
      deserialize: {
        nodeName: ['PRE'],
      },
    },
  },
  options: {
    searchString: 'hello world bug',
    displayLabel: 'Code',
  },
});

export { Code, CodeLine, CodeElement, CodeChildElement };
