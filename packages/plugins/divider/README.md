# Divider plugin

Divider is default plugin for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/divider
```

### Usage

```jsx
import Divider from '@yoopta/divider';

const plugins = [Divider];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

### Default classnames

- .yoopta-divider

### Default options

```js
const Divider = new YooptaPlugin({
  options: {
    display: {
      title: 'Text',
      description: 'Start writing plain text.',
    },
    shortcuts: ['p', 'text'],
  },
});
```

### How to extend

```tsx
const plugins = [
  Divider.extend({
    renders: {
      divider: (props) => <YourCustomComponent {...props} />
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
