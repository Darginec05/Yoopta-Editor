import { FC, ReactNode, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';
import { ElementHover } from '../../HoveredMenu/HoveredMenu';
import { ELEMENT_TYPES_MAP } from '../constants';
import { Blockquote } from '../../Elements/Blockquote/Blockquote';
import { HeadingOne } from '../../Elements/HeadingOne/HeadingOne';
import { HeadingTwo } from '../../Elements/HeadingTwo/HeadingTwo';
import { HeadingThree } from '../../Elements/HeadingThree/HeadingThree';
import { BulletedList } from '../../Elements/BulletedList/BulletedList';
import { NumberedList } from '../../Elements/NumberedList/NumberedList';
import { Image } from '../../Elements/Image/Image';
import { Callout } from '../../Elements/Callout/Callout';
import { ListItem } from '../../Elements/ListItem/ListItem';
import { Link } from '../../Elements/Link/Link';
import { Paragraph } from '../../Elements/Paragraph/Paragraph';

const ELEMENT_RENDER_ITEMS = {
  [ELEMENT_TYPES_MAP['block-quote']]: Blockquote,
  [ELEMENT_TYPES_MAP['bulleted-list']]: BulletedList,
  [ELEMENT_TYPES_MAP['numbered-list']]: NumberedList,
  [ELEMENT_TYPES_MAP['list-item']]: ListItem,
  [ELEMENT_TYPES_MAP['heading-one']]: HeadingOne,
  [ELEMENT_TYPES_MAP['heading-two']]: HeadingTwo,
  [ELEMENT_TYPES_MAP['heading-three']]: HeadingThree,
  [ELEMENT_TYPES_MAP.link]: Link,
  [ELEMENT_TYPES_MAP.image]: Image,
  [ELEMENT_TYPES_MAP.callout]: Callout,
  // [ELEMENT_TYPES_MAP.video]: () => <div>NOT SUPPORTED</div>,
  [ELEMENT_TYPES_MAP.paragraph]: Paragraph,
};

const TYPES_DRAG_IGNORE = [ELEMENT_TYPES_MAP['list-item'], ELEMENT_TYPES_MAP.link];

type Props = RenderElementProps & {
  attributes: any;
  children: ReactNode;
  element: any;
  isEdit?: boolean;
  dndState: any;
  onPlusButtonClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrop?: () => void;
};

const RenderElement: FC<Props> = ({
  element,
  onDragStart,
  onDragEnd,
  onDrop,
  dndState,
  children,
  attributes,
  onPlusButtonClick,
  isEdit = true,
}) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;
  if (isEdit) {
    if (TYPES_DRAG_IGNORE.includes(element.type)) {
      return (
        <Component isEdit attributes={attributes} element={element}>
          {children}
        </Component>
      );
    }

    return (
      <ElementHover
        element={element}
        attributes={attributes}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        dndState={dndState}
        onPlusButtonClick={onPlusButtonClick}
      >
        <Component isEdit attributes={{}} element={element}>
          {children}
        </Component>
      </ElementHover>
    );
  }

  return (
    <Component attributes={attributes} element={element} isEdit={false}>
      {children}
    </Component>
  );
};

export { RenderElement };
