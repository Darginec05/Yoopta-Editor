import { Card } from '../ui/card';
import YooptaEditor, { EmailOptions, YooEditor } from '@yoopta/editor';
import { getPlugins } from '../../utils/plugins';
import { TOOLS } from '../../utils/tools';
import { MARKS } from '../../utils/marks';
import { EmailProps } from '../../utils/types';
import { useEffect, useMemo } from 'react';

type EmailEditorProps = EmailProps & {
  editor: YooEditor;
  emailOptions?: EmailOptions;
};

export function EmailEditor({
  id,
  value,
  editor,
  media,
  onChange,
  readOnly,
  autoFocus,
  placeholder,
  selectionBoxRoot,
  emailOptions,
}: EmailEditorProps) {
  useEffect(() => {
    const styles = emailOptions?.head?.styles;
    if (!styles?.length) return;

    styles.forEach((style) => {
      const styleElement = document.createElement('style');
      if (style.id) {
        styleElement.id = `email-editor-${style.id}`;
      }
      styleElement.textContent = style.content;
      document.head.appendChild(styleElement);
    });

    return () => {
      styles.forEach((style) => {
        if (style.id) {
          const styleElement = document.getElementById(`email-editor-${style.id}`);
          styleElement?.remove();
        }
      });
    };
  }, [emailOptions?.head?.styles]);

  const containerStyle = emailOptions?.container?.attrs?.style || {};

  const bodyStyle = useMemo(() => {
    return emailOptions?.body?.attrs?.style || {};
  }, [emailOptions?.body?.attrs?.style]);

  return (
    <Card className="w-full h-[calc(100vh-8rem)] overflow-auto flex flex-col p-4 gap-4">
      <div style={bodyStyle} className="flex-1">
        <YooptaEditor
          key={id}
          id={id}
          selectionBoxRoot={selectionBoxRoot}
          editor={editor}
          plugins={getPlugins({ media })}
          tools={TOOLS}
          marks={MARKS}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className="h-full"
          style={containerStyle}
          placeholder={placeholder || 'Start building your email...'}
          onChange={onChange}
          value={value}
        />
      </div>
    </Card>
  );
}
