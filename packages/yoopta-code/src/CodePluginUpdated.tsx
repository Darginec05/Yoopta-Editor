import { deepClone, generateId, HOTKEYS, YooptaBaseElement } from '@yoopta/editor';
import { KeyboardEvent, useCallback, useState } from 'react';
import { BaseEditor, createEditor, Editor, Element, Path, Range, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

const initialValue: any = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const CodeElement = (props) => {
  console.log('CodePluginUltra props', props);

  return (
    <pre {...props.attributes} style={{ marginTop: 40, minHeight: 100, width: '100%' }}>
      <code>{props.children}</code>
    </pre>
  );
};

export const getDefaultParagraphLine = (id: string): YooptaBaseElement<'paragraph'> => ({
  id,
  type: 'paragraph',
  nodeType: 'block',
  children: [{ text: '' }],
});

const CodePluginUltra = ({ editor }) => {
  const renderElement = useCallback((props) => {
    if (props.element.type === 'code') {
      return <CodeElement {...props} />;
    }
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    Editor.withoutNormalizing(editor, () => {
      if (!editor.selection) return;
      const defaultNode = getDefaultParagraphLine(generateId());

      // // Check if all selected nodes should be deleted
      // if (HOTKEYS.isBackspace(event)) {
      //   const [, firstElementPath] = Editor.first(editor, [0]);
      //   const [, lastElementPath] = Editor.last(editor, [editor.children.length - 1]);

      //   const fullRange = Editor.range(editor, firstElementPath, lastElementPath);
      //   const isAllNodesSelected = Range.equals(editor.selection, fullRange);

      //   if (isAllNodesSelected) {
      //     event.preventDefault();
      //     // Editor.deleteFragment(editor);
      //     return;
      //   }
      // }

      // marks?.forEach((mark) => {
      //   if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
      //     event.preventDefault();
      //     toggleMark(editor, mark.type, false);
      //   }
      // });

      // eventHandlers.onKeyDown?.(event);

      const nodeEntry = Editor.above<YooptaBaseElement<string>>(editor, {
        match: (n) => !Editor.isEditor(n),
        mode: 'lowest',
      });

      if (HOTKEYS.isEnter(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

        const marks = Object.keys(Editor.marks(editor) || {});

        if (marks.length > 0) marks.forEach((mark) => Editor.removeMark(editor, mark));

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
          Transforms.insertNodes(editor, deepClone(currentNode), { at: Path.next(parentPath) });

          Transforms.select(editor, { path: [Path.next(editor.selection.anchor.path)[0] + 1, 0], offset: 0 });
          return;
        }

        Transforms.splitNodes(editor, { always: true });
        Transforms.setNodes(editor, defaultNode);
        // changeHoveredNode(defaultNode);

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

        // [TODO] - check if is inline node
        Transforms.select(editor, nodeEntry[1]);
        return;
      }
    });
  }, []);

  return (
    // <Slate editor={editor} initialValue={initialValue}>
    <Editable
      renderElement={renderElement}
      onKeyDown={onKeyDown}
      onChange={(value) => {
        console.log('editor.operations', editor.operations);

        const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type);
        if (isAstChange) {
          const content = JSON.stringify(value);
          localStorage.setItem('code-content', content);
        }
      }}
    />
    // </Slate>
  );
};

export { CodePluginUltra };
