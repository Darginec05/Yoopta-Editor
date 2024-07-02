# Lists plugins

Lists include three plugins for Yoopta-Editor:

- NumberedList
- BulletedList
- TodoList

### Installation

```bash
yarn add @yoopta/lists
```

### Usage

```jsx
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';

const plugins = [NumberedList, BulletedList, TodoList];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

## NumberedList

### Default classnames

- .yoopta-numbered-list
- .yoopta-numbered-list-count
- .yoopta-numbered-list-content

### Default options

```js
const NumberedList = new YooptaPlugin({
  options: {
    display: {
      title: 'Numbered List',
      description: 'Create list with numbering',
    },
    shortcuts: ['1.'],
  },
});
```

### How to extend

```tsx
const plugins = [
  NumberedList.extend({
    renders: {
      numbered-list: (props) => <YourCustomComponent {...props} />
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

## BulletedList

### Default classnames

- .yoopta-bulleted-list
- .yoopta-bulleted-list-bullet
- .yoopta-bulleted-list-content

### Default options

```js
const BulletedList = new YooptaPlugin({
  options: {
    display: {
      title: 'Bulleted List',
      description: 'Create bullet list',
    },
    shortcuts: ['-'],
  },
});
```

### How to extend

```tsx
const plugins = [
  BulletedList.extend({
    renders: {
      bulleted-list: (props) => <YourCustomComponent {...props} />
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

## TodoList

### Default classnames

- .yoopta-todo-list
- .yoopta-todo-list-checkbox
- .yoopta-todo-list-checkbox-input
- .yoopta-todo-list-content

### Default options

```js
const TodoList = new YooptaPlugin({
  options: {
    display: {
      title: 'Todo List',
      description: 'Track tasks',
    },
    shortcuts: ['[]'],
  },
});
```

### How to extend

```tsx
const plugins = [
  TodoList.extend({
    renders: {
      todo-list: (props) => <YourCustomComponent {...props} />
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
