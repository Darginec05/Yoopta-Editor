import { useState } from 'react';
import { EmailPreview } from '../EmailPreview/EmailPreview';
import { EmailHeader } from '../EmailHeader/EmailHeader';
import { EmailEditor } from '../EmailEditor/EmailEditor';
import { EmailProps, EmailView } from '../../utils/types';

type EmailBuilderProps = EmailProps & {
  header?: null;
  view?: EmailView;
};

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
  editor,
  selectionBoxRoot = false,
}: EmailBuilderProps) {
  const [view, setView] = useState<EmailView>(viewProp);

  return (
    <div id="yoopta-email-builder" className="min-h-screen bg-background">
      {header !== null && <EmailHeader view={view} onViewChange={setView} />}

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
            template={editor.emailTemplate}
          />
        ) : (
          <EmailPreview value={value} template={editor.emailTemplate} editor={editor} />
        )}
      </main>
    </div>
  );
}

export { EmailBuilder };
