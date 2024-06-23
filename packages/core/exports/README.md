# Exports

Exports is core package for exporting/importing yoopta content in different formats
The package `@yoopta/exports` supports exporting/importing in the next formats:

- HTML
- Markdown
- Plain text

### Installation

```bash
yarn add @yoopta/exports
```

### Usage

HTML exports/imports example

```jsx
import { html } from '@yoopta/exports';

const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);

  const deserializeHTML = () => {};

  return (
    <div>
      <button
        onClick={() => {
          const htmlString = '<h1>First title</h1>';
          const value = html.deserialize(editor, htmlString);

          editor.setEditorValue(value);
        }}
      >
        Deserialize from html to content
      </button>

      <button
        onClick={() => {
          const data = editor.getEditorValue();
          const htmlString = html.serialize(editor, data);
        }}
      >
        Serialize from content to html
      </button>

      <YooptaEditor editor={editor} plugins={plugins} />
    </div>
  );
};
```

---

Markdown exports/imports example

```jsx
import { markdown } from '@yoopta/exports';

const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);

  const deserializeHTML = () => {};

  return (
    <div>
      <button
        onClick={() => {
          const markdownString = '# First title';
          const value = markdown.deserialize(editor, markdownString);

          editor.setEditorValue(value);
        }}
      >
        Deserialize from markdown to content
      </button>

      <buttonw
        onClick={() => {
          const data = editor.getEditorValue();
          const markdownString = markdown.serialize(editor, data);
        }}
      >
        Serialize from content to markdown
      </button>

      <YooptaEditor editor={editor} plugins={plugins} />
    </div>
  );
};
```

Examples

- Page - [https://yoopta.dev/examples/withExports](https://yoopta.dev/examples/withExports)
  - Example with HTML - [https://yoopta.dev/examples/withExports/html](https://yoopta.dev/examples/withExports/html)
  - Example with Markdown - [https://yoopta.dev/examples/withExports/markdown](https://yoopta.dev/examples/withExports/markdown)
