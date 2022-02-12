/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { FC, memo, ReactNode, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';
import { ElementHover } from '../../HoveredMenu';
import { Image as ImageRender } from '../../Image';
import { ImageEditor } from '../../ImageEditor';
import { ELEMENT_TYPES_MAP } from '../constants';
import s from './Element.module.scss';

type ElementProps = {
  attributes: any;
  element: any;
  children: ReactNode;
};

const Blockquote = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <blockquote draggable={false} className={s.blockquote} {...attributes}>
        {children}
      </blockquote>
    </ElementHover>
  );
});

const BulletedList = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ul draggable={false} {...attributes}>
        {children}
      </ul>
    </ElementHover>
  );
});

const NumberedList = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ol draggable={false} {...attributes}>
        {children}
      </ol>
    </ElementHover>
  );
});

const ListItem = memo<ElementProps>(({ attributes, children }) => {
  return (
    <li className={s.listItem} draggable={false} {...attributes}>
      {children}
    </li>
  );
});

const HeadingOne = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h1 className={s['heading-one']} draggable={false} {...attributes}>
        {children}
      </h1>
    </ElementHover>
  );
});

const HeadingTwo = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h2 className={s['heading-two']} draggable={false} {...attributes}>
        {children}
      </h2>
    </ElementHover>
  );
});

const HeadingThree = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h3 className={s['heading-three']} draggable={false} {...attributes}>
        {children}
      </h3>
    </ElementHover>
  );
});

const Link = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <a draggable={false} {...attributes} href={element.url} rel="noreferrer" target="_blank" className={s.link}>
      {children}
    </a>
  );
});

const Paragraph = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <p className={s.paragraph} draggable={false} {...attributes} data-node-id={element.id}>
        {children}
      </p>
    </ElementHover>
  );
});

const Image = memo<ElementProps>(({ attributes, element, children }) => {
  if (element.src) {
    return (
      <ElementHover element={element}>
        <div draggable={false} {...attributes} className={s.image}>
          <ImageRender src={element.src} alt="URI" />
          {children}
        </div>
      </ElementHover>
    );
  }

  // [TODO] - fix perfomance
  return (
    <ElementHover element={element}>
      <ImageEditor element={element} attributes={attributes} className={s.image}>
        {children}
      </ImageEditor>
    </ElementHover>
  );
});

const ELEMENT_RENDER_ITEMS = {
  [ELEMENT_TYPES_MAP.paragraph]: Paragraph,
  [ELEMENT_TYPES_MAP['block-quote']]: Blockquote,
  [ELEMENT_TYPES_MAP['bulleted-list']]: BulletedList,
  [ELEMENT_TYPES_MAP['numbered-list']]: NumberedList,
  [ELEMENT_TYPES_MAP['list-item']]: ListItem,
  [ELEMENT_TYPES_MAP['heading-one']]: HeadingOne,
  [ELEMENT_TYPES_MAP['heading-two']]: HeadingTwo,
  [ELEMENT_TYPES_MAP['heading-three']]: HeadingThree,
  [ELEMENT_TYPES_MAP.link]: Link,
  [ELEMENT_TYPES_MAP.image]: Image,
  // [ELEMENT_TYPES_MAP.video]: () => <div>NOT SUPPORTED</div>,
  [ELEMENT_TYPES_MAP.paragraph]: Paragraph,
};

const Element: FC<RenderElementProps | any> = ({ attributes, children, element }) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;

  return (
    <Component attributes={attributes} element={element}>
      {children}
    </Component>
  );
};

export { Element };
