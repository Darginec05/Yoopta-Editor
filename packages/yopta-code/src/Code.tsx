import { Editor, Element, Path, Range, Transforms } from 'slate';
import { YoptaComponent, getNodeByPath, generateId } from '@yopta/editor';
import { CodeLeaf } from './ui/CodeLeaf';
import { CodeRender } from './ui/CodeRender';
import { CodeLineRender } from './ui/CodeLineRender';
import { codeLineDecorator } from './utils/decorator';

const CODE_NODE_TYPE = 'code';
const CODE_LINE_NODE_TYPE = 'code-line';

const CodeLine = new YoptaComponent({
  type: CODE_LINE_NODE_TYPE,
  renderer: CodeLineRender,
  leaf: () => CodeLeaf,
  decorator: codeLineDecorator,
  handlers: {
    onKeyDown:
      (editor, { hotkeys, defaultNode }) =>
      (event) => {
        if (!editor.selection) return;

        // [TODO] - define this function in options
        const node = getNodeByPath(editor, editor.selection.anchor.path, 'lowest');

        if (node.type !== CODE_LINE_NODE_TYPE) return;

        const parentCodeEntry = Editor.above(editor, {
          at: editor.selection.anchor.path,
          match: (n) => Element.isElement(n) && n.type === CODE_NODE_TYPE,
        });

        if (hotkeys.isEnter(event)) {
          event.preventDefault();
          Editor.insertBreak(editor);
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

const Code = new YoptaComponent({
  type: CODE_NODE_TYPE,
  renderer: CodeRender,
  shortcut: 'hw',
  children: CodeLine,
  createNode: (editor, type, data = {}) => {
    const childNode = {
      id: generateId(),
      type: CODE_LINE_NODE_TYPE,
      children: [{ text: '' }],
      ...data,
    };

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code',
      split: true,
    });

    Transforms.setNodes(editor, childNode, {
      at: editor.selection?.anchor,
    });

    const block = { id: generateId(), language: 'javascript', type: type, children: [{ text: '' }] };

    Transforms.wrapNodes(editor, block, {
      at: editor.selection?.anchor,
    });
  },
});

export { Code, CodeLine };
