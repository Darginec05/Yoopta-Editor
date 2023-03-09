import { YoptaComponent } from '@yopta/editor';
import { ListItemList } from './ListItem';

const NumberedListRender = ({ attributes, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
};

const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

const NumberedList = new YoptaComponent({
  type: NUMBERED_LIST_NODE_TYPE,
  renderer: (editor) => NumberedListRender,
  children: ListItemList,
});

export { NumberedList };
