import { YoptaComponent } from '@yopta/editor';
import { ListItemList } from './ListItem';

const BulletedListRender = ({ attributes, children, element }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
};

const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

const BulletedList = new YoptaComponent({
  type: BULLETED_LIST_NODE_TYPE,
  renderer: (editor) => BulletedListRender,
  children: ListItemList,
});

export { BulletedList };
