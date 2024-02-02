import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './NumberedList.module.css';

const NumberedListRender = (props: RenderElementProps) => {
  return (
    <ol data-element-type="NumberedList" {...props.attributes} className={s.list}>
      {props.children}
    </ol>
  );
};

const ListItemRender = (props: RenderElementProps) => {
  return (
    <li data-element-type="NumberedList" {...props.attributes} className={s.listItem}>
      {props.children}
    </li>
  );
};

const NumberedList = createPlugin({
  type: 'NumberedListPlugin',
  elements: {
    'numbered-list': {
      render: NumberedListRender,
    },
    'list-item': {
      render: ListItemRender,
    },
  },
});

export { NumberedList };
