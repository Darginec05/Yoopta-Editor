import { YoptaComponent, YoptaEditor } from '@yopta/editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code from '@yopta/code';
import Link from '@yopta/link';
import Lists from '@yopta/lists';
import Headings from '@yopta/headings';
import Image from '@yopta/image';
import Video from '@yopta/video';
import ActionMenu from '@yopta/action-menu-list';
import { useMemo, useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import { uploadToCloudinary } from '../../utils';

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  const uploadVideo = ({ uploadFile, title }) =>
    new Promise((resolve, reject) => {
      const upload = new tus.Upload(file, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
          AuthorizationSignature: '66e7cb0af0dbaa0b9e7fb72614cb3e0e3f095cd360af2df8625bbb291b4a4736',
          AuthorizationExpire: 1672471001,
          VideoId: '0103ac17-2355-4f7d-8e59-91d441721a04',
          LibraryId: '71252',
        },
        metadata: {
          filetype: uploadFile.type,
          title, // file.title
        },
        onError: function (error) {
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {},
        onSuccess: function (data) {
          console.log('success upload video', data);
          resolve(data);
          // Video.updateNode({ options: { loading: 15 } })
        },
      });
      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
      });
    });

  const onChange = () => {};

  const components = useMemo<YoptaComponent[]>(() => {
    return [
      // Blockquote.extend({ renderer: (editor) => (props) => <div {...props.attributes}>{props.children}</div> }),
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
      Image.extend({
        options: {
          onChange: async (file: File) => {
            console.log({ file });

            const data = await uploadToCloudinary(file, 'image');
            return data;
          },
        },
      }),
      Video,
      // ChatGPT.extend({
      //   API_KEY: process.env.CHAT_GPT,
      // }),
      // // OverriredVideo,
      // Video.extend({
      //   API_KEY: '',
      //   onChange: uploadVideo,
      //   editorRenderer: (editor) => (props) => {
      //     // { attrs, children, element } = props;
      //     const onChange = () => {
      //       return { url, 'adad' };
      //     };

      //     element.options.loading;
      //     element.options.url;
      //     element.options.error;

      //     if (element.options.loading) {
      //       return <div>{element.options.loading}</div>;
      //     }

      //     return (
      //       <div>
      //         <div>super video</div>
      //       </div>
      //     );
      //   },
      // }),
    ];
  }, []);

  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        className={s.editor}
        shouldStoreInLocalStorage={{ name: 'yopta-dev' }}
        components={components}
      >
        <ActionMenu
          items={components}
          groupRender={(props) => <div>asdasdasd</div>}
          itemRender={(props) => <div>asdasd</div>}
          trigger="/"
        />
      </YoptaEditor>
      <pre className={s.editor} style={{ display: 'block', padding: '0 64px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(editorValue, null, 2)}
      </pre>
    </div>
  );
};

export default BasicExample;
