import { forwardRef, KeyboardEvent, ReactNode, useEffect, CSSProperties } from 'react';
import cx from 'classnames';
import { ReactComponent as ParagraphIcon } from '../Toolbar/icons/paragraph.svg';
import { ReactComponent as HeadingOneIcon } from '../Toolbar/icons/heading_one.svg';
import { ReactComponent as HeadingTwoIcon } from '../Toolbar/icons/heading_two.svg';
import { ReactComponent as HeadingThreeIcon } from '../Toolbar/icons/heading_three.svg';
import { ReactComponent as BulletedListIcon } from '../Toolbar/icons/bulleted_list.svg';
import { ReactComponent as NumberedListIcon } from '../Toolbar/icons/numbered_list.svg';
import { ReactComponent as BlockQuoteIcon } from '../Toolbar/icons/blockquote.svg';
import { ReactComponent as CalloutIcon } from '../Toolbar/icons/callout.svg';
import { ReactComponent as VideoIcon } from '../../../icons/video.svg';
import { ReactComponent as ImageIcon } from '../../../icons/image.svg';
import { ELEMENT_TYPES_MAP } from '../constants';
import s from './ElementsListDropdown.module.scss';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

export const ELEMENT_TYPES: Block[] = [
  { icon: <ParagraphIcon />, name: 'Text', type: ELEMENT_TYPES_MAP.paragraph },
  { icon: <HeadingOneIcon />, name: 'Heading 1', type: ELEMENT_TYPES_MAP['heading-one'] },
  { icon: <HeadingTwoIcon />, name: 'Heading 2', type: ELEMENT_TYPES_MAP['heading-two'] },
  { icon: <HeadingThreeIcon />, name: 'Heading 3', type: ELEMENT_TYPES_MAP['heading-three'] },
  { icon: <BulletedListIcon />, name: 'Bulleted List', type: ELEMENT_TYPES_MAP['bulleted-list'] },
  { icon: <NumberedListIcon />, name: 'Numbered List', type: ELEMENT_TYPES_MAP['numbered-list'] },
  { icon: <BlockQuoteIcon />, name: 'Blockquote', type: ELEMENT_TYPES_MAP['block-quote'] },
  { icon: <CalloutIcon />, name: 'Callout', type: ELEMENT_TYPES_MAP.callout },
  { icon: <CalloutIcon />, name: 'Code', type: ELEMENT_TYPES_MAP.code },
  { icon: <ImageIcon />, name: 'Image', type: ELEMENT_TYPES_MAP.image },
  { icon: <VideoIcon />, name: 'Video', type: ELEMENT_TYPES_MAP.video },
];

type Props = {
  handleBlockClick: (_e: any, _type: string) => void;
  filterListCallback?: (_elem: Block) => void;
  onClose?: () => void;
  style?: CSSProperties;
  selectedElementType?: string;
}

export const ElementsListDropdown = forwardRef<HTMLDivElement, Props>(
  ({ handleBlockClick, selectedElementType, filterListCallback, style, onClose }, ref) => {
    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, type: string) => {
      e.preventDefault();
    };

    const elements =
      typeof filterListCallback === 'function' ? ELEMENT_TYPES.filter(filterListCallback) : ELEMENT_TYPES;

    // eslint-disable-next-line max-len
    const isBlockActive = (elem) => (selectedElementType ? selectedElementType === elem.type : elements[0].type === elem.type);

    const notFound = elements.length === 0;

    useEffect(() => {
      console.log('notFound && onClose RE-RENDER');

      if (notFound && onClose) {
        const timeout = setTimeout(() => {
          onClose();
        }, 1500);

        return () => clearTimeout(timeout);
      }
    }, [notFound]);

    return (
      <div className={s.dropdown} role="dialog" aria-modal="true" ref={ref} style={style}>
        {elements.map((element) => (
          <button
            onMouseDown={(e) => handleBlockClick(e, element.type)}
            onKeyDown={(e) => onKeyDown(e, element.type)}
            type="button"
            className={cx(s.dropdownButton, isBlockActive(element) && s.__active)}
            key={element.type}
          >
            {element.icon}
            {' '}
            <span>{element.name}</span>
          </button>
        ))}
        {notFound && (
          <button type="button" className={cx(s.dropdownButton)}>
            <span>Not found</span>
          </button>
        )}
      </div>
    );
  },
);

ElementsListDropdown.displayName = 'ElementsListDropdown';
