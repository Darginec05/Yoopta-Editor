import YooptaEditor, { createYooptaEditor, YooEditor, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useState } from 'react';
import { YOOPTA_PLUGINS } from '../../../../utils/yoopta/plugins';
import { MARKS } from '../../../../utils/yoopta/marks';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { TOOLS } from '@/utils/yoopta/tools';
import { useDebounce } from 'use-debounce';
import copy from 'copy-to-clipboard';
import { EMAIL_EDITOR_DEFAULT_VALUE } from './defaultEditorValue';

type ResultEmailProps = {
  editor: YooEditor;
  value: YooptaContentValue;
};

// @yoopta/email-builder
// DEFAULT-PLUGINS
// PRIVATE-PLUGINS
// THEMING
// BUILDER
// Email checker

const ResultEmail = ({ editor, value }: ResultEmailProps) => {
  const [debounceValue] = useDebounce(value, 1000);
  const [emailHTML, setEmailHTML] = useState<string>('');

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
          width: `700px`,
        },
      },
    });

    setEmailHTML(emailString);
  }, [debounceValue]);

  return (
    <div className="h-full bg-muted">
      <iframe
        srcDoc={emailHTML}
        className="w-full h-full bg-muted"
        style={{
          border: 'none',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};

type EditorProps = {
  editor: YooEditor;
  value: YooptaContentValue;
  onChange: (v: YooptaContentValue) => void;
};

const Editor = ({ editor, onChange, value }: EditorProps) => {
  const handleChange = (value: YooptaContentValue) => {
    onChange(value);
  };

  return (
    <YooptaEditor
      id="email"
      style={{
        width: '100%',
        paddingBottom: 100,
      }}
      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-[3.5rem] py-[1.5rem]"
      placeholder="Start building your email..."
      editor={editor}
      plugins={YOOPTA_PLUGINS}
      marks={MARKS}
      selectionBoxRoot={false}
      tools={TOOLS}
      value={value}
      onChange={handleChange}
    />
  );
};

const EmailPreview = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>(EMAIL_EDITOR_DEFAULT_VALUE);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('test email');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('value', value);

  const onChange = (data: YooptaContentValue) => {
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
    <div className="container relative py-8">
      <section>
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <div className="hidden h-full flex-col md:flex">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold text-nowrap">Email-Builder playground</h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end"></div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Button onClick={onCopy} variant="outline" className="mr-2">
                  Get email content
                </Button>
                <DialogTrigger asChild>
                  <Button variant="default">Send</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send Email</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient" className="text-right">
                        To
                      </Label>
                      <Input
                        id="recipient"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={sendEmail} disabled={isLoading}>
                      Send Email
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Separator />
            <Tabs defaultValue="editor/deserialized" className="flex-1">
              <div className="container h-full py-6">
                {/* <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]"> */}
                <div className="grid h-full items-stretch gap-6">
                  <div className="hidden flex-col space-y-4 sm:flex md:order-2"></div>
                  <div className="md:order-1">
                    <TabsContent value="editor" className="mt-0 border-0 p-0">
                      <div className="flex h-full flex-col space-y-4">
                        <Editor editor={editor} value={value} onChange={onChange} />

                        <div className="flex items-center space-x-2">
                          <Button onClick={onCopy}>Get email content</Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="editor/deserialized" className="mt-0 border-0 p-0">
                      <div className="flex flex-col space-y-4">
                        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                          <Editor editor={editor} value={value} onChange={onChange} />
                          <div className="rounded-md border">
                            <ResultEmail value={value} editor={editor} />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button onClick={onCopy}>Get email content</Button>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                          <Input
                            type="email"
                            placeholder="Recipient Email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                          />
                          <Button onClick={sendEmail}>Send email</Button>
                        </div> */}
                      </div>
                    </TabsContent>
                    <TabsContent value="deserialized" className="mt-0 border-0 p-0">
                      <div className="flex flex-col space-y-4">
                        <div className="grid h-full gap-6 lg:grid-cols-2">
                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-1 flex-col space-y-2">
                              <Label htmlFor="input">Input</Label>
                              {/* <Editor editor={editor} value={value} onChange={onChange} /> */}
                            </div>
                          </div>
                          <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button onClick={onCopy}>Get email</Button>
                          <Button variant="secondary">
                            {/* @ts-ignore */}
                            <CounterClockwiseClockIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export { EmailPreview };
