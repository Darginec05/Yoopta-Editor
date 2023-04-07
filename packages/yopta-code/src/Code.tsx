import { Editor, Element, Node, NodeEntry, Path, Range, Transforms } from 'slate';
import { getElementByPath, generateId, createYoptaPlugin, YoEditor } from '@yopta/editor';
import { CodeLeaf } from './ui/CodeLeaf';
import { CodeRender } from './ui/CodeRender';
import { CodeLineRender } from './ui/CodeLineRender';
import { codeLineDecorator } from './utils/decorator';
import { CodeEditor } from './ui/CodeEditor';
import { CodeChildElement, CodeElement, CodeOptions } from './types';

const CODE_NODE_TYPE = 'code';
const CODE_CHILD_NODE_TYPE = 'code-line';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: CodeElement | CodeChildElement;
  }
}

const CodeLine = createYoptaPlugin<any, CodeChildElement>({
  type: CODE_CHILD_NODE_TYPE,
  renderer: CodeLineRender,
  leaf: () => CodeLeaf,
  decorator: codeLineDecorator,
  getElement: (): CodeChildElement => ({
    id: generateId(),
    type: 'code-line',
    children: [{ text: '' }],
    nodeType: 'block',
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

const Code = createYoptaPlugin<CodeOptions, CodeElement>({
  type: CODE_NODE_TYPE,
  renderer: {
    editor: CodeEditor,
    render: () => CodeRender,
  },
  shortcut: 'hw',
  childPlugin: CodeLine,
  extendEditor(editor) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === 'code') {
        for (const [childNode, childPath] of Node.children(editor, path)) {
          if (Element.isElement(childNode) && childNode.type !== 'code-line') {
            const childNode: CodeChildElement = {
              id: generateId(),
              type: CODE_CHILD_NODE_TYPE,
              children: [{ text: '' }],
              nodeType: 'block',
            };

            Transforms.setNodes(editor, childNode, { at: childPath });

            return;
          }
        }
      }

      normalizeNode(entry);
    };

    return editor;
  },
  getElement: (): CodeElement => ({
    id: generateId(),
    type: 'code',
    children: [CodeLine.getPlugin.getElement()],
    nodeType: 'block',
    data: { language: 'javascript' },
  }),
  createElement: function (editor, type, data = {}) {
    const childNode: CodeChildElement = CodeLine.getPlugin.getElement();

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code',
      split: true,
    });

    Transforms.setNodes(editor, childNode, {
      at: editor.selection?.anchor,
    });

    const parentBlock: CodeElement = this.getElement();

    Transforms.wrapNodes(editor, parentBlock, {
      at: editor.selection?.anchor,
    });
  },
});

export { Code, CodeLine, CodeElement, CodeChildElement };
