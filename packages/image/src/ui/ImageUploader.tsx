import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { CSSProperties, useState } from 'react';
import { EmbedUploader } from './EmbedUploader';
import { FileUploader } from './FileUploader';

type Props = {
  floatingStyles: CSSProperties;
  refs: any;
  blockId: string;
  onClose: () => void;
};

type Tab = 'upload' | 'embed';

const ImageUploader = ({ floatingStyles, refs, onClose, blockId }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');

  const switchTab = (tab: Tab) => setActiveTab(tab);

  const isUploader = activeTab === 'upload';
  const isEmbed = activeTab === 'embed';

  const getTabStyles = (isActive) => ({
    borderBottom: isActive ? '2px solid #2483e2' : '2px solid transparent',
  });

  return (
    <FloatingPortal root={document.getElementById('yoopta-editor')}>
      <FloatingOverlay lockScroll className="z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col min-w-[540px] max-w-[calc(100vw-24px)] h-full max-h-[420px] bg-white shadow-[rgb(15_15_15_/5%)_0px_0px_0px_1px,_rgb(15_15_15_/10%)_0px_3px_6px,_rgb(15_15_15_/20%)_0px_9px_24px]">
            <div className="w-full flex text-[14px] p-[0_8px] shadow-[rgb(55_53_47_/9%)_0px_-1px_0px_inset] relative z-10 h-[40px]">
              <button
                type="button"
                onClick={() => switchTab('upload')}
                style={getTabStyles(isUploader)}
                className={`py-[6px] whitespace-nowrap min-w-0 flex-shrink-0 text-[rgb(55,53,47)] relative cursor-pointer user-select-none bg-inherit transition-[height_20ms_ease-in] inline-flex items-center h-full text-[14px] leading-[1.2] px-[8px]`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => switchTab('embed')}
                style={getTabStyles(isEmbed)}
                className={
                  'py-[6px] whitespace-nowrap min-w-0 flex-shrink-0 text-[rgb(55,53,47)] relative cursor-pointer user-select-none bg-inherit transition-[height_20ms_ease-in] inline-flex items-center h-full text-[14px] leading-[1.2] px-[8px]'
                }
              >
                Image link
              </button>
            </div>
            <div className="pt-[6px] pb-[6px] mt-[4px] flex justify-center mr-[12px] ml-[12px]">
              {isEmbed && <EmbedUploader onClose={onClose} blockId={blockId} />}
              {isUploader && <FileUploader onClose={onClose} blockId={blockId} />}
            </div>
          </div>
        </div>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export { ImageUploader };
