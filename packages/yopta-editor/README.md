<h2 align="center">Yopta-Editor v1 🎉</h2>
<p align="center">Yopta-Editor - is an open source notion-like editor 💥</p>
<div align="center">
<img width="574" alt="Screen Shot 2023-01-25 at 16 04 29" src="https://user-images.githubusercontent.com/29093118/215324525-882bf403-646c-4267-bb5f-c0f37509ac09.png">
</div>

<div align="center">

</div>

<p align="center">
  <a target="_blank" rel="noopener noreferrer" href="https://yopage.co/blog/0zntIA46L4/W0epdDpnRa">Full docs</a> |
  <a target="_blank" rel="noopener noreferrer" href="https://yopage.co/blog/0zntIA46L4/qOQqVaxxRZ">Get started</a> | 
  <a target="_blank" rel="noopener noreferrer" href="https://yopage.co/blog/0zntIA46L4/kUoZ2DoHnG">API</a> |
  <a target="_blank" rel="noopener noreferrer" href="https://yopage.co/blog/0zntIA46L4/qo9nK4lDG5">FAQs</a> |
  <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/basic">Examples</a>
</p>

### Features

- Triggering by "/" to show list of elements and search needed element by typing
- Drag and drop beetween elements
- Redo/Undo your changes (Ctrl-Z/Ctrl-V)
- Offline ready mode
- Shortcuts
- A cool representation of the data in JSON format, so you can easily save the content data to the database and validate
  You can import two plugins from library: `<YoptaEditor />` and `<YoptaRender />`. <br>
  `<YoptaEditor />` - it's for building beautiful content <br>
  `<YoptaRender />` - it's just for rendering from your saved data, without any editor tools and libraries, so it make you page loading faster
- Custom styling
  ...and other

### Install

    yarn add yopta-editor
    or
    npm install yopta-editor

### Peer dependencies

    yarn add react react-dom slate slate-react
    or
    npm install react react-dom slate slate-react

### Quickstart

```jsx
import { YoptaEditor } from '@yopta/editor';
import { useState } from 'react';

import 'yopta-editor/dist/index.css';

function App() {
  const [editorValue, setEditorValue] = useState([]);

  const onChange = (data) => setEditorValue(data);

  return (
    <div>
      <YoptaEditor value={editorValue} onChange={onChange} />
    </div>
  );
}
```

### Check out other DEMO's 👇

- <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/basic">Basic usage</a>
- <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/offline">Offline mode</a>
- <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/media">Working with media</a>
- <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/render">Just rendering</a>
- <a target="_blank" rel="noopener noreferrer" href="https://yopta-editor.vercel.app/styling">Custom styling</a>
  <br>
  <br>

<div style="padding: 10px">❗ Yopta-Editor is on <span style="color: #007aff">BETA</span> version now. The core functionality works, but you may encounter some bugs.
I have big plans for the v2 version with a lot of cool features and improvements.
Let's build together the best open source editor ever ☝ <br>
Read more about future plans <a target="_blank" rel="noopener noreferrer" href="https://yopage.co/blog/0zntIA46L4/5iK8VNiBI8">"What's next Lebovski?"</a>
</div>
<br>
<div style="padding: 10px; marging: 10px">
📝 This WYSIWYG editor build on top of <a target="_blank" rel="noopener noreferrer" href="https://github.com/ianstormtaylor/slate">Slate JS framework</a> <br>
💙 SlateJS - is the best tool for building rich-text editors. It has beautiful design and great API
</div>

## Donation.

### If you like this open source project you can support me using <a href="https://buy.stripe.com/9AQcQo6G57dyexGeUU">Stripe link</a> 💙

### Used by

- <a href="https://tapflow.co/">Tapflow - The perfect tool for building and selling online courses</a>
- <a href="https://equalize.team">Equalize.team</a>
- <a href="https://yopage.co/">Yopage.co - blogging platform</a>

### License

MIT LICENSE
