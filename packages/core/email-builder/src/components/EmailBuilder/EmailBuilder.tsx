import { useMemo, useState } from 'react';
import { createYooptaEditor } from '@yoopta/editor';
import { EmailPreview } from '../EmailPreview/EmailPreview';
import copy from 'copy-to-clipboard';
import { Header } from '../Header/Header';
import { EmailEditor } from '../EmailEditor/EmailEditor';
import { EmailBuilderProps } from '../../utils/types';
import { ScreenSize } from '../ScreenSizeSwitcher/ScreenSizeSwitcher';

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
  editor: editorProps,
  selectionBoxRoot = false,
}: EmailBuilderProps) {
  const editor = useMemo(() => editorProps || createYooptaEditor(), [editorProps]);
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [view, setView] = useState<'editor' | 'preview'>('editor');

  const onCopy = () => {};
  const onScreenSizeChange = (v: ScreenSize) => setScreenSize(v);

  return (
    <div id="yoopta-email-builder" className="min-h-screen bg-background">
      <Header view={view} onViewChange={setView} screenSize={screenSize} onScreenSizeChange={onScreenSizeChange} />

      <main className="mx-auto py-6">
        {view === 'editor' ? (
          <EmailEditor
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
          />
        ) : (
          <EmailPreview value={value} editor={editor} screenSize={screenSize} />
        )}
      </main>
    </div>
  );
}

export { EmailBuilder };
