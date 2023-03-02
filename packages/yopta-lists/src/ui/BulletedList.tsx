import { createYoptaComponent } from '@yopta/editor';

const BulletedListRender = ({ attributes, children, element }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
};

const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

const BulletedList = createYoptaComponent({
  type: BULLETED_LIST_NODE_TYPE,
  renderer: (editor) => BulletedListRender,
});

export { BulletedList };
