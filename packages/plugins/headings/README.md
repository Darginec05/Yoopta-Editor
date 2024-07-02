# Headings plugins

Headings include three plugins for Yoopta-Editor:

- HeadingOne
- HeadingTwo
- HeadingThree

### Installation

```bash
yarn add @yoopta/headings
```

### Usage

```jsx
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';

const plugins = [HeadingOne, HeadingTwo, HeadingThree];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

## HeadingOne

### Default classnames

- .yoopta-heading-one

### Default options

```js
const HeadingOne = new YooptaPlugin({
  options: {
    display: {
      title: 'Heading 1',
      description: 'Big section heading',
    },
    shortcuts: ['h1', '#', '*'],
  },
});
```

### How to extend

```tsx
const plugins = [
  HeadingOne.extend({
    renders: {
      heading-one: (props) => <YourCustomComponent {...props} />
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

## HeadingTwo

### Default classnames

- .yoopta-heading-two

### Default options

```js
const HeadingTwo = new YooptaPlugin({
  options: {
    display: {
      title: 'Heading 2',
      description: 'Medium section heading',
    },
    shortcuts: ['h2', '##'],
  },
});
```

### How to extend

```tsx
const plugins = [
  HeadingTwo.extend({
    renders: {
      heading-two: (props) => <YourCustomComponent {...props} />
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

## HeadingThree

### Default classnames

- .yoopta-heading-three

### Default options

```js
const HeadingThree = new YooptaPlugin({
  options: {
    display: {
      title: 'Heading 3',
      description: 'Small section heading',
    },
    shortcuts: ['h3', '###'],
  },
});
```

### How to extend

```tsx
const plugins = [
  HeadingThree.extend({
    renders: {
      heading-three: (props) => <YourCustomComponent {...props} />
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
