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

  // from html to @yoopta content
  const deserializeHTML = () => {
    const htmlString = '<h1>First title</h1>';
    const content = html.deserialize(editor, htmlString);

    editor.setEditorValue(content);
  };

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);
    console.log('html string', htmlString);
  };

  return (
    <div>
      <button onClick={deserializeHTML}>Deserialize from html to content</button>
      <button onClick={serializeHTML}>Serialize from content to html</button>

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

  // from markdown to @yoopta content
  const deserializeMarkdown = () => {
    const markdownString = '# First title';
    const value = markdown.deserialize(editor, markdownString);

    editor.setEditorValue(value);
  };

  // from @yoopta content to markdown string
  const serializeMarkdown = () => {
    const data = editor.getEditorValue();
    const markdownString = markdown.serialize(editor, data);
    console.log('markdown string', markdownString);
  };

  return (
    <div>
      <button onClick={deserializeMarkdown}>Deserialize from markdown to content</button>
      <button onClick={serializeMarkdown}>Serialize from content to markdown</button>

      <YooptaEditor editor={editor} plugins={plugins} />
    </div>
  );
};
```

Plain text exports/imports example

```jsx
import { plainText } from '@yoopta/exports';

const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);

  // from plain text to @yoopta content
  const deserializeText = () => {
    const textString = '# First title';
    const value = plainText.deserialize(editor, textString);

    editor.setEditorValue(value);
  };

  // from @yoopta content to plain text string
  const serializeText = () => {
    const data = editor.getEditorValue();
    const textString = plainText.serialize(editor, data);
    console.log('plain text string', textString);
  };

  return (
    <div>
      <button onClick={deserializeText}>Deserialize from plain text to content</button>
      <button onClick={serializeText}>Serialize from content to plain text</button>

      <YooptaEditor editor={editor} plugins={plugins} />
    </div>
  );
};
```

Examples

- Page - [https://yoopta.dev/examples/withExports](https://yoopta.dev/examples/withExports)
  - Example with HTML - [https://yoopta.dev/examples/withExports/html](https://yoopta.dev/examples/withExports/html)
  - Example with Markdown - [https://yoopta.dev/examples/withExports/markdown](https://yoopta.dev/examples/withExports/markdown)
