import { Mail, Eye } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { ScreenSize, ScreenSizeSwitcher } from '../ScreenSizeSwitcher/ScreenSizeSwitcher';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

type View = 'editor' | 'preview';

type Props = {
  view: View;
  onViewChange: (view: View) => void;
  screenSize: ScreenSize;
  onScreenSizeChange: (size: ScreenSize) => void;
};

export function EmailHeader({ view, onViewChange, onScreenSizeChange, screenSize }: Props) {
  return (
    <header className="border-b">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <h1 className="text-xl font-semibold ml-2">Email Builder</h1>
            {view === 'preview' && (
              <>
                <Separator orientation="vertical" className="h-6 mx-4" />
                <ScreenSizeSwitcher size={screenSize} onSizeChange={onScreenSizeChange} />
              </>
            )}
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
              className={cn(
                'data-[state=on]:bg-background data-[state=on]:text-foreground',
                'transition-all duration-200',
              )}
            >
              <Mail className="h-4 w-4 mr-2" />
              Editor
            </ToggleGroupItem>
            <ToggleGroupItem
              value="preview"
              aria-label="Preview view"
              className={cn(
                'data-[state=on]:bg-background data-[state=on]:text-foreground',
                'transition-all duration-200',
              )}
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
