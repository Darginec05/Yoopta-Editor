import React, {
  forwardRef,
  ReactNode,
  useEffect,
  CSSProperties,
  useRef,
  createRef,
  useMemo,
} from 'react';
import { ReactEditor, useSlate } from 'slate-react';
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
];

type Props = {
  handleBlockClick: (_e: any, _type: string) => void;
  filterListCallback?: (_elem: Block) => void;
  onClose?: () => void;
  style?: CSSProperties;
  selectedElementType?: string;
  isOpen: boolean;
};

export const SuggestionElementList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { handleBlockClick, selectedElementType, filterListCallback, style, onClose, isOpen } = props;
  const editor = useSlate();

  const elements = useMemo(
    () => (typeof filterListCallback === 'function' ? ELEMENT_TYPES.filter(filterListCallback) : ELEMENT_TYPES),
    [filterListCallback],
  );

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
    console.log(elementRefs.current);

    if (!isOpen) {
      ReactEditor.focus(editor);
      return undefined;
    }

    let focusableItem = 0;

    const firstElement = elementRefs.current[focusableItem]?.current;
    const lastElement = elementRefs.current.at(-1)?.current;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        return onClose?.();
      }

      const isLastElementFocusable = document.activeElement === lastElement;
      const isFirstElementFocusable = document.activeElement === firstElement;

      const isChildFocused = ref.current?.contains(document.activeElement);

      if (!isChildFocused && KEYS.includes(event.key)) {
        const selected: HTMLButtonElement | null = document.querySelector(`[data-type="${selectedElementType}"]`);
        if (selected) selected.focus();
        else firstElement?.focus();
      }

      if (event.key === 'Tab' && !event.shiftKey) {
        focusableItem += 1;

        if (isLastElementFocusable) {
          focusableItem = 0;
          firstElement?.focus();
          event.preventDefault();
        }
      } else if (event.key === 'Tab' && event.shiftKey) {
        focusableItem -= 1;

        if (isFirstElementFocusable) {
          focusableItem = elementRefs.current.length - 1;
          lastElement?.focus();
          event.preventDefault();
        }
      } else if (event.key === 'ArrowUp') {
        focusableItem -= 1;

        if (isFirstElementFocusable) focusableItem = elementRefs.current.length - 1;
        elementRefs.current[focusableItem]?.current?.focus();
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        focusableItem += 1;

        if (isLastElementFocusable) focusableItem = 0;
        elementRefs.current[focusableItem]?.current?.focus();
        event.preventDefault();
      } else if (event.key === 'Enter') {
        const currentSelectedType = document.activeElement as HTMLButtonElement;
        handleBlockClick(event, currentSelectedType?.dataset.type || 'paragraph');
        event.preventDefault();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    elementRefs.current = elements.map((_, index) => elementRefs.current[index] = createRef());
  }, [elements]);

  return (
    <div className={s.dropdown} role="dialog" aria-modal="true" ref={ref} style={style}>
      {elements.map((element, i) => (
        <button
          type="button"
          key={element.type}
          data-type={element.type}
          onMouseDown={(e) => handleBlockClick(e, element.type)}
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
