import { forwardRef, ReactNode, useEffect, CSSProperties, useRef, createRef, useMemo, useState } from 'react';
import cx from 'classnames';
import isHotkey from 'is-hotkey';
import ParagraphIcon from '../Toolbar/icons/paragraph.svg';
import HeadingOneIcon from '../Toolbar/icons/heading_one.svg';
import HeadingTwoIcon from '../Toolbar/icons/heading_two.svg';
import HeadingThreeIcon from '../Toolbar/icons/heading_three.svg';
import BulletedListIcon from '../Toolbar/icons/bulleted_list.svg';
import NumberedListIcon from '../Toolbar/icons/numbered_list.svg';
import BlockQuoteIcon from '../Toolbar/icons/blockquote.svg';
import CalloutIcon from '../Toolbar/icons/callout.svg';
import VideoIcon from '../../../icons/video.svg';
import ImageIcon from '../../../icons/image.svg';
import { ELEMENT_TYPES_MAP } from '../constants';
import { useNodeSettingsContext } from '../../../contexts/NodeSettingsContext/NodeSettingsContext';
import s from './SuggestionElementList.module.scss';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

const KEYS = ['Tab', 'ArrowUp', 'ArrowDown'];

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
  { icon: <VideoIcon />, name: 'Embed', type: ELEMENT_TYPES_MAP.embed },
];

type Props = {
  filterListCallback?: (_elem: Block) => void;
  changeNodeType: (_type: any) => void;
  onClose?: () => void;
  style?: CSSProperties;
  selectedElementType?: string;
  isOpen: boolean;
};

export const SuggestionElementList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [, { closeNodeSettings }] = useNodeSettingsContext();
  const { changeNodeType, selectedElementType, filterListCallback, style, onClose, isOpen } = props;
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);

  const elements = useMemo(
    () => (typeof filterListCallback === 'function' ? ELEMENT_TYPES.filter(filterListCallback) : ELEMENT_TYPES),
    [filterListCallback],
  );

  // TODO - bug
  const elementRefs = useRef<any[]>([]);

  const isBlockActive = (elem: Block) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    (selectedElementType ? selectedElementType === elem.type : elements[0].type === elem.type);

  const notFound = elements.length === 0;

  useEffect(() => {
    if (notFound && onClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [notFound]);

  useEffect(() => {
    elementRefs.current.map((item, index) => {
      if (item?.current?.dataset.type === selectedElementType) {
        setActiveElementIndex(index);
      }
      return index;
    });
  }, [selectedElementType]);

  const handleChangeNode = (e: any, type: string) => {
    e.stopPropagation();
    e.preventDefault();

    closeNodeSettings();
    changeNodeType(type);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleArrowPress = (isDownPress: boolean) => {
      const focusIndex = isDownPress ? activeElementIndex + 1 : activeElementIndex - 1;
      if (!(focusIndex > elementRefs.current.length - 1 || focusIndex < 0)) {
        setActiveElementIndex(focusIndex);
        elementRefs.current[focusIndex].current.focus();
      } else {
        // do nothing
        return false;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // close menu on escape press
      if (isHotkey('Escape', event)) {
        return onClose?.();
      }
      if (isHotkey(['Down', 'Up'], event)) {
        event.preventDefault();
        handleArrowPress(isHotkey('Down', event));
      }
      if (isHotkey('Enter', event)) {
        const currentSelectedType = document.activeElement as HTMLButtonElement;
        handleChangeNode(event, currentSelectedType?.dataset.type || ELEMENT_TYPES_MAP['heading-one']);
        onClose?.();
      }

      /** @ts-ignore */
      const isChildFocused = ref?.current?.contains(document.activeElement);

      if (!isChildFocused && KEYS.includes(event.key)) {
        const selected: HTMLButtonElement | null = document.querySelector(`[data-type="${selectedElementType}"]`);
        if (selected) selected.focus();
        else elementRefs.current[0]?.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeElementIndex]);

  useEffect(() => {
    elementRefs.current = elements.map((_, index) => (elementRefs.current[index] = createRef()));
  }, [elements]);

  return (
    <div className={cx(s.dropdown, 'yopta-suggesstion_list')} role="dialog" aria-modal="true" ref={ref} style={style}>
      {elements.map((element, i) => (
        <button
          type="button"
          key={element.type}
          data-type={element.type}
          onMouseDown={(e) => handleChangeNode(e, element.type)}
          ref={elementRefs.current[i]}
          className={cx(s.dropdownButton, isBlockActive(element) && s.__active)}
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
});

SuggestionElementList.displayName = 'SuggestionElementList';
