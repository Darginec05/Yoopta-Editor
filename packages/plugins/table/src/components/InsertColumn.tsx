import { useYooptaEditor } from '@yoopta/editor';
import { TABLE_API } from '../api';
import PlusIcon from '../icons/plus.svg';

const InsertColumn = ({ blockId }) => {
  const editor = useYooptaEditor();

  return (
    <div contentEditable={false} className="absolute flex right-[-18px] top-0 bottom-0">
      <div className="flex w-full h-full opacity-100 transition-opacity duration-[150ms] delay-[50ms]">
        <button
          type="button"
          className="yoopta-button cursor-pointer transition-[background] duration-[20ms] ease-in cursor-col-resize flex-[1_1_0%] w-[16px] h-full rounded-[4px] overflow-hidden"
          onClick={() => TABLE_API.insertColumn(editor, blockId)}
        >
          <div className="h-full w-full flex items-center justify-center bg-[rgba(55,53,47,0.06)]">
            <PlusIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export { InsertColumn };
