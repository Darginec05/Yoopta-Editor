import { forwardRef, KeyboardEvent, ReactNode } from 'react';
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
import s from './ElementsListDropdown.module.scss';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

export const ELEMENT_TYPES: Block[] = [
  { icon: <ParagraphIcon />, name: 'Text', type: 'paragraph' },
  { icon: <HeadingOneIcon />, name: 'Heading 1', type: 'heading-one' },
  { icon: <HeadingTwoIcon />, name: 'Heading 2', type: 'heading-two' },
  { icon: <HeadingThreeIcon />, name: 'Heading 3', type: 'heading-three' },
  { icon: <BulletedListIcon />, name: 'Bulleted List', type: 'bulleted-list' },
  { icon: <NumberedListIcon />, name: 'Numbered List', type: 'numbered-list' },
  { icon: <BlockQuoteIcon />, name: 'Blockquote', type: 'block-quote' },
  { icon: <CalloutIcon />, name: 'Callout', type: 'callout' },
  { icon: <ImageIcon />, name: 'Image', type: 'image' },
  { icon: <VideoIcon />, name: 'Video', type: 'video' },
];

export const ElementsListDropdown = forwardRef<any, any>(
  ({ handleBlockClick, selectedElementType, filterListCallback, style }, ref) => {
    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, type: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleBlockClick(e, type);
      }
    };

    const elements =
      typeof filterListCallback === 'function' ? ELEMENT_TYPES.filter(filterListCallback) : ELEMENT_TYPES;

    const isBlockActive = (elem) => selectedElementType === elem.type;

    const notFound = elements.length === 0;

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
