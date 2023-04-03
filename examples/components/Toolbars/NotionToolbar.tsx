import { ToolbarProps } from '@yopta/toolbar';
import s from './NotionToolbar.module.scss';

const NotionToolbar = (props: ToolbarProps) => {
  const { getRootProps } = props;

  return (
    <div {...getRootProps()}>
      <div>
        <button>ask grt</button>
      </div>
    </div>
  );
};

export { NotionToolbar };
