import { Mail, Eye, FilePenIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { cn } from '../../lib/utils';
import { EmailTemplateOptions } from '@yoopta/editor';

type View = 'editor' | 'preview';

type Props = {
  view: View;
  onViewChange: (view: View) => void;
  template?: EmailTemplateOptions;
};

export function EmailHeader({ view, template, onViewChange }: Props) {
  const { width, maxWidth } = template?.container?.attrs?.style || {};

  return (
    <header className="border-b min-w-[550px] max-w-[800px]" style={{ width, maxWidth, margin: '0 auto' }}>
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Yoopta Email-Builder</h1>
          </div>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && onViewChange(v as 'editor' | 'preview')}
            className="bg-muted p-1 rounded-md"
          >
            <ToggleGroupItem
              value="editor"
              aria-label="Editor view"
              className={cn('data-[state=on]:bg-[#fff] data-[state=on]:text-foreground', 'transition-all duration-200')}
            >
              <FilePenIcon className="h-4 w-4 mr-2" />
              Editor
            </ToggleGroupItem>
            <ToggleGroupItem
              value="preview"
              aria-label="Preview view"
              className={cn('data-[state=on]:bg-[#fff] data-[state=on]:text-foreground', 'transition-all duration-200')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </header>
  );
}
