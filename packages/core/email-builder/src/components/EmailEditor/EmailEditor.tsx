import { Card } from '../ui/card';
import YooptaEditor, { YooEditor } from '@yoopta/editor';
import { getPlugins } from '../../utils/plugins';
import { TOOLS } from '../../utils/tools';
import { MARKS } from '../../utils/marks';
import { EmailBuilderProps } from '../../utils/types';

type EmailEditorProps = EmailBuilderProps & {
  editor: YooEditor;
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
}: EmailEditorProps) {
  return (
    <Card className="w-full h-[calc(100vh-8rem)] flex flex-col p-4 gap-4">
      <div className="flex-1">
        {/* <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full min-h-[500px] font-mono resize-none p-4"
          placeholder="Enter your email HTML content here..."
        /> */}
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
          className="w-full h-full min-h-[500px] font-mono resize-none p-4"
          width="100%"
          placeholder={placeholder || 'Start building your email...'}
          onChange={onChange}
          value={value}
        />
      </div>
    </Card>
  );
}
