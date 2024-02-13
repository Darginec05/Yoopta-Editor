import { Editor, Element, Path, Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import { createYooptaPlugin } from '../../../../plugins';
import { generateId } from '../../../../utils/generateId';
import s from './NumberedList.module.css';

const NumberedListRender = (props: RenderElementProps) => {
  return (
    <ol data-element-type="NumberedList" {...props.attributes} className={s.list}>
      {props.children}
    </ol>
  );
};

const ListItemRender = (props: RenderElementProps) => {
  const { depth = 0 } = props.element.props;

  // [TODO] - handle max depth
  const style = {
    // marginLeft: `${depth * 20}px`,
  };

  return (
    <li data-element-type="ListItem" {...props.attributes} className={s.listItem} style={style}>
      {props.children}
    </li>
  );
};

const NumberedList = createYooptaPlugin({
  type: 'NumberedListPlugin',
  elements: {
    'numbered-list': {
      render: NumberedListRender,
    },
    'list-item': {
      render: ListItemRender,
      elementProps: {
        depth: 0,
      },
    },
  },
  events: {
    onKeyDown:
      (editor, slate, { hotkeys }) =>
      (event) => {
        Editor.withoutNormalizing(slate, () => {
          if (!slate.selection) return;
          const selection = slate.selection;
          const { anchor } = selection;

          if (hotkeys.isBackspace(event)) {
            event.preventDefault();
          }

          if (hotkeys.isTab(event)) {
            event.preventDefault();

            // const nodeEntry = Editor.above(slate, {
            //   at: anchor,
            //   match: (n) => Element.isElement(n) && n.type === 'list-item',
            // });

            // if (!nodeEntry) return;

            // const [listItemNode, listItemPath] = nodeEntry;
            // Transforms.setNodes(slate, { data: { depth: listItemNode.data.depth + 1 } }, { at: listItemPath });

            return;
          }

          if (hotkeys.isShiftTab(event)) {
            event.preventDefault();

            // const nodeEntry = Editor.above(slate, {
            //   at: anchor,
            //   match: (n) => Element.isElement(n) && n.type === 'list-item',
            // });

            // if (!nodeEntry) return;

            // const [listItemNode, listItemPath] = nodeEntry;

            // if (listItemNode.data.depth === 0) return;
            // Transforms.setNodes(slate, { data: { depth: listItemNode.data.depth - 1 } }, { at: listItemPath });
            // return;
          }

          if (hotkeys.isEnter(event)) {
            event.preventDefault();

            const nodeEntry = Editor.above(slate, {
              at: anchor,
              match: (n) => Element.isElement(n) && n.type === 'list-item',
            });

            if (!nodeEntry) return;

            const [listItemNode, listItemPath] = nodeEntry;
            const [parentNode, parentPath] = Editor.parent(slate, listItemPath);

            const isEnd = Editor.isEnd(slate, anchor, listItemPath);
            const isStart = Editor.isStart(slate, anchor, listItemPath);
            const text = Editor.string(slate, listItemPath);

            // [TODO] - When list item is empty check depth, remove it list-item and in case depth is 0 create block
            if (text.trim() === '') {
              return;
            }

            if (isStart) {
              let previousPath;

              try {
                previousPath = Path.previous(listItemPath);
              } catch (error) {
                previousPath = listItemPath;
              }

              console.log('Path.previous(listItemPath)', previousPath);
              console.log('listItemPath', listItemPath);

              // [TODO] - think about approach to create new nodes from elements
              const newListItemNode = {
                id: generateId(),
                type: 'list-item',
                children: [{ text: '' }],
                data: { depth: 0 },
              };

              Transforms.insertNodes(slate, newListItemNode, { at: listItemPath });
              return;
            }

            if (isEnd) {
              const nextPath = Path.next(listItemPath);
              console.log('Path.next(listItemPath)', Path.next(listItemPath));

              // [TODO] - think about approach to create new nodes from elements
              const newListItemNode = {
                id: generateId(),
                type: 'list-item',
                children: [{ text: '' }],
                data: { depth: 0 },
              };

              Transforms.insertNodes(slate, newListItemNode, { at: Path.next(listItemPath) });

              Transforms.select(slate, nextPath);
              return;
            }

            if (!isStart && !isEnd) {
              Transforms.splitNodes(slate, {
                at: anchor,
                match: (n) => Element.isElement(n) && n.type === 'list-item',
              });

              Transforms.setNodes(
                slate,
                { id: generateId() },
                {
                  match: (n) => Element.isElement(n) && n.type === 'list-item',
                },
              );
              return;
            }

            console.log({ isStart, isEnd, parentNode });
          }
        });
      },
  },
});

export { NumberedList };
