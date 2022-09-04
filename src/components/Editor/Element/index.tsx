/* eslint-disable react/display-name */
import { FC, memo, useMemo } from 'react';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { ElementHover } from '../../HoveredMenu';
import { Image as ImageRender } from '../../Image';
import { ImageEditor } from '../../ImageEditor';
import { ELEMENT_TYPES_MAP } from '../constants';
import { ElementProps } from '../types';
import s from './Element.module.scss';

const BlockquoteElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <blockquote draggable={false} className={s.blockquote} {...attributes}>
        {children}
      </blockquote>
    </ElementHover>
  );
});

const BulletedListElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ul draggable={false} {...attributes}>
        {children}
      </ul>
    </ElementHover>
  );
});

const NumberedListElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ol draggable={false} {...attributes}>
        {children}
      </ol>
    </ElementHover>
  );
});

const ListItemElement = memo<ElementProps>(({ attributes, children }) => {
  return (
    <li className={s.listItem} draggable={false} {...attributes}>
      {children}
    </li>
  );
});

const HeadingOneElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h1 className={s['heading-one']} draggable={false} {...attributes}>
        {children}
      </h1>
    </ElementHover>
  );
});

const HeadingTwoElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h2 className={s['heading-two']} draggable={false} {...attributes}>
        {children}
      </h2>
    </ElementHover>
  );
});

const HeadingThreeElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h3 className={s['heading-three']} draggable={false} {...attributes}>
        {children}
      </h3>
    </ElementHover>
  );
});

const LinkElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <a draggable={false} {...attributes} href={element.url} rel="noreferrer" target="_blank" className={s.link}>
      {children}
    </a>
  );
});

const ParagraphElement = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <p className={s.paragraph} draggable={false} {...attributes} data-node-id={element.id}>
        {children}
      </p>
    </ElementHover>
  );
});

const ImageElement = memo<ElementProps>(({ attributes, element, children }) => {
  const selected = useSelected();
  const focused = useFocused();

  if (element.src) {
    return (
      <ElementHover element={element}>
        <div draggable={false} {...attributes} className={s.image}>
          <ImageRender
            src={element.src}
            alt="URI"
            style={{
              boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
            }}
          />
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
  [ELEMENT_TYPES_MAP.paragraph]: ParagraphElement,
  [ELEMENT_TYPES_MAP['block-quote']]: BlockquoteElement,
  [ELEMENT_TYPES_MAP['bulleted-list']]: BulletedListElement,
  [ELEMENT_TYPES_MAP['numbered-list']]: NumberedListElement,
  [ELEMENT_TYPES_MAP['list-item']]: ListItemElement,
  [ELEMENT_TYPES_MAP['heading-one']]: HeadingOneElement,
  [ELEMENT_TYPES_MAP['heading-two']]: HeadingTwoElement,
  [ELEMENT_TYPES_MAP['heading-three']]: HeadingThreeElement,
  [ELEMENT_TYPES_MAP.link]: LinkElement,
  [ELEMENT_TYPES_MAP.image]: ImageElement,
  // [ELEMENT_TYPES_MAP.video]: () => <div>NOT SUPPORTED</div>Element,
  [ELEMENT_TYPES_MAP.paragraph]: ParagraphElement,
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
