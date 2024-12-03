import { Smartphone, Monitor } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export type ScreenSize = 'mobile' | 'desktop';

interface ScreenSizeSwitcherProps {
  size: ScreenSize;
  onSizeChange: (size: ScreenSize) => void;
}

export function ScreenSizeSwitcher({ size, onSizeChange }: ScreenSizeSwitcherProps) {
  return (
    <ToggleGroup type="single" value={size} onValueChange={(v) => onSizeChange(v as ScreenSize)}>
      <ToggleGroupItem value="mobile" aria-label="Mobile view" variant="outline">
        <Smartphone className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="desktop" aria-label="Desktop view" variant="outline">
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
