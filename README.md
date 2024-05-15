<a href="https://www.producthunt.com/products/yoopta-edtior?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yoopta&#0045;edtior" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453627&theme=light" alt="Yoopta&#0032;Edtior - Open&#0045;source&#0032;WYSIWYG&#0032;editor&#0032;setting&#0032;a&#0032;new&#0032;standard | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=Darginec05&name=Yoopta-Editor)](https://repo-rater.eddiehub.io/rate?owner=Darginec05&name=Yoopta-Editor)

# Welcome to Yoopta-Editor@v4🎉

![](/docs/public/yoopta_intro.gif)

## Introduction

Yoopta-Editor is a free, open-source rich-text editor built for React apps. It’s packed with features that let you build an editor as powerful and user-friendly as Notion, Craft, Coda, Medium etc.

With Yoopta-Editor, you can customize everything to fit exactly what you need. Want to tweak the look, add cool features, or craft a completely custom user interface? No problem. Yoopta-Editor gives you the flexibility to do it all, making it easy to create the perfect tool for your project.
All of this is customizable, extensible, and easy to set up!

## Features

- Easy setup
- Default list of powerful plugins
- Many typical solved problems in UX behaviour.
- Media plugins on steroids with optimization and lazy loadings
- Code plugin on steroids with themes and languages
- Each plugin can be easily customized and extensible
- Drag and drop, nested dnd is supported also
- Selection box for manipulating multiple blocks at once
- You can create your own plugin
- A list of useful tools (ActionMenu, Toolbar etc.) for the convenience of working with the editor
- Automatic lazy loading for media components (eg. embeds)
- Large documents
- Mobile friendly
- Indent and outdent for every plugin by tabs and shift+tabs
- Editor instance to programmatically control your content
- Editor events for saving to DB in real-time
- Exports in markdown, plain text, html - [in progress. Currently available only HTML exports]
- Shortcuts, hotkeys. And customization for this!
- Super AI tools not for HYPE, but for real useful work with editor content - [in progress]
- The soul invested in the development of this editor 💙
- ... and other features that I forgot to write about in this list 😅. Just check it in examples!

## Packages

- Core

  - **@yoopta/editor**

- Plugins

  - **@yoopta/paragraph**
  - **@yoopta/blockquote**
  - **@yoopta/code**
  - **@yoopta/embed**
  - **@yoopta/image**
  - **@yoopta/link**
  - **@yoopta/file**
  - **@yoopta/callout**
  - **@yoopta/video**
  - **@yoopta/lists**
  - **@yoopta/headings**

- Tools

  - **@yoopta/action-menu-list**
  - **@yoopta/toolbar**
  - **@yoopta/link-tool**
  - _@yoopta/chat-gpt-assistant_ - **soon**

- Marks
  - **@yoopta/marks** - _[Bold, Italic, CodeMark, Underline, Strike, Highlight]_

## Getting Started

First, install the peer dependencies and the Yoopta core package with at least one plugin

```bash
## slate, slate-react, react, react-dom - peer dependencies
## @yoopta/editor - core package
yarn add slate slate-react @yoopta/editor @yoopta/paragraph
# or
npm install slate slate-react @yoopta/editor @yoopta/paragraph
```

### Start from core package

Import from core package **@yoopta/editor** Editor Component and function to create editor instance

```jsx
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';

const plugins = [...];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <YooptaEditor plugins={plugins} />
    </div>
  );
}
```

Available props for YooptaEditor components

```typescript
type YooptaEditor = {
  /* editor instance */
  editor: YooEditor;
  /* list of plugins */
  plugins: YooptaPlugin[];
  /* list of marks */
  marks?: YooptaMark<any>[];
  /* Value. [Default] - undefined */
  value?: YooptaContentValue;
  /* autoFocus. [Default] - true */
  autoFocus?: boolean;
  /* className */
  className?: string;
  /* These props define the area for the selection box. 
  Good practice - passing parent element.
  [Default] - document */
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  children?: React.ReactNode;
  /* Props for tools. You can get access to any passed tools using `useTools` hook from @yoopta/editor  */
  tools?: Partial<Tools>;
  placeholder?: string;
  readOnly?: boolean;
  /* Width. [Default] - 450px  */
  width?: number | string;
};
```

### Plugins:

Here is list of available plugins

- @yoopta/paragraph
- @yoopta/blockquote
- @yoopta/code
- @yoopta/embed
- @yoopta/image
- @yoopta/link
- @yoopta/file
- @yoopta/callout
- @yoopta/video
- @yoopta/lists
- @yoopta/headings

### How to use

```jsx
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';

const plugins = [Paragraph, Blockquote];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <YooptaEditor
        placeholder="Type text.."
        // here we go
        plugins={plugins}
      />
    </div>
  );
}
```

