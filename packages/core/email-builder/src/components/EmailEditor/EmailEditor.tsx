import { Card } from '../ui/card';
import YooptaEditor, { EmailTemplateOptions, generateId, YooEditor } from '@yoopta/editor';
import { getPlugins } from '../../utils/plugins';
import { TOOLS } from '../../utils/tools';
import { MARKS } from '../../utils/marks';
import { EmailProps } from '../../utils/types';
import { useEffect, useMemo, useRef } from 'react';

type EmailEditorProps = EmailProps & {
  editor: YooEditor;
  template?: EmailTemplateOptions;
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
  template,
}: EmailEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Array.isArray(template?.head?.styles)) return;
    const styles = window.structuredClone(template?.head?.styles);

    styles.forEach((style) => {
      const styleElement = document.createElement('style');
      if (style.id) {
        styleElement.id = `yoopta-email-builder-${style.id}`;
      } else {
        style.id = generateId();
        styleElement.id = `yoopta-email-builder-${style.id}`;
      }

      styleElement.textContent = style.content;
      editorContainerRef.current?.appendChild(styleElement);
    });

    return () => {
      styles.forEach((style) => {
        if (style.id) {
          const styleElement = document.getElementById(`yoopta-email-builder-${style.id}`);
          styleElement?.remove();
        }
      });
    };
  }, [template?.head?.styles]);

  const containerStyle = template?.container?.attrs?.style;
  const bodyStyle = template?.body?.attrs?.style;

  return (
    <Card className="w-full h-[calc(100vh-8rem)] overflow-auto flex flex-col p-4 gap-4">
      <div ref={editorContainerRef} style={bodyStyle} className="flex-1">
        <YooptaEditor
          key={id}
          id={id}
          selectionBoxRoot={selectionBoxRoot}
          editor={editor}
          plugins={getPlugins({ media, sizes: { width: containerStyle?.width } })}
          tools={TOOLS}
          marks={MARKS}
          readOnly={readOnly}
          autoFocus={autoFocus}
          style={containerStyle}
          placeholder={placeholder || 'Start building your email...'}
          onChange={onChange}
          value={value}
        />
      </div>
    </Card>
  );
}
