import { createYoptaComponent } from '@yopta/editor';

const NumberedListRender = ({ attributes, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
};

const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

const NumberedList = createYoptaComponent({
  type: NUMBERED_LIST_NODE_TYPE,
  renderer: (editor) => NumberedListRender,
  options: {
    depth: 3,
  },
});

export { NumberedList };
