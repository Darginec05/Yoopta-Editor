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
        className={`yoo-editor-absolute yoo-editor-right-[8px] yoo-editor-top-[8px] yoo-editor-flex yoo-editor-items-center yoo-editor-justify-between yoo-editor-z-10 yoo-editor-opacity-1 yoo-editor-bg-[#eee] yoo-editor-w-[22px] yoo-editor-h-[22px] yoo-editor-transition-opacity yoo-editor-duration-150 yoo-editor-ease-in yoo-editor-border-none yoo-editor-cursor-pointer yoo-editor-rounded-[2px] yoo-editor-p-[0_4px] ${
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
