import { ExternalLinkIcon, StarIcon } from 'lucide-react';

type Props = {
  example?: string;
  directLink?: string;
};

const CheckSourceCode = ({ example, directLink }: Props) => {
  return (
    <div className="fixed md:top-2 md:right-2  top-[14.5px] right-[18px] flex z-50">
      <button
        onClick={() => {
          window.open(`https://github.com/Darginec05/Yoopta-Editor`, '_blank');
        }}
        className="relative mx-2 px-3 py-1 text-[14px] rounded text-white flex items-center bg-[#000]"
      >
        Give us star
        <StarIcon size={15} className="ml-2" fill="#faca15" color="#faca15" />
      </button>
      <button
        onClick={() =>
          window.open(
            directLink ||
              `https://github.com/Darginec05/Yoopta-Editor/blob/master/web/next-example/src/components/examples/${example}/index.tsx`,
            '_blank',
          )
        }
        className="relative mx-2 px-3 py-1 text-[14px] rounded text-white flex items-center bg-[#007aff]"
      >
        Source code
        <ExternalLinkIcon size={15} className="ml-2" />
      </button>
    </div>
  );
};

export { CheckSourceCode };
