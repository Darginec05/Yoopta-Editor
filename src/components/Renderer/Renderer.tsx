import { Descendant } from 'slate';
import cx from 'classnames';
import { TextLeaf } from '../Editor/TextLeaf/TextLeaf';
import { ELEMENT_RENDER_ITEMS } from '../Elements';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import s from './Renderer.module.scss';

type Props = {
  data: Descendant[];
  className?: string;
};

const RenderChildren = ({ child }) => {
  // eslint-disable-next-line no-use-before-define
  if (child.type) return <RenderElement element={child} fromChild />;

  return (
    /* @ts-ignore */
    <TextLeaf
      leaf={child}
      attributes={{
        'data-slate-leaf': true,
      }}
    >
      {child.text.length > 0 ? child.text : <span>&#xFEFF;</span>}
    </TextLeaf>
  );
};

const RenderElement = ({ element, fromChild }) => {
  const { id, type, children, attributes } = element;
  const Component = ELEMENT_RENDER_ITEMS[type];
  if (!Component) return null;

  const node = (
    <Component attributes={attributes} element={element} dataNodeId={id} isEdit={false}>
      {children.map((child, i) => (
        <RenderChildren key={child.id || i} child={child} />
      ))}
    </Component>
  );

  if (fromChild) return node;

  return (
    <section
      key={id}
      data-node-id={element.id}
      data-node-type={element.type}
      className={cx(s.node, 'yopta-node')}
      {...attributes}
    >
      {node}
    </section>
  );
};

const Renderer = ({ data, className }: Props) => {
  useScrollToElement();

  return (
    <div className={className}>
      {data.map((element) => (
        /* @ts-ignore */
        <RenderElement key={element.id} element={element} />
      ))}
    </div>
  );
};

export { Renderer };
