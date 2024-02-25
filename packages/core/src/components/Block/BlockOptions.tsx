import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import TurnIcon from './icons/turn.svg';
import { TrashIcon, CopyIcon, Link2Icon } from '@radix-ui/react-icons';
import React from 'react';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={4}
      side="left"
      align="start"
      className="bg-[#fff] min-w-[200px] w-auto z-50 overflow-hidden rounded-md border bg-popover py-[6px] px-0 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      {...props}
    />
  </DropdownMenuPortal>
));

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={
      'relative flex cursor-default select-none items-center text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    }
    {...props}
  />
));

const BlockOptions = ({ isOpen, onOpenChange, trigger }) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button
              type="button"
              className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              type="button"
              className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            >
              <CopyIcon className="w-4 h-4 mr-2" />
              Duplicate
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              type="button"
              className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            >
              <TurnIcon className="w-4 h-4 mr-2" />
              Turn into
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              type="button"
              className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            >
              <Link2Icon className="w-4 h-4 mr-2" />
              Copy link to block
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { BlockOptions };
