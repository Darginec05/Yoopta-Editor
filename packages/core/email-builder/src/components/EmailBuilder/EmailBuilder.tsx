import { useMemo, useState } from 'react';
import { createYooptaEditor, EmailOptions } from '@yoopta/editor';
import { EmailPreview } from '../EmailPreview/EmailPreview';
import copy from 'copy-to-clipboard';
import { EmailHeader } from '../EmailHeader/EmailHeader';
import { EmailEditor } from '../EmailEditor/EmailEditor';
import { EmailProps, EmailView } from '../../utils/types';
import { ScreenSize } from '../ScreenSizeSwitcher/ScreenSizeSwitcher';

type EmailBuilderProps = EmailProps & {
  header?: null;
  view?: EmailView;
  template?: EmailOptions;
};

type MailFields = {
  recipientEmail: string;
  subject: string;
};

// @yoopta/email-builder
// DEFAULT-PLUGINS
// PRIVATE-PLUGINS
// THEMING
// BUILDER
// Email checker
function EmailBuilder({
  id,
  value,
  style,
  onChange,
  readOnly,
  autoFocus,
  className,
  placeholder,
  media,
  header,
  view: viewProp = 'editor',
  editor: editorProps,
  selectionBoxRoot = false,
  template,
}: EmailBuilderProps) {
  const editor = useMemo(() => editorProps || createYooptaEditor(), [editorProps]);
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [view, setView] = useState<EmailView>(viewProp);
  const onScreenSizeChange = (v: ScreenSize) => setScreenSize(v);

  return (
    <div id="yoopta-email-builder" className="min-h-screen bg-background">
      {header !== null && (
        <EmailHeader
          view={view}
          onViewChange={setView}
          screenSize={screenSize}
          onScreenSizeChange={onScreenSizeChange}
        />
      )}

      <main className="mx-auto py-0">
        {view === 'editor' ? (
          <EmailEditor
            id={id}
            value={value}
            onChange={onChange}
            editor={editor}
            readOnly={readOnly}
            autoFocus={autoFocus}
            placeholder={placeholder}
            selectionBoxRoot={selectionBoxRoot}
            className={className}
            style={style}
            media={media}
            emailOptions={template}
          />
        ) : (
          <EmailPreview value={value} template={template} editor={editor} screenSize={screenSize} />
        )}
      </main>
    </div>
  );
}

export { EmailBuilder };
