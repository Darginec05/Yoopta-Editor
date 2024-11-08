import YooptaEditor, { createYooptaEditor, EmailTemplateOptions, YooEditor, YooptaContentValue } from '@yoopta/editor';
import EmailBuilder, { EmailPreview, createYooptaEmailEditor, YooptaEmailEditor } from '@yoopta/email-builder';
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
import { uploadToCloudinary } from '@/utils/cloudinary';

const templateEmailOptions: EmailTemplateOptions = {
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
      { content: 'IE=edge', 'http-equiv': 'X-UA-Compatible' },
      { content: 'telephone=no,address=no,email=no,date=no,url=no', name: 'format-detection' },
      { content: 'light', name: 'color-scheme' },
      { content: 'light', name: 'supported-color-schemes' },
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

const EmailExample = () => {
  const editor: YooptaEmailEditor = useMemo(() => createYooptaEmailEditor({ template: templateEmailOptions }), []);
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

  const onImageUpload = async (file: File) => {
    const response = await uploadToCloudinary(file);
    return {
      src: response.secure_url,
      sizes: {
        width: response.width,
        height: response.height,
      },
    };
  };

  const onVideoUpload = async (file: File) => {
    const response = await uploadToCloudinary(file, 'video');
    return {
      src: response.secure_url,
      sizes: {
        width: response.width,
        height: response.height,
      },
    };
  };

  const onVideoUploadPoster = async (file: File) => {
    const response = await uploadToCloudinary(file);
    return response.url;
  };

  const onFileUpload = async (file: File) => {
    const response = await uploadToCloudinary(file, 'auto');

    return {
      src: response.secure_url,
      format: response.format,
      name: response.name,
      size: response.bytes,
    };
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <Button onClick={sendEmail} variant="outline">
          Send Email
        </Button>
      </div>
      <div className="w-full">
        <Button onClick={onCopy} variant="outline">
          Copy
        </Button>
      </div>
      <div>
        <EmailBuilder
          editor={editor}
          value={value}
          onChange={onChange}
          media={{
            image: {
              upload: onImageUpload,
            },
            video: {
              upload: onVideoUpload,
              uploadPoster: onVideoUploadPoster,
            },
            file: {
              upload: onFileUpload,
            },
          }}
        />
      </div>
    </div>
  );
};

export { EmailExample };
