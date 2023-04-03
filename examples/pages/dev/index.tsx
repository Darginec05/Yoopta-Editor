// const uploadVideo = ({ uploadFile, title }) =>
//   new Promise((resolve, reject) => {
//     const upload = new tus.Upload(file, {
//       endpoint: 'https://video.bunnycdn.com/tusupload',
//       retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
//       headers: {
//         AuthorizationSignature: '66e7cb0af0dbaa0b9e7fb72614cb3e0e3f095cd360af2df8625bbb291b4a4736',
//         AuthorizationExpire: 1672471001,
//         VideoId: '0103ac17-2355-4f7d-8e59-91d441721a04',
//         LibraryId: '71252',
//       },
//       metadata: {
//         filetype: uploadFile.type,
//         title, // file.title
//       },
//       onError: function (error) {
//         reject(error);
//       },
//       onProgress: function (bytesUploaded, bytesTotal) {},
//       onSuccess: function (data) {
//         console.log('success upload video', data);
//         resolve(data);
//         // Video.updateNode({ options: { loading: 15 } })
//       },
//     });
//     // Check if there are any previous uploads to continue.
//     upload.findPreviousUploads().then(function (previousUploads) {
//       // Found previous uploads so we select the first one.
//       if (previousUploads.length) {
//         upload.resumeFromPreviousUpload(previousUploads[0]);
//       }

//       // Start the upload
//       upload.start();
//     });
//   });

import { cx, YoptaPlugin, YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code from '@yopta/code';
import Link from '@yopta/link';
import Lists from '@yopta/lists';
import Headings from '@yopta/headings';
import Image, { ImageOptions } from '@yopta/image';
import Video from '@yopta/video';
import Toolbar from '@yopta/toolbar';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yopta/marks';
import ActionMenu, { ActionMenuComponentItem, ActionRenderItemProps } from '@yopta/action-menu-list';
import { useMemo, useState } from 'react';
import EmbedIcon from './icons/embed.svg';
import ImageIcon from './icons/image.svg';
import VideoIcon from './icons/video.svg';
import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';
import s from './styles.module.scss';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar';
import { MediumToolbar } from '../../components/Toolbars/MediumToolbar';

const CustomSuggestionList = (props: ActionRenderItemProps) => {
  return (
    <div {...props.getRootProps()} className={s.dropdown}>
      <div {...props.getListProps()} className={s.elementList}>
        {props.items.map((item, i) => {
          const { focusableElement, menuItem, ...itemProps } = props.getItemsProps(item, i);
          const isFocusable = i === focusableElement;

          return (
            <div
              key={item.type}
              {...itemProps}
              className={cx(s.elementListItem, {
                [s.hovered]: i === focusableElement,
              })}
            >
              <button className={s.button}>
                {item.icon} <span>{item.label || item.type}</span>
              </button>
            </div>
          );
        })}
        {props.items.length === 0 && <div className={s.button}>Not found</div>}
      </div>
    </div>
  );
};

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  const plugins = useMemo<YoptaPlugin[]>(() => {
    return [
      Paragraph,
      Blockquote,
      Callout,
      Code,
      Link,
      Lists.NumberedList,
      Lists.BulletedList,
      Lists.TodoList,
      Headings.HeadingOne,
      Headings.HeadingTwo,
      Headings.HeadingThree,
      Image.extend<ImageOptions>({
        options: {
          maxWidth: 750,
          maxHeight: 800,
          onChange: async (file: File) => {
            const data = await uploadToCloudinary(file, 'image');
            return data;
          },
        },
      }),
      Video.extend({
        options: {
          maxWidth: 750,
          maxHeight: 800,
          onChange: async (file: File) => {
            const data = await uploadToCloudinary(file, 'video');
            return data;
          },
        },
      }),
    ];
  }, []);

  const actionItems: ActionMenuComponentItem[] = [
    { component: Image, icon: <ImageIcon />, label: 'Image', searchString: 'image picture' },
    { component: Video, icon: <VideoIcon />, label: 'Video', searchString: 'video media' },
    { component: Headings.HeadingOne, icon: <EmbedIcon />, label: 'Title', searchString: 'h1 title' },
    { component: Headings.HeadingTwo, icon: <EmbedIcon />, label: 'Subtitle', searchString: 'h2 subtitle' },
    { component: Paragraph, icon: <EmbedIcon />, label: 'Text', searchString: 'text paragraph' },
    { component: Blockquote, icon: <VideoIcon />, label: 'Blockquote' },
    { component: Callout, label: 'Callout' },
    { component: Code, label: 'Super code', searchString: 'hello world' },
    { component: Lists.BulletedList, label: 'Bulleted list' },
    { component: Lists.NumberedList, label: 'Numbered list' },
    { component: Lists.TodoList, label: 'Check list', searchString: 'todo check list' },
  ];

  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        plugins={plugins}
        marks={[Bold, Italic, CodeMark, Underline, Strike]}
        shouldStoreInLocalStorage={{ name: 'yopta-dev' }}
        readOnly={false}
      >
        <ActionMenu trigger="/" render={CustomSuggestionList} items={actionItems} />
        <Toolbar type="bubble">{MediumToolbar}</Toolbar>
      </YoptaEditor>
      <pre className={s.editor} style={{ display: 'block', padding: '0 64px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(editorValue, null, 2)}
      </pre>
    </div>
  );
};

export default BasicExample;
