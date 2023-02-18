import { Descendant } from 'slate';
import { TextLeaf } from './components/Editor/TextLeaf/TextLeaf';
import { ELEMENT_RENDER_ITEMS } from './components/Elements';
import { useScrollToElement } from './hooks/useScrollToElement';
import { Renderer } from './components/Renderer/Renderer';

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
      style={{ padding: '0 64px' }}
      {...attributes}
    >
      {node}
    </section>
  );
};

const YoptaRenderer = ({ data, className }: Props) => {
  useScrollToElement();

  return <Renderer data={data} className={className} />;
};

export { YoptaRenderer };
