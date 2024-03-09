import { useYooptaEditor } from '@yoopta/editor';
import { ChangeEvent, useState } from 'react';
import { VideoElementProps, VideoPluginElements } from '../types';
import { getProvider, ProviderGetters } from '../utils/providers';

const EmbedUploader = ({ blockId, onClose }) => {
  const editor = useYooptaEditor();
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const embed = () => {
    if (value.length === 0) return;

    const providerType = getProvider(value);
    const videoId = providerType ? ProviderGetters[providerType]?.(value) : null;

    console.log({ type: providerType, id: videoId });

    if (!providerType || !videoId) return console.warn('Unsopperted video provider or video id is not found.');

    editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(blockId, 'video', {
      src: value,
      provider: { type: providerType, id: videoId },
    });

    onClose();
  };

  const isEmpty = value.length === 0;

  return (
    <div className="cursor-pointer user-select-none transition-bg duration-20 ease-in white-space-nowrap w-full">
      <input
        type="text"
        placeholder="Paste video link"
        value={value}
        className="items-center bg-[hsla(45,13%,94%,.6)] rounded-[4px] shadow-[inset_0_0_0_1px_hsla(0,0%,6%,.1)] cursor-text flex text-[14px] h-[32px] leading-[20px] px-[6px] relative w-full border-none"
        onChange={onChange}
      />
      <button
        type="button"
        className="user-select-none transition-bg duration-20 ease-in cursor-pointer flex items-center justify-center flex-shrink-0 white-space-nowrap h-[28px] rounded-[4px] shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px_inset,_rgba(15,15,15,0.1)_0px_1px_2px] bg-[rgb(35,131,226)] text-white fill-white leading-[1.2] px-[12px] text-[14px] font-medium w-full max-w-[300px] mx-auto m-[12px_0_6px] disabled:bg-[rgba(35,131,226,0.5)] disabled:cursor-not-allowed"
        disabled={isEmpty}
        onClick={embed}
      >
        Embed video
      </button>
    </div>
  );
};

export { EmbedUploader };
