import { Descendant } from 'slate';
import { RenderElement } from './components/Editor/RenderElement/RenderElement';
import { TextLeaf } from './components/Editor/TextLeaf';
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

  const renderElement = ({ id, type, children, ...rest }) => {
    console.log(children);

    return (
      /* @ts-ignore */
      <RenderElement
        element={{ type, ...rest }}
        attributes={{ 'data-slate-node': 'element', ref: null }}
        key={id}
        isEdit={false}
      >
        {children.map(renderChildren)}
      </RenderElement>
    );
  };

  /* @ts-ignore */
  return <div className={wrapCls}>{data.map(renderElement)}</div>;
};

export { YoptaRenderer };
