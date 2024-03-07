import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { VideoIcon } from '@radix-ui/react-icons';
import { CSSProperties, useState } from 'react';
import { VideoUploader } from './VideoUploader';
import { Loader } from './Loader';

const Placeholder = ({ attributes, children, blockId }) => {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    open: isUploaderOpen,
    onOpenChange: setIsUploaderOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  const loadingStyles: CSSProperties = {
    width: '100%',
    transition: 'width 100ms ease-in',
  };

  const onSetLoading = (slate: boolean) => setLoading(slate);

  return (
    <div className="w-full user-select-none m-[20px_0_10px] relative flex" {...attributes} contentEditable={false}>
      <button
        className={`p-[12px_36px_12px_12px] flex items-center text-left w-full overflow-hidden rounded-[3px] text-[14px] text-[rgba(55,53,47,0.65)] relative cursor-pointer border-none bg-[#efefef] transition-[background-color_100ms_ease-in] hover:bg-[#e3e3e3]`}
        onClick={() => setIsUploaderOpen(true)}
        disabled={loading}
        ref={refs.setReference}
      >
        {loading ? (
          <Loader className="mr-2 user-select-none" width={24} height={24} />
        ) : (
          <VideoIcon className="mr-2 user-select-none" width={24} height={24} />
        )}
        <span className="font-medium">{loading ? 'Loading...' : 'Click to add video'}</span>
        {loading && <div className="absolute top-0 left-0 h-full bg-[rgba(55,53,47,0.16)]" style={loadingStyles} />}
      </button>
      {isUploaderOpen && (
        <VideoUploader
          blockId={blockId}
          floatingStyles={floatingStyles}
          refs={refs}
          onClose={() => setIsUploaderOpen(false)}
          onSetLoading={onSetLoading}
        />
      )}
      {children}
    </div>
  );
};

export { Placeholder };
