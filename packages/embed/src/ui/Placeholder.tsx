import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { CodeIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { EmbedUploader } from './EmbedUploader';

const Placeholder = ({ attributes, children, blockId }) => {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    open: isUploaderOpen,
    onOpenChange: setIsUploaderOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  return (
    <div className="w-full user-select-none m-[20px_0_10px] relative flex" {...attributes} contentEditable={false}>
      <button
        className={`p-[12px_36px_12px_12px] flex items-center text-left w-full overflow-hidden rounded-[3px] text-[14px] text-[rgba(55,53,47,0.65)] relative cursor-pointer border-none bg-[#efefef] transition-[background-color_100ms_ease-in] hover:bg-[#e3e3e3]`}
        onClick={() => setIsUploaderOpen(true)}
        ref={refs.setReference}
      >
        <CodeIcon className="mr-2 user-select-none" width={24} height={24} />
        <span className="font-medium">Click to add embed</span>
      </button>
      {isUploaderOpen && (
        <EmbedUploader
          blockId={blockId}
          floatingStyles={floatingStyles}
          refs={refs}
          onClose={() => setIsUploaderOpen(false)}
        />
      )}
      {children}
    </div>
  );
};

export { Placeholder };
