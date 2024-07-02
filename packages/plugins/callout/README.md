# Callout plugin

Callout is plugin for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/callout
```

### Usage

```jsx
import Callout from '@yoopta/callout';

const plugins = [Callout];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

### Default classnames

- .yoopta-callout
- .yoopta-callout-theme-['default' | 'success' | 'warning' | 'error' | 'info']

### Default options

```js
const Callout = new YooptaPlugin({
  options: {
    display: {
      title: 'Callout',
      description: 'Make writing stand out',
    },
    shortcuts: ['<'],
  },
});
```

### How to extend

```tsx
const plugins = [
  Callout.extend({
    renders: {
      callout: (props) => <YourCustomComponent {...props} />
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