**_[Check code with plugins](https://github.com/Darginec05/Yoopta-Editor/tree/master/web/next-example/src/components/examples/withBaseFullSetup/index.tsx#L27)_**

### Tools

Yoopta-Editor provides useful tools that can help you when working with the editor

Here is a list of available tools

- @yoopta/action-menu-list
- @yoopta/toolbar
- @yoopta/link-tool
- _@yoopta/chat-gpt-assistant_ - **soon**

**_[Check code with tools](https://github.com/Darginec05/Yoopta-Editor/tree/master/web/next-example/src/components/examples/withBaseFullSetup/index.tsx#L76)_**

### How to use

```jsx
// IMPORT TOOLS
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';

// Tools should be defined outside component
const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: Toolbar,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <YooptaEditor
        plugins={plugins}
        placeholder="Type text.."
        // here we go
        tools={TOOLS}
      />
    </div>
  );
}
```

### Marks

Marks are simple text formats

Here is a list of available marks from **@yoopta/marks** package

- Bold
- Italic
- CodeMark
- Underline
- Strike
- Highlight

### How to use

```jsx
// IMPORT MARKS
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <YooptaEditor
        placeholder="Type text.."
        plugins={plugins}
        tools={TOOLS}
        // here we go
        marks={MARKS}
      />
    </div>
  );
}
```

**_[Check code with marks](https://github.com/Darginec05/Yoopta-Editor/tree/master/web/next-example/src/components/examples/withBaseFullSetup/index.tsx#L85)_**

## Examples - DEMO's

Find below useful examples of utilising the Yoopta-Editor in your projects. These examples will help you get started quickly and show you how easy it is to integrate and customize the editor to your needs.

Okay, let's go!

- [With basic example](https://yoopta-editor.vercel.app/examples/withBaseFullSetup)
- [With custom toolbar (Notion and Medium example)](https://yoopta-editor.vercel.app/examples/withCustomToolbar)
- [With Notion Action Menu](https://yoopta-editor.vercel.app/examples/withNotionActionMenu)
- [With dark theme](https://yoopta-editor.vercel.app/examples/withDarkTheme)
- [With media plugins](https://yoopta-editor.vercel.app/examples/withMedia)
- [With extended plugins](https://yoopta-editor.vercel.app/examples/withExtendedPlugin)
- [With readonly](https://yoopta-editor.vercel.app/examples/withReadOnly)
- [With custom HTML attributes](https://yoopta-editor.vercel.app/examples/withCustomHTMLAttributes)
- [With custom mark](https://yoopta-editor.vercel.app/examples/withCustomMark)
- [With chat slack](https://yoopta-editor.vercel.app/examples/withChatSlack)
- ...and check other examples in the sidebar list

## Give us ⭐️ star

If you find Yoopta-Editor useful and valuable for your projects, I kindly ask you to show your support by giving us a ⭐️ star on GitHub. Your appreciation means a lot to us and helps us grow and continue improving the editor for the community. 💙💙💙

## Roadmap

- Develop other powerful plugins
- AI tools
- Simplify API for creating plugins
- Collaborative mode
- Plugin system
- Optimizations for media components
- Create package @yoopta/hotkeys to manage hotkeys
- Rethink the approach for just rendering to increase SEO performance
- Continue improving the project. [We are listening to you and your requests](https://github.com/Darginec05/Yoopta-Editor/discussions/new/choose) 💙

## License

Yoopta-Editor is released under the [MIT License](https://github.com/Darginec05/Yopta-Editor/blob/master/LICENSE). Feel free to use and modify it for your projects.

## Support

If you have any questions or need assistance raise an issue in the GitHub repository. I will be happy to help you.

Let's create powerful and engaging editing experiences together with Yoopta-Editor!

## Project structure
```text
packages/
├── core - core components of the editor
├── marks - text marks
├── plugins - editor plugin extensions
├── tools - tools packages
└── development - developer playground
```

## Contributing
If you're ready to support Yoopta-Editor, here's how you can do it: 
- If you've spotted a bug or thinking of a feature [raise an issue](https://github.com/Darginec05/Yoopta-Editor/issues/new/choose)
- If you want to collaborate on the project, find an issue you like to work on and suggest your changes. Checkout [contributing guidelines](./CONTRIBUTING.md).
- If you want to discuss your idea feel free to create a [discussion](https://github.com/Darginec05/Yoopta-Editor/discussions/new/choose)
- Or join our [Telegram Community](https://t.me/YooptaEditor) and get in touch with us

<a href="https://github.com/Darginec05/Yoopta-Editor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Darginec05/Yoopta-Editor" />
</a>

## Contacts

- [Telegram Community](https://t.me/YooptaEditor)
- [Twitter](https://twitter.com/LebovskiYoo)
- [Github](https://github.com/Darginec05)
