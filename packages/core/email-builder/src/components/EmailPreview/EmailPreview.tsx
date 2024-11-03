import { YooEditor, YooptaContentValue } from '@yoopta/editor';
import { CSSProperties, useEffect, useRef, useState } from 'react';
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
};

const EmailPreview = ({ editor, value, className, style, screenSize }: EmailPreviewProps) => {
  const [debounceValue] = useDebounce(value, 1000);
  const [emailHTML, setEmailHTML] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('100%');

  useEffect(() => {
    const emailString = editor.getEmail(debounceValue, {
      head: {
        fonts: [
          '<link rel="preconnect" href="https://fonts.googleapis.com" />',
          '<link rel="preconnect" href="https://fonts.gstatic.com" />',
          `<link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet" />`,
        ],
      },
      body: {
        style: {
          width: `100%`,
        },
      },
    });

    setEmailHTML(emailString);
  }, [debounceValue]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // const resizeObserver = new ResizeObserver(() => {
    //   if (!iframe.contentWindow) return;
    //   const height = iframe.contentWindow.document.documentElement.scrollHeight;
    //   setIframeHeight(`${height}px`);
    // });

    // iframe.addEventListener('load', () => {
    //   if (!iframe.contentWindow) return;
    //   const height = iframe.contentWindow.document.documentElement.scrollHeight;
    //   setIframeHeight(`${height}px`);
    //   resizeObserver.observe(iframe.contentWindow.document.documentElement);
    // });

    // return () => {
    //   resizeObserver.disconnect();
    // };
  }, [emailHTML]);

  return (
    <Card className="w-full h-[calc(100vh-8rem)] overflow-auto bg-white flex items-center justify-center">
      <div
        className={`mx-auto transition-all duration-300 ${
          screenSize === 'mobile' ? 'w-[375px]' : 'w-full max-w-[800px]'
        }`}
      >
        <iframe
          ref={iframeRef}
          srcDoc={emailHTML}
          title="Email Preview"
          className="w-full border-none bg-white"
          style={{ height: iframeHeight }}
          sandbox="allow-same-origin"
        />
      </div>
    </Card>
  );
};

export { EmailPreview };
