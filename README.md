[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=Darginec05&name=Yoopta-Editor)](https://repo-rater.eddiehub.io/rate?owner=Darginec05&name=Yoopta-Editor)

# Welcome to Yoopta-Editor@v4🎉

<video src="https://res.cloudinary.com/ench-app/video/upload/v1713367872/Yoopta_Intro_ndwglr.mp4" autoplay muted controls></video>

## Introduction

Yoopta-Editor is a free, open-source rich-text editor built for React apps. It’s packed with features that let you build an editor as powerful and user-friendly as Notion, Craft, Code Medium from scratch.

With Yoopta-Editor, you can customize everything to fit exactly what you need. Want to tweak the look, add cool features, or craft a completely custom user interface? No problem. Yoopta-Editor gives you the flexibility to do it all, making it easy to create the perfect tool for your project.
All of this is customizable, extensible, and easy to set up!

## Features

- Easy setup
- Default list of powerful plugins
- Many typical solved problems in UX behavior.
- Media plugins on steroids with optimization and lazy loadings
- Code plugin on steroids with themes and languages
- Each plugin can be easily customized and extensible
- Drag and drop, nested dnd is supported also
- Selection box for manipulating with multiple blocks at once
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

## Getting Started

First install the peer dependencies and the Yoopta core package with at least one plugin

```bash
## slate, slate-react, react, react-dom - peer dependecies
## @yoopta/editor - core package
yarn add slate slate-react @yoopta/editor @yoopta/paragraph
# or
npm install slate slate-react @yoopta/editor @yoopta/paragraph
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

## How to use

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

**_[Check code with plugins](https://github.com/Darginec05/Yopta-Editor/blob/master/web/src/examples/withBasicExample.tsx#L27)_**

### Tools

Yoopta-Editor provides useful tools that can help you when working with the editor

Here is list of available tools

- @yoopta/link-tool
- @yoopta/action-menu-list
- @yoopta/toolbar
- _@yoopta/chat-gpt-assistant_ - **soon**

**_[Check code with tools](https://github.com/Darginec05/Yopta-Editor/blob/master/web/src/examples/withBasicExample.tsx#L76)_**

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

Here is list of available marks from **@yoopta/marks** package

- Bold
- Italic
- CodeMark
- Underline
- Strike

## How to use

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

**_[Check code with marks](https://github.com/Darginec05/Yopta-Editor/blob/master/web/src/examples/withBasicExample.tsx#L85)_**

## Examples - DEMO's

In this section, we provide you with some examples of using the Yoopta-Editor in your projects. These examples will help you get started quickly and show you how easy it is to integrate and customize the editor to your needs.

Okay, let's go!

- [With basic example](https://yopta-editor.vercel.app/examples/withBasicExample)
- [With Notion example](https://yopta-editor.vercel.app/examples/withNotionExample)
- [With custom toolbar (Medium example)](https://yopta-editor.vercel.app/examples/withCustomToolbar)
- [With media plugins](https://yopta-editor.vercel.app/examples/withMedia)
- [With custom component](https://yopta-editor.vercel.app/examples/withCustomComponent)
- [With extended plugin](https://yopta-editor.vercel.app/examples/withExtendedPlugin)
- [With offline mode](https://yopta-editor.vercel.app/examples/withOffline)
- [With HTML and Markdown exports](https://yopta-editor.vercel.app/examples/withExports)
- [With custom mark](https://yopta-editor.vercel.app/examples/withCustomMark)
- ...and check other examples in the sidebar list

## Give us ⭐️ star

If you find Yoopta-Editor useful and valuable for your projects, I kindly ask you to show your support by giving us a ⭐️ star on GitHub. Your appreciation means a lot to us and helps us grow and continue improving the editor for the community. 💙💙💙

## Roadmap

- Develop other powerful plugins
- AI tools
- Simplify API for creating plugins
- Collabrative mode
- Plugin system
- Optimizations for media components
- Rethink approach for just rendering to increase SEO perfomance
- Continue improving the project. We are listening to you and your requests 💙

## License

Yoopta-Editor is released under the [MIT License](https://github.com/Darginec05/Yopta-Editor/blob/master/LICENSE). Feel free to use and modify it for your projects.

## Support

If you have any questions or need assistance raise an issue in the GitHub repository. I will be happy to help you.

Let's create powerful and engaging editing experiences together with Yoopta-Editor!

## Contacts

- [Telegram for community](https://t.ly/8u0T9)
- [Twitter](https://twitter.com/LebovskiYoo)
- [Github](https://github.com/Darginec05)
