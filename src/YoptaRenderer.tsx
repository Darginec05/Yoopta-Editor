import { Descendant } from 'slate';
import { TextLeaf } from './components/Editor/TextLeaf';
import { ELEMENT_RENDER_ITEMS } from './components/Elements';
import { useScrollToElement } from './hooks/useScrollToElement';

type Props = {
  data: Descendant[];
  wrapCls?: string;
};

const YoptaRenderer = ({ data, wrapCls }: Props) => {
  useScrollToElement();

  const renderChildren = (child, i) => {
    // eslint-disable-next-line no-use-before-define
    if (child.type) return renderElement(child);

    return (
      /* @ts-ignore */
      <TextLeaf
        key={i}
        leaf={child}
        attributes={{
          'data-slate-leaf': true,
        }}
      >
        {child.text}
      </TextLeaf>
    );
  };

  const renderElement = (element) => {
    const { id, type, children, attributes } = element;
    const Component = ELEMENT_RENDER_ITEMS[type];

    return (
      <section key={id} data-node-id={element.id} data-node-type={element.type} {...attributes}>
        <Component attributes={attributes} element={element} dataNodeId={id} isEdit={false}>
          {children.map(renderChildren)}
        </Component>
      </section>
    );
  };

  return <div className={wrapCls}>{data.map(renderElement)}</div>;
};

export { YoptaRenderer };
