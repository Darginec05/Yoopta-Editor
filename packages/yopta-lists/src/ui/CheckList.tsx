import { createYoptaComponent } from '@yopta/editor';

const CheckListRender = ({ attributes, children, element }) => {
  return (
    <li draggable={false} {...attributes}>
      {children}
    </li>
  );
};

const Task_LIST_NODE_TYPE = 'check-list';

const CheckList = createYoptaComponent({
  type: Task_LIST_NODE_TYPE,
  renderer: (editor) => CheckListRender,
});

export { CheckList };
