import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useFloating, offset, flip, shift, inline, autoUpdate } from '@floating-ui/react';
import { ReactNode, useState } from 'react';
import { BlockOptions } from '../BlockOptions/BlockOptions';

type Props = { className?: string; style?: React.CSSProperties; onClick?: () => void; children: ReactNode };

const ExtendedBlockActions = ({ className, style, onClick, children }: Props) => {
  const [isBlockOptionsOpen, setIsBlockOptionsOpen] = useState(false);
  const { refs: blockOptionRefs, floatingStyles: blockOptionFloatingStyles } = useFloating({
    placement: 'bottom-start',
    open: isBlockOptionsOpen,
    onOpenChange: setIsBlockOptionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const onDotsClick = () => {
    onClick?.();
    setIsBlockOptionsOpen(true);
  };

  return (
    <>
      {isBlockOptionsOpen && (
        <BlockOptions
          isOpen={isBlockOptionsOpen}
          onClose={() => setIsBlockOptionsOpen(false)}
          refs={blockOptionRefs}
          floatingStyles={blockOptionFloatingStyles}
        >
          {children}
        </BlockOptions>
      )}
      <button
        type="button"
        ref={blockOptionRefs.setReference}
        className={`absolute right-[10px] top-[10px] flex items-center justify-between z-10 opacity-1 bg-[#eee] w-[22px] h-[22px] transition-opacity duration-150 ease-in border-none cursor-pointer rounded-[2px] p-[0_4px] ${className}`}
        onClick={onDotsClick}
        style={style}
      >
        <DotsHorizontalIcon />
      </button>
    </>
  );
};

export { ExtendedBlockActions };
