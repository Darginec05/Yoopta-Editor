/* eslint-disable react/display-name */
import { FC, memo, useMemo } from 'react';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { ElementHover } from '../../HoveredMenu';
import { Image as ImageRender } from '../../Image';
import { ImageEditor } from '../../ImageEditor';
import { ELEMENT_TYPES_MAP } from '../constants';
import { Blockquote } from '../../Elements/Blockquote/Blockquote';
import { HeadingOne } from '../../Elements/HeadingOne/HeadingOne';
import { HeadingTwo } from '../../Elements/HeadingTwo/HeadingTwo';
import { HeadingThree } from '../../Elements/HeadingThree/HeadingThree';
import { BulletedList } from '../../Elements/BulletedList/BulletedList';
import { NumberedList } from '../../Elements/NumberedList/NumberedList';
import { ListItem } from '../../Elements/ListItem/ListItem';
import { Link } from '../../Elements/Link/Link';
import { Paragraph } from '../../Elements/Paragraph/Paragraph';
import { ElementProps } from '../types';
import s from './Element.module.scss';

const Image = memo<ElementProps>(({ attributes, element, children }) => {
  const selected = useSelected();
  const focused = useFocused();

  if (element.src) {
    return (
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
    );
  }

  // [TODO] - fix perfomance
  return (
    <ImageEditor element={element} attributes={attributes} className={s.image}>
      {children}
    </ImageEditor>
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

const TYPES_DRAG_IGNORE = ['list-item', 'link'];

const Element: FC<RenderElementProps | any> = ({ attributes, children, element, isEdit = true }) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;

  if (isEdit) {
    if (TYPES_DRAG_IGNORE.includes(element.type)) {
      return (
        <Component attributes={attributes} element={element}>
          {children}
        </Component>
      );
    }

    return (
      <ElementHover element={element}>
        <Component attributes={attributes} element={element}>
          {children}
        </Component>
      </ElementHover>
    );
  }

  return (
    <Component attributes={attributes} element={element}>
      {children}
    </Component>
  );
};

export { Element };
