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
import { Video } from '../../Elements/Video/Video';
import { Callout } from '../../Elements/Callout/Callout';
import { ListItem } from '../../Elements/ListItem/ListItem';
import { Link } from '../../Elements/Link/Link';
import { Paragraph } from '../../Elements/Paragraph/Paragraph';
import { Embed } from '../../Elements/Embed/Embed';
import { Code } from '../../Elements/Code/Code';

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
  [ELEMENT_TYPES_MAP.code]: Code,
  [ELEMENT_TYPES_MAP.video]: Video,
  [ELEMENT_TYPES_MAP.paragraph]: Paragraph,
  [ELEMENT_TYPES_MAP.embed]: Embed,
};

const TYPES_DRAG_IGNORE = [ELEMENT_TYPES_MAP['list-item'], ELEMENT_TYPES_MAP.link];

type Props = RenderElementProps & {
  attributes: any;
  children: ReactNode;
  element: any;
  dataNodeId?: string;
  isEdit?: boolean;
};

const RenderElement: FC<Props> = ({ element, children, attributes, dataNodeId, isEdit = true }) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;
  if (isEdit) {
    if (TYPES_DRAG_IGNORE.includes(element.type)) {
      return (
        <Component dataNodeId={undefined} isEdit attributes={attributes} element={element}>
          {children}
        </Component>
      );
    }

    return (
      <ElementHover element={element} attributes={attributes}>
        <Component dataNodeId={undefined} isEdit attributes={{}} element={element}>
          {children}
        </Component>
      </ElementHover>
    );
  }

  return (
    <Component attributes={attributes} element={element} dataNodeId={dataNodeId} isEdit={false}>
      {children}
    </Component>
  );
};

export { RenderElement };
