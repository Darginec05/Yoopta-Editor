import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useFloating, offset, flip, shift, inline, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import { ReactNode, useState } from 'react';
import { BlockOptions } from '../BlockOptions/BlockOptions';
import { useYooptaReadOnly } from '../../contexts/YooptaContext/YooptaContext';

type Props = { className?: string; style?: React.CSSProperties; onClick?: () => void; children: ReactNode };

const ExtendedBlockActions = ({ className, style, onClick, children }: Props) => {
  const isReadOnly = useYooptaReadOnly();
  const [isBlockOptionsOpen, setIsBlockOptionsOpen] = useState(false);
  const {
    refs: blockOptionRefs,
    floatingStyles: blockOptionFloatingStyles,
    context,
  } = useFloating({
    placement: 'bottom-start',
    open: isBlockOptionsOpen,
    onOpenChange: setIsBlockOptionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: blockOptionsTransitionStyles } = useTransitionStyles(context, {
    duration: 100,
  });

  const onDotsClick = () => {
    onClick?.();
    setIsBlockOptionsOpen(true);
  };

  const blockOptionsStyle = { ...blockOptionsTransitionStyles, ...blockOptionFloatingStyles };

  if (isReadOnly) return null;

  return (
    <>
      {isMounted && (
        <BlockOptions
          isOpen
          onClose={() => setIsBlockOptionsOpen(false)}
          refs={blockOptionRefs}
          style={blockOptionsStyle}
        >
          {children}
        </BlockOptions>
      )}
      <button
        type="button"
        ref={blockOptionRefs.setReference}
        className={`absolute right-[8px] top-[8px] flex items-center justify-between z-10 opacity-1 bg-[#eee] w-[22px] h-[22px] transition-opacity duration-150 ease-in border-none cursor-pointer rounded-[2px] p-[0_4px] ${
          className || ''
        } yoopta-extended-block-actions`}
        onClick={onDotsClick}
        style={isBlockOptionsOpen ? { ...style, opacity: 1 } : style}
      >
        <DotsHorizontalIcon />
      </button>
    </>
  );
};

export { ExtendedBlockActions };
