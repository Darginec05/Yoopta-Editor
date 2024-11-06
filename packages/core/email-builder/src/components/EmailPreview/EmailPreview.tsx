import { EmailOptions, YooEditor, YooptaContentValue } from '@yoopta/editor';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import copy from 'copy-to-clipboard';
import { Card } from '../ui/card';
import { ScreenSize } from '../ScreenSizeSwitcher/ScreenSizeSwitcher';

type EmailPreviewProps = {
  editor: YooEditor;
  value: YooptaContentValue;
  style?: CSSProperties;
  className?: string;
  screenSize: ScreenSize;
  template?: EmailOptions;
};

const EmailPreview = ({ editor, value, screenSize, template }: EmailPreviewProps) => {
  const [debounceValue] = useDebounce(value, 1000);
  const [emailHTML, setEmailHTML] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const emailString = editor.getEmail(debounceValue);
    setEmailHTML(emailString);
  }, [debounceValue]);

  useEffect(() => {
    const emailString = editor.getEmail(debounceValue, template);
    setEmailHTML(emailString);
  }, [debounceValue]);

  console.log('template', template);

  return (
    <Card className="w-full p-4 h-[calc(100vh-8rem)] overflow-auto bg-white flex items-center justify-center">
      <div
        className={`mx-autotransition-all duration-300 h-full ${screenSize === 'mobile' ? 'w-[375px]' : 'w-[full]'}`}
        style={template?.container?.attrs?.style}
      >
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
