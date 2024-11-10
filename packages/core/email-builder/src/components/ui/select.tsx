import * as SelectPrimitive from '@radix-ui/react-select';
import { useYooptaEditor } from '@yoopta/editor';
import { ArrowDownIcon, CheckIcon } from 'lucide-react';

const SelectRoot: typeof SelectPrimitive.Root = SelectPrimitive.Root;
const SelectValue: typeof SelectPrimitive.Value = SelectPrimitive.Value;

const SelectTrigger = ({ children, className }) => {
  return <SelectPrimitive.Trigger className={className}>{children}</SelectPrimitive.Trigger>;
};

const SelectContent = ({ children }) => {
  const editor = useYooptaEditor();

  return (
    <SelectPrimitive.Portal container={editor.refElement}>
      <SelectPrimitive.Content
        className="relative z-[120] max-h-96 min-w-[8rem] overflow-hidden rounded-md border-solid border-[#e3e3e3] bg-[#ffffff] text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
        position="popper"
        side="left"
        align="center"
        alignOffset={5}
        sideOffset={5}
        id="yoo-select-content"
      >
        <SelectPrimitive.Viewport className="p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectItem = ({ value, children, onChange }) => {
  return (
    <button
      type="button"
      className="yoopta-button relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-[#eeeeee] focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      onClick={(e) => onChange(value)}
    >
      <span className="capitalize flex justify-between items-center w-full">{children}</span>
    </button>
  );
};

type SelectProps = {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
  children?: React.ReactNode;
};

const Select = ({ options, onChange, value, children, className }: SelectProps) => {
  return (
    <SelectRoot value={value}>
      {children}
      <SelectContent>
        {options.map((option) => {
          const isCurrent = option.value === value;

          return (
            <SelectItem key={option.value} value={option.value} onChange={onChange}>
              {option.label}
              {isCurrent && <CheckIcon className="w-4 h-4 ml-2" />}
            </SelectItem>
          );
        })}
      </SelectContent>
    </SelectRoot>
  );
};

export { Select, SelectTrigger, SelectRoot, SelectValue, SelectContent, SelectItem };
