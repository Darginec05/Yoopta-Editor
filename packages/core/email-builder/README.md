# @yoopta/email-builder

Open-source email-builder built on top of the Yoopta-Editor

## Installation

```javascript
npm install @yoopta/email-builder slate slate-react
# or
yarn add @yoopta/email-builder slate slate-react
# or
pnpm add @yoopta/email-builder slate slate-react
```

## Quick Start

```javascript
import EmailBuilder, { createYooptaEmailEditor } from '@yoopta/email-builder';
import type { YooptaEmailEditor, EmailTemplateOptions } from '@yoopta/email-builder';

// Define your email template options
const templateOptions: EmailTemplateOptions = {
  head: {
    styles: [
      {
        id: 'font',
        content: `body { font-family: Verdana, sans-serif; }`,
      },
    ],
    meta: [{ content: 'width=device-width', name: 'viewport' }, { charset: 'UTF-8' }],
  },
  body: {
    attrs: {
      style: {
        backgroundColor: '#fafafa',
        width: '900px',
        margin: '0 auto',
      },
    },
  },
  container: {
    attrs: {
      style: {
        width: 600,
        margin: '0 auto',
      },
    },
  },
};

function EmailBuilderExample() {
  // Initialize the editor
  const editor = useMemo(() => createYooptaEmailEditor({ template: templateOptions }), []);
  const [value, setValue] = useState({});

  return (
    <EmailBuilder
      editor={editor}
      value={value}
      onChange={setValue}
      media={{
        image: {
          upload: async (file) => {
            // Your image upload logic
            return imageUrl;
          },
        },
        // ... other media handlers
      }}
    />
  );
}
```

## Core Concepts

### Email Template Options

The email template options define the structure and styling of your email:

```javascript
type EmailTemplateOptions = {
  head?: {
    styles?: Array<{
      id?: string,
      content: string,
    }>,
    meta?: Array<{
      content?: string,
      name?: string,
      charset?: string,
      httpEquiv?: string,
      property?: string,
    }>,
  },
  body?: {
    attrs?: {
      style?: Record<string, string | number>,
      [key: string]: any,
    },
  },
  container?: {
    attrs?: {
      style?: Record<string, string | number>,
      [key: string]: any,
    },
  },
};
```

### Media Handlers

The email builder supports various media types through upload handlers:

```javascript
type MediaUploaders = {
  image?: {
    upload: (file: File) => Promise<string>,
  },
  video?: {
    upload: (file: File) => Promise<string>,
    uploadPoster: (file: File) => Promise<string>,
  },
  file?: {
    upload: (file: File) => Promise<string>,
  },
};
```

## Components

### EmailBuilder

The main component that combines the editor and preview functionality.

```ts
type EmailBuilderProps = {
  editor: YooptaEmailEditor;
  value: YooptaContentValue;
  onChange: (value: YooptaContentValue) => void;
  media?: MediaUploaders;
  header?: null;
  view?: 'editor' | 'preview';
  readOnly?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  selectionBoxRoot?: HTMLElement | false;
};
```

### EmailEditor

The editing interface component.

```ts
type EmailEditorProps = {
  id: string;
  editor: YooEditor;
  value: YooptaContentValue;
  onChange: (value: YooptaContentValue) => void;
  media?: MediaUploaders;
  template?: EmailTemplateOptions;
  readOnly?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  selectionBoxRoot?: HTMLElement | false;
};
```

### EmailPreview

The preview component that shows how the email will look.

```ts
type EmailPreviewProps = {
  editor: YooEditor;
  value: YooptaContentValue;
  template?: EmailTemplateOptions;
  style?: React.CSSProperties;
  className?: string;
};
```

## Creating an Editor Instance

Use `createYooptaEmailEditor` to create a new editor instance with email capabilities:

```javascript
const editor = useMemo(() => createYooptaEmailEditor({
  template: EmailTemplateOptions;
}), []);
```

## Generating Email HTML

The editor instance provides a `getEmail` method to generate the final HTML:

```javascript
const emailHTML = editor.getEmail(value, template?);
```

## Best Practices

- **Email Template Structure**
- Always include viewport meta tag
- Define container width for better email client compatibility
- Use web-safe fonts or include font definitions
- **Styling**
- Use inline styles for better email client compatibility
- Test your email template across different email clients
- Keep the template width between 600-800px for optimal viewing
- **Media Handling**
- Ensure media upload handlers return absolute URLs
- Implement error handling for failed uploads
- Consider image size optimization for emails

## Example: Complete Email Builder Setup

```javascript
import EmailBuilder, { createYooptaEmailEditor, type EmailTemplateOptions } from '@yoopta/email-builder';

const templateOptions: EmailTemplateOptions = {
  head: {
    styles: [
      {
        id: 'font',
        content: `body { font-family: Verdana, sans-serif; }`,
      },
    ],
    meta: [
      { content: 'width=device-width', name: 'viewport' },
      { charset: 'UTF-8' },
      { content: 'IE=edge', httpEquiv: 'X-UA-Compatible' },
      { content: 'telephone=no,address=no,email=no,date=no,url=no', name: 'format-detection' },
      { content: 'light', name: 'color-scheme' },
    ],
  },
  body: {
    attrs: {
      style: {
        backgroundColor: '#fafafa',
        width: '900px',
        margin: '0 auto',
      },
    },
  },
  container: {
    attrs: {
      style: {
        width: 600,
        margin: '0 auto',
      },
    },
  },
};

function EmailBuilderExample() {
  const editor = useMemo(() => createYooptaEmailEditor({ template: templateOptions }), []);
  const [value, setValue] = useState({});

  // Example media upload handlers
  const mediaUploaders = {
    image: {
      upload: async (file: File) => {
        const url = await uploadImageToServer(file);
        return url;
      },
    },
    video: {
      upload: async (file: File) => {
        const url = await uploadVideoToServer(file);
        return url;
      },
      uploadPoster: async (file: File) => {
        const url = await uploadPosterToServer(file);
        return url;
      },
    },
    file: {
      upload: async (file: File) => {
        const url = await uploadFileToServer(file);
        return url;
      },
    },
  };

  return (
    <div className="w-full p-10">
      <EmailBuilder editor={editor} value={value} onChange={setValue} media={mediaUploaders} />
    </div>
  );
}
```

## API Reference

For detailed API reference, please refer to the TypeScript definitions included in the package.

## Contributing

Contributions are welcome! Please read our contributing guide for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

More and more Email components will be available soon.
As well as many other tools for more efficient work with the Email-Builder 😼

## Sponsorship

But we can't do it without your support! If Yoopta has helped you in your work, please consider [sponsoring the project](https://github.com/sponsors/Darginec05). Your contribution is of great importance and helps us to continue to innovate. 💕
