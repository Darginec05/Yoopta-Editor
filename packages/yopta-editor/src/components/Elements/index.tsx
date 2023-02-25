import { HeadingOne } from './HeadingOne/HeadingOne';
import { HeadingTwo } from './HeadingTwo/HeadingTwo';
import { HeadingThree } from './HeadingThree/HeadingThree';
import { BulletedList } from './BulletedList/BulletedList';
import { NumberedList } from './NumberedList/NumberedList';
import { Image } from './Image/Image';
import { Video } from './Video/Video';
import { ListItem } from './ListItem/ListItem';
import { Link } from './Link/Link';
import { Embed } from './Embed/Embed';
import { ELEMENT_TYPES_MAP } from '../Editor/constants';

export const ELEMENT_RENDER_ITEMS = {
  // [ELEMENT_TYPES_MAP['block-quote']]: Blockquote,
  // [ELEMENT_TYPES_MAP['bulleted-list']]: BulletedList,
  // [ELEMENT_TYPES_MAP['numbered-list']]: NumberedList,
  // [ELEMENT_TYPES_MAP['list-item']]: ListItem,
  // [ELEMENT_TYPES_MAP['heading-one']]: HeadingOne,
  [ELEMENT_TYPES_MAP['heading-two']]: HeadingTwo,
  // [ELEMENT_TYPES_MAP['heading-three']]: HeadingThree,
  // [ELEMENT_TYPES_MAP.link]: Link,
  // [ELEMENT_TYPES_MAP.image]: Image,
  // [ELEMENT_TYPES_MAP.callout]: Callout,
  // [ELEMENT_TYPES_MAP.code]: Code,
  // [ELEMENT_TYPES_MAP.video]: Video,
  // [ELEMENT_TYPES_MAP.embed]: Embed,
};
