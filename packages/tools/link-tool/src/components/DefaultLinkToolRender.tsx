import { ChangeEvent, useEffect, useState } from 'react';
import { LinkToolRenderProps, Link } from '../types';

const DEFAULT_LINK_VALUE: Link = {
  url: '',
  title: '',
};

function isUrl(string: any): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

const DefaultLinkToolRender = (props: LinkToolRenderProps) => {
  const [link, setLink] = useState(props?.link || DEFAULT_LINK_VALUE);

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setLink((p) => ({ ...p, [target.name]: target.value }));
  };

  useEffect(() => {
    if (props.link) setLink(props.link);
  }, [props.link]);

  const onSave = () => {
    if (!link.url) return;
    props.onSave(link);
  };

  const onDelete = () => {
    props.onDelete();
  };

  return (
    <div className="yoo-link-tool-min-w-[340px] yoo-link-tool-bg-[#FFFFFF] yoo-link-tool-flex yoo-link-tool-flex-col yoo-link-tool-z-50 yoo-link-tool-p-[10px] yoo-link-tool-rounded-md yoo-link-tool-shadow-md yoo-link-tool-border-solid yoo-link-tool-border-[1px] yoo-link-tool-border-[#e5e7eb] yoo-link-tool-shadow-y-[4px]">
      <div className="">
        <label
          htmlFor="title"
          className="yoo-link-tool-text-xs yoo-link-tool-font-medium yoo-link-tool-text-gray-500 yoo-link-tool-block yoo-link-tool-mb-[5px]"
        >
          Link title
        </label>
        <input
          id="title"
          type="text"
          className="yoo-link-tool-text-sm yoo-link-tool-font-medium yoo-link-tool-text-gray-700 yoo-link-tool-border-solid yoo-link-tool-border-[1px] yoo-link-tool-border-[#e5e7eb] yoo-link-tool-rounded-md yoo-link-tool-py-[5px] yoo-link-tool-px-[10px] yoo-link-tool-w-full yoo-link-tool-shadow-sm"
          name="title"
          value={link.title}
          onChange={onChange}
          placeholder="Edit link title"
          autoComplete="off"
        />
      </div>
      <div className="yoo-link-tool-mt-2">
        <label
          htmlFor="url"
          className="yoo-link-tool-text-xs yoo-link-tool-font-medium yoo-link-tool-text-gray-500 yoo-link-tool-block yoo-link-tool-mb-[5px]"
        >
          Link URL
        </label>
        <input
          id="url"
          type="text"
          className="yoo-link-tool-text-sm yoo-link-tool-font-medium yoo-link-tool-text-gray-700 yoo-link-tool-border-solid yoo-link-tool-border-[1px] yoo-link-tool-border-[#e5e7eb] yoo-link-tool-rounded-md yoo-link-tool-py-[5px] yoo-link-tool-px-[10px] yoo-link-tool-w-full yoo-link-tool-shadow-sm"
          name="url"
          value={link.url}
          onChange={onChange}
          placeholder="Edit link URL"
          autoComplete="off"
        />
      </div>
      <div className="yoo-link-tool-mt-2 yoo-link-tool-flex yoo-link-tool-justify-between">
        <button
          type="button"
          className="yoopta-button yoo-link-tool-bg-[#1183ff] yoo-link-tool-text-[#fff] yoo-link-tool-text-sm yoo-link-tool-font-medium yoo-link-tool-py-[5px] yoo-link-tool-px-[10px] yoo-link-tool-rounded-md yoo-link-tool-shadow-sm disabled:yoo-link-tool-opacity-50"
          disabled={!link.url || !isUrl(link.url)}
          onClick={onSave}
        >
          Add
        </button>
        <button
          type="button"
          className="yoopta-button yoo-link-tool-ml-2 yoo-link-tool-bg-[#f4f4f5] yoo-link-tool-text-[#000] yoo-link-tool-text-sm yoo-link-tool-font-medium yoo-link-tool-py-[5px] yoo-link-tool-px-[10px] yoo-link-tool-rounded-md yoo-link-tool-shadow-sm disabled:yoo-link-tool-opacity-50"
          onClick={onDelete}
        >
          Delete link
        </button>
      </div>
    </div>
  );
};

export { DefaultLinkToolRender };
