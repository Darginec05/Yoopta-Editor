/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { FC, memo, ReactNode } from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import { v4 } from 'uuid';
import { Transforms } from 'slate';
import { Image as ImageRender } from '../../Image';
import { ImageEditor } from '../../ImageEditor';
import { ReactComponent as PlusIcon } from '../../../icons/add.svg';
import s from './Element.module.scss';

type ElementProps = {
  attributes: any;
  element: any;
  children: ReactNode;
};

const HoveredMenu = () => {
  const editor = useSlate();

  return (
    <div className={s.hoverSettings}>
      <button
        type="button"
        // [TODO] - insert after clicked node
        onClick={() => {
          Transforms.insertNodes(editor, [
            {
              id: v4(),
              type: 'paragraph',
              children: [{ text: '' }],
            },
          ]);
        }}
        title="Click to add node"
        className={s.hoverSettingsItem}
      >
        <PlusIcon fill="red" color="red" />
      </button>
    </div>
  );
};

const ElementHover = memo<Omit<ElementProps, 'attributes'>>(({ children, element }) => {
  return (
    <div className={s.hoverItem} data-node-id={element.id}>
      <HoveredMenu />
      {children}
    </div>
  );
});

const Blockquote = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <blockquote role="row" tabIndex={0} className={s.blockquote} {...attributes}>
        {children}
      </blockquote>
    </ElementHover>
  );
});

const BulletedList = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ul role="row" tabIndex={0} {...attributes}>
        {children}
      </ul>
    </ElementHover>
  );
});

const NumberedList = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <ol role="row" tabIndex={0} {...attributes}>
        {children}
      </ol>
    </ElementHover>
  );
});

const ListItem = memo<ElementProps>(({ attributes, children }) => {
  return (
    <li className={s.listItem} {...attributes}>
      {children}
    </li>
  );
});

const HeadingOne = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h1 role="row" tabIndex={0} className={s['heading-one']} {...attributes}>
        {children}
      </h1>
    </ElementHover>
  );
});

const HeadingTwo = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h2 role="row" tabIndex={0} className={s['heading-two']} {...attributes}>
        {children}
      </h2>
    </ElementHover>
  );
});

const HeadingThree = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <h3 role="row" tabIndex={0} className={s['heading-three']} {...attributes}>
        {children}
      </h3>
    </ElementHover>
  );
});

const Link = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <a {...attributes} href={element.url} rel="noreferrer" target="_blank" className={s.link}>
      {children}
    </a>
  );
});

const Paragraph = memo<ElementProps>(({ attributes, element, children }) => {
  return (
    <ElementHover element={element}>
      <p role="row" tabIndex={0} className={s.paragraph} {...attributes} data-node-id={element.id}>
        {children}
      </p>
    </ElementHover>
  );
});

const Image = memo<ElementProps>(({ attributes, element, children }) => {
  if (element.src) {
    return (
      <ElementHover element={element}>
        <div {...attributes} className={s.image}>
          <ImageRender src={element.src} alt="URI" />
          {children}
        </div>
      </ElementHover>
    );
  }

  return (
    <ElementHover element={element}>
      <ImageEditor element={element} attributes={attributes} className={s.image}>
        {children}
      </ImageEditor>
    </ElementHover>
  );
});

export const ELEMENT_TYPES_MAP = {
  'block-quote': 'block-quote',
  'bulleted-list': 'bulleted-list',
  'numbered-list': 'numbered-list',
  'list-item': 'list-item',
  'heading-one': 'heading-one',
  'heading-two': 'heading-two',
  'heading-three': 'heading-three',
  link: 'link',
  image: 'image',
  paragraph: 'paragraph',
};

const ELEMENT_RENDER_ITEMS = {
  [ELEMENT_TYPES_MAP.paragraph]: { component: Paragraph, props: {} },
  [ELEMENT_TYPES_MAP['block-quote']]: { component: Blockquote, props: {} },
  [ELEMENT_TYPES_MAP['bulleted-list']]: { component: BulletedList, props: {} },
  [ELEMENT_TYPES_MAP['numbered-list']]: { component: NumberedList, props: {} },
  [ELEMENT_TYPES_MAP['list-item']]: { component: ListItem, props: {} },
  [ELEMENT_TYPES_MAP['heading-one']]: { component: HeadingOne, props: {} },
  [ELEMENT_TYPES_MAP['heading-two']]: { component: HeadingTwo, props: {} },
  [ELEMENT_TYPES_MAP['heading-three']]: { component: HeadingThree, props: {} },
  [ELEMENT_TYPES_MAP.link]: { component: Link, props: {} },
  [ELEMENT_TYPES_MAP.image]: { component: Image, props: {} },
  [ELEMENT_TYPES_MAP.paragraph]: { component: Paragraph, props: {} },
};

const Element: FC<RenderElementProps | any> = ({ attributes, children, element }) => {
  const { component: Component, props } = ELEMENT_RENDER_ITEMS[element.type];

  if (!Component) return null;

  return (
    <Component {...props} attributes={attributes} element={element}>
      {children}
    </Component>
  );
};

export { Element };
