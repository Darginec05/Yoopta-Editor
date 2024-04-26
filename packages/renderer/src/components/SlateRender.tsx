import { useMemo } from 'react';
import { hasInlines, isElement, isInline } from '../utils/slate';
import { TextComponent } from './TextComponent';
import { TextLeaf } from './TextLeaf';

const getMappedElements = (elements) => {
  const mappedElements = {};
  Object.keys(elements).forEach((type) => (mappedElements[type] = elements[type].render));
  return mappedElements;
};

const getMappedMarks = (marks?: any[]) => {
  const mappedMarks = {};
  if (!marks) return mappedMarks;

  marks.forEach((mark) => (mappedMarks[mark.type] = mark));
  return mappedMarks;
};

export const DefaultElement = (props: any) => {
  const { attributes, children, element } = props;
  const Tag = isInline(element) ? 'span' : 'div';
  return (
    <Tag {...attributes} style={{ position: 'relative' }}>
      {children}
    </Tag>
  );
};

const SlateRender = ({ value, options, marks, elements, block, id }) => {
  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const renderElement = (props: any) => {
    const ElementComponent = ELEMENTS_MAP[props.element.type];
    const { attributes: slateElementAttributes, ...elementProps } = props;
    const attributes = { ...options?.HTMLAttributes, ...slateElementAttributes };

    if (!ElementComponent) return <DefaultElement key={props.element.id} {...elementProps} attributes={attributes} />;
    return (
      <ElementComponent key={props.element.id} {...elementProps} attributes={attributes} block={block} blockId={id} />
    );
  };

  const renderLeaf = (props) => {
    let { children, leaf, attributes } = props;
    const { text, ...formats } = leaf;

    if (formats) {
      Object.keys(formats).forEach((format) => {
        const mark = MARKS_MAP[format];
        if (mark) children = mark.render({ children, leaf });
      });
    }

    return <TextLeaf attributes={attributes}>{children}</TextLeaf>;
  };

  const renderProps = {
    node: { children: value },
    renderElement: renderElement,
    renderLeaf: renderLeaf,
  };

  return (
    <div
      role="textbox"
      data-slate-editor
      data-slate-node="value"
      style={{
        position: 'relative',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }}
    >
      {getChildren(renderProps)}
    </div>
  );
};

const getChildren = (props: {
  node: any;
  renderElement?: (props: any) => JSX.Element;
  renderLeaf?: (props: any) => JSX.Element;
}) => {
  const { node, renderElement, renderLeaf } = props;
  const children: JSX.Element[] = [];
  const isLeafBlock = isElement(node) && isInline(node) && hasInlines(node);

  for (let i = 0; i < node.children.length; i++) {
    const n = node.children[i];

    if (isElement(n)) {
      children.push(
        <ElementComponent key={n.id || i} element={n} renderElement={renderElement} renderLeaf={renderLeaf} />,
      );
    } else {
      children.push(
        <TextComponent
          key={n.id || i}
          isLast={isLeafBlock && i === node.children.length - 1}
          parent={node}
          renderLeaf={renderLeaf}
          text={n}
        />,
      );
    }
  }

  return children;
};

const ElementComponent = ({ element, renderElement, renderLeaf }) => {
  const isInline = element.nodeType === 'inline';

  const attributes = {
    'data-slate-node': 'element',
  };

  if (isInline) {
    attributes['data-slate-inline'] = true;
  }

  let children: React.ReactNode = getChildren({
    node: element,
    renderElement,
    renderLeaf,
  });

  return renderElement({ attributes, children, element });
};

export { SlateRender };
