# Core package

This is core package for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/editor
```

### Usage

```tsx
import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
// plugins
import Paragraph from '@yoopta/paragraph';

const plugins = [Paragraph];

const Editor = () => {
  // create instance
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  return <YooptaEditor editor={editor} plugins={plugins} />;
};
```

### YooptaEditor component props

```ts
type Props = {
  /**
   * Instance of editor
   */
  editor: YooEditor;
  /**
   * Optional custom id. Useful for multiple instances
   */
  id?: string;
  /**
   * List of plugins
   */
  plugins: YooptaPlugin[];
  /**
   * List of marks from @yoopta/marks
   */
  marks?: YooptaMark<any>[];
  /**
   * Optional value of editor. DEFAULT - [undefined]
   */
  value?: YooptaContentValue;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  children?: React.ReactNode;
  tools?: Partial<Tools>;
  placeholder?: string;
  readOnly?: boolean;
  width?: number | string;
};
```

### Hooks

```js
const Paragraph = new YooptaPlugin({
  options: {
    display: {
      title: 'Text',
      description: 'Start writing plain text.',
    },
    shortcuts: ['p', 'text'],
  },
});
```

### Default options

```js
const Paragraph = new YooptaPlugin({
  options: {
    display: {
      title: 'Text',
      description: 'Start writing plain text.',
    },
    shortcuts: ['p', 'text'],
  },
});
```

### Options to extend

```tsx
const plugins = [
  Paragraph.extend({
    renders: {
      editor: (props) => <YourCustomComponent {...props} />
    },
    options: {
      shortcuts: [`<your custom shortcuts>`],
      align: 'left' | 'center' | 'right',
      display: {
        title: `<your custom title>`,
        description: `<your custom description>`,
      },
      HTMLAttributes: {
        className: '<your classname>',
        // ...other HTML attributes
      },
    },
  });
];
```
