# StarterKit plugin

StarterKit is plugin for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/starter-kit
```

### Usage

```jsx
import StarterKit from '@yoopta/starter-kit';

const plugins = [StarterKit];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```
