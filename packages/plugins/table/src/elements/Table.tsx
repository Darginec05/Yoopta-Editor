import { PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';
import { InsertColumn } from '../components/InsertColumn';
import { InsertRow } from '../components/InsertRow';

const Table = ({ attributes, children, blockId, element }: PluginElementRenderProps) => {
  const isReadOnly = useYooptaReadOnly();

  return (
    <div className="w-full pb-[15px] pr-[15px]">
      <div className="relative">
        <table className="border-collapse border-spacing-0 w-full caption-bottom text-sm" {...attributes}>
          {children}
        </table>
        {!isReadOnly && (
          <>
            <InsertColumn blockId={blockId} />
            <InsertRow blockId={blockId} />
          </>
        )}
      </div>
    </div>
  );
};

export { Table };
