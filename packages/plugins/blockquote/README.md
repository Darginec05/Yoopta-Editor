# Blockquote plugin

Blockquote is plugin for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/blockquote
```

### Usage

```jsx
import Blockquote from '@yoopta/blockquote';

const plugins = [Blockquote];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

### Default classnames

- .yoopta-blockquote

### Default options

```js
const Blockquote = new YooptaPlugin({
  options: {
    display: {
      title: 'Blockquote',
      description: 'Capture quote',
    },
    shortcuts: ['>'],
  },
});
```

### How to extend

```tsx
const plugins = [
  Blockquote.extend({
    renders: {
      blockquote: (props) => <YourCustomComponent {...props} />
    },
    options: {
      shortcuts: [`<your custom shortcuts>`],
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
