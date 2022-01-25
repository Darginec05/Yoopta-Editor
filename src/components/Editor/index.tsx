import {
  createEditor,
  Descendant,
  Editor,
  Range,
  Transforms,
  Element as SlateElement,
} from "slate";
import { useCallback, useMemo, useState, KeyboardEvent } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { TextLeaf } from "./TextLeaf";
import { Element } from "./Element";
import { withShortcuts, withSoftBreak, withInlines } from "./plugins";
import { Toolbar } from "./Toolbar";
import { ParagraphElement } from "./custom-types";

const IGNORED_SOFT_BREAK_ELEMS = [
  "bulleted-list",
  "numbered-list",
  "list-item",
];

const getInitialData = () => {
  if (typeof window === "undefined") return [];

  const content = localStorage.getItem("content");

  return content ? JSON.parse(content) : [];
};

const SlateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());
  const editor = useMemo(
    () =>
      withHistory(
        withInlines(withShortcuts(withSoftBreak(withReact(createEditor()))))
      ),
    []
  );

  const renderLeaf = useCallback(
    (leafProps) => <TextLeaf {...leafProps} />,
    []
  );

  const renderElement = useCallback(
    (elemProps) => <Element {...elemProps} />,
    []
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;
    const element = editor.children[selection?.anchor.path[0] || 0];

    if (event.key === "Enter") {
      const newLine: ParagraphElement = {
        type: "paragraph",
        children: [{ text: "" }],
      };

      const [currentText] = Editor.leaf(editor, editor.selection!.anchor.path);

      const match = Editor.above(editor, {
        match: (n) => {
          return Editor.isBlock(editor, n) && n.type === "list-item";
        },
      });

      if (match && currentText.text.trim() === "") {
        event.preventDefault();

        Transforms.setNodes<SlateElement>(editor, newLine, {
          match: (n) => Editor.isBlock(editor, n),
        });

        Transforms.unwrapNodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            (n.type === "bulleted-list" ||
              n.type === "list-item" ||
              n.type === "numbered-list"),
          split: true,
        });
      }

      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText("\n");
      }

      if (!event.shiftKey && !IGNORED_SOFT_BREAK_ELEMS.includes(element.type)) {
        event.preventDefault();

        Transforms.insertNodes(editor, newLine);
      }
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div style={{ maxWidth: 680, paddingTop: "4rem", margin: "0 64px" }}>
        <Slate
          editor={editor}
          value={value}
          onChange={(val) => {
            setValue(val);

            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );

            if (isAstChange) {
              const content = JSON.stringify(value);
              localStorage.setItem("content", content);
            }
          }}
        >
          <Toolbar />
          <Editable
            placeholder="Type something.."
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDown}
            decorate={([node, path]) => {
              if (editor.selection) {
                if (
                  !Editor.isEditor(node) &&
                  Editor.string(editor, [path[0]]) === "" &&
                  Range.includes(editor.selection, path) &&
                  Range.isCollapsed(editor.selection)
                ) {
                  return [
                    {
                      ...editor.selection,
                      placeholder: true,
                    },
                  ];
                }
              }
              return [];
            }}
            spellCheck
            // autoFocus
          />
        </Slate>
      </div>
    </div>
  );
};

export { SlateEditor };
