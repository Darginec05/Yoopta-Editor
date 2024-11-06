import YooptaEditor, { createYooptaEditor, EmailOptions, YooEditor, YooptaContentValue } from '@yoopta/editor';
import EmailBuilder, { EmailPreview } from '@yoopta/email-builder';
import { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import copy from 'copy-to-clipboard';
import { EMAIL_EDITOR_DEFAULT_VALUE } from './defaultEditorValue';

const emailOptions: EmailOptions = {
  head: {
    styles: [
      {
        id: 'font-inter',
        content: `@font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
        }
        * {
          font-family: 'Inter', sans-serif;
        }`,
      },
      {
        content: `blockquote, h1, h2, h3, img, li, ol, p, ul {
          margin-top: 0;
          margin-bottom: 0;
        }`,
      },
    ],
    meta: [
      { content: 'width=device-width', name: 'viewport' },
      { charset: 'UTF-8' },
      { content: 'IE=edge', 'http-equiv': 'X-UA-Compatible' },
      { content: 'telephone=no,address=no,email=no,date=no,url=no', name: 'format-detection' },
      { content: 'light', name: 'color-scheme' },
      { content: 'light', name: 'supported-color-schemes' },
    ],
  },
  body: {
    attrs: {
      style: {
        margin: 0,
        // backgroundColor: '#fafafa',
        width: '100%',
        color: '#333',
      },
    },
  },
  container: {
    attrs: {
      style: {
        width: '600px',
        margin: '0 auto',
      },
    },
  },
};

const EmailExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>(EMAIL_EDITOR_DEFAULT_VALUE);
  const [recipientEmail, setRecipientEmail] = useState('devopsbanda@gmail.com');
  const [subject, setSubject] = useState('test email');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (data: YooptaContentValue) => {
    console.log('onChange', data);
    setValue(data);
  };

  const onCopy = () => {
    const emailString = editor.getEmail(value);
    copy(emailString);
    console.log('emailString', emailString);
    window.alert('Email content copied to clipboard');
  };

  const sendEmail = async () => {
    if (!recipientEmail) {
      console.warn('Please enter a recipient email address');
      return;
    }

    setIsLoading(true);

    const emailContent = editor.getEmail(value);
    console.log('emailContent', emailContent);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          html: emailContent,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.warn('Failed to send email. Please try again.');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <Button onClick={sendEmail} variant="outline">
          Send Email
        </Button>
      </div>
      <div>
        <EmailBuilder value={value} onChange={onChange} template={emailOptions} />
      </div>
    </div>
  );
};

export { EmailExample };
