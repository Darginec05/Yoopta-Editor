// import { Inter } from 'next/font/google';
import { CSSProperties, ReactNode, useState } from 'react';
import YooptaEditor, {
  createYooptaPlugin,
  generateId,
  YooptaBaseElement,
  RenderYooptaElementProps,
} from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { YooptaValue } from '@/utils/initialData';
import { AccordionPlugin } from '@/components/CustomAccordeonPlugin/CustomAccordeonPlugin';
import { Transforms } from 'slate';

/** Custom plugin */
export type DividerElement = YooptaBaseElement<'divider'>;

type DividerRenderProps = RenderYooptaElementProps<DividerElement>;

const dividerRootStyles: CSSProperties = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  position: 'relative',
};

const dividerStyles: CSSProperties = {
  position: 'absolute',
  width: '100%',
};

const DividerRender = ({ attributes, element, children, HTMLAttributes }: DividerRenderProps) => {
  return (
    <div {...attributes} contentEditable={false} style={dividerRootStyles}>
      <hr style={dividerStyles} />
      {children}
    </div>
  );
};

const Divider = createYooptaPlugin<any, DividerElement>({
  type: 'divider',
  shortcut: ['---', 'divider'],
  renderer: () => DividerRender,
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === Divider.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  defineElement: (): DividerElement => ({
    id: generateId(),
    type: 'divider',
    nodeType: 'void',
    children: [{ text: '' }],
  }),
  createElement: (editor, elementData) => {
    const node: DividerElement = { ...Divider.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    html: {
      serialize: (node, children) => {
        return `<hr />`;
      },
      deserialize: {
        nodeName: 'HR',
      },
    },
  },
  options: {
    searchString: 'divider',
    displayLabel: 'Divider',
  },
});
/** */

const plugins = [
  AccordionPlugin,
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Code,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  Divider,
  Embed.extend({
    options: {
      maxWidth: 650,
      maxHeight: 750,
    },
  }),
  Image.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'image');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
  Video.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'video');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
];

const TOOLS = {
  Toolbar: <Toolbar type="bubble" />,
  ActionMenu: <ActionMenu />,
};

const INITIAL_VALUE: YooptaValue[] = [
  { id: generateId(), type: 'paragraph', nodeType: 'block', children: [{ text: 'Example in progress...' }] },
];

export default function WithCustomPlugin() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(INITIAL_VALUE);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline="withCustomPlugin"
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}
