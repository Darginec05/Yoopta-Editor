import { EmailTemplateOptions, YooEditor, YooptaContentValue } from '@yoopta/editor';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Card } from '../ui/card';

type EmailPreviewProps = {
  editor: YooEditor;
  value: YooptaContentValue;
  style?: CSSProperties;
  className?: string;
  template?: EmailTemplateOptions;
};

const EmailPreview = ({ editor, value, template }: EmailPreviewProps) => {
  const [debounceValue] = useDebounce(value, 1000);
  const [emailHTML, setEmailHTML] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const emailString = editor.getEmail(debounceValue);
    setEmailHTML(emailString);
  }, [debounceValue]);

  const bodyStyle = template?.body?.attrs?.style;

  return (
    <Card className="w-full p-4 h-[calc(100vh-8rem)] overflow-auto bg-white flex items-center justify-center">
      <div className={`duration-300 h-full`} style={bodyStyle}>
        <iframe
          ref={iframeRef}
          srcDoc={emailHTML}
          title="Email Preview"
          className="w-full border-none bg-white"
          style={{ height: '100%' }}
          sandbox="allow-same-origin"
        />
      </div>
    </Card>
  );
};

export { EmailPreview };
