import YooptaEditor, { createYooptaEditor, YooEditor, YooptaContentValue } from '@yoopta/editor';
import parsers from '@yoopta/exports';
import s from './EmailPreview.module.scss';

import { BasicSetupOptions } from '@uiw/react-codemirror';
import { useEffect, useMemo, useState } from 'react';

import NextLink from 'next/link';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import { MARKS } from '../../../../utils/yoopta/marks';

type EditorProps = {
  editor: YooEditor;
  onChange: (code: YooptaContentValue) => void;
};

const Editor = ({ editor, onChange }: EditorProps) => {
  useEffect(() => {
    editor.on('change', (value) => {
      onChange(value);
    });
  }, []);

  return (
    <div className="w-1/2 ml-1 ">
      <p className="my-2">Type some content here and see the html on the left side (Serializing 🎉)</p>
      <div className="bg-[#30363d]">
        <div className={s.previewBox}>
          <YooptaEditor
            id="html"
            editor={editor}
            className={s.preview}
            plugins={YOOPTA_PLUGINS}
            marks={MARKS}
            autoFocus={false}
            selectionBoxRoot={false}
            placeholder="Write content..."
            style={{
              width: '100%',
              paddingBottom: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

type ResultProps = {
  value: YooptaContentValue;
  editor: YooEditor;
};

const ResultEmail = ({ editor, value }: ResultProps) => {
  const email = editor.getEmail(value);
  console.log(email);

  return (
    <div className="w-1/2 mr-1 relative">
      <p className="my-2">Type some html here and see the result on the right side (Deserializing 🎊)</p>
      <div className={s.commentBox}>
        <div dangerouslySetInnerHTML={{ __html: email }} />
      </div>
    </div>
  );
};

const EmailPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>({});

  const onChange = (data: YooptaContentValue) => setValue(data);

  return (
    <>
      <div className="w-full p-0 m-0 min-h-[100vh] overflow-hidden px-2">
        <NextLink href="/examples/withExports" className="text-blue-500 underline">
          Back to examples
        </NextLink>
        <h1 className="text-center my-4 mx-auto scroll-m-20 text-3xl font-bold tracking-tight p-2 sm:p-0 sm:max-w-[60%]">
          This example shows how <b>html</b> deserialize/serialize methods from <b>@yoopta/exports</b> work
        </h1>
        <div className="h-full">
          <div className="flex h-full">
            <Editor onChange={onChange} editor={editor} />
            <ResultEmail value={value} editor={editor} />
          </div>
        </div>
      </div>
    </>
  );
};

export { EmailPreview };
