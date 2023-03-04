import { forwardRef, ReactNode, useEffect, CSSProperties, useRef, useMemo, useState } from 'react';
import cx from 'classnames';
import ParagraphIcon from '../Toolbar/icons/paragraph.svg';
import HeadingOneIcon from '../Toolbar/icons/heading_one.svg';
import HeadingTwoIcon from '../Toolbar/icons/heading_two.svg';
import HeadingThreeIcon from '../Toolbar/icons/heading_three.svg';
import BulletedListIcon from '../Toolbar/icons/bulleted_list.svg';
import NumberedListIcon from '../Toolbar/icons/numbered_list.svg';
import BlockQuoteIcon from '../Toolbar/icons/blockquote.svg';
import CodeIcon from '../Toolbar/icons/code.svg';
import CalloutIcon from '../Toolbar/icons/callout.svg';
import VideoIcon from '../../../icons/video.svg';
import ImageIcon from '../../../icons/image.svg';
import EmbedIcon from '../../../icons/embed.svg';
import { ELEMENT_TYPES_MAP } from '../constants';
import { useNodeSettingsContext } from '../../../contexts/NodeSettingsContext/NodeSettingsContext';
import s from './SuggestionElementList.module.scss';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
  keywords: string;
};

export const ELEMENT_TYPES: Block[] = [
  { icon: <ParagraphIcon />, keywords: 'text paragraph', name: 'Text', type: ELEMENT_TYPES_MAP.paragraph },
  {
    icon: <HeadingOneIcon />,
    keywords: 'heading 1 one title h1',
    name: 'Heading 1',
    type: ELEMENT_TYPES_MAP['heading-one'],
  },
  {
    icon: <HeadingTwoIcon />,
    keywords: 'Heading 2 two subtitle h2',
    name: 'Heading 2',
    type: ELEMENT_TYPES_MAP['heading-two'],
  },
  {
    icon: <HeadingThreeIcon />,
    keywords: 'Heading 3 h3 three',
    name: 'Heading 3',
    type: ELEMENT_TYPES_MAP['heading-three'],
  },
  {
    icon: <BulletedListIcon />,
    keywords: 'bulleted list',
    name: 'Bulleted List',
    type: ELEMENT_TYPES_MAP['bulleted-list'],
  },
  {
    icon: <NumberedListIcon />,
    keywords: 'numbered list num',
    name: 'Numbered List',
    type: ELEMENT_TYPES_MAP['numbered-list'],
  },
  {
    icon: <NumberedListIcon />,
    keywords: 'todo list',
    name: 'Todo list',
    type: 'todo-list',
  },
  { icon: <BlockQuoteIcon />, keywords: 'blockquote', name: 'Blockquote', type: ELEMENT_TYPES_MAP['block-quote'] },
  { icon: <CalloutIcon />, keywords: 'callout', name: 'Callout', type: ELEMENT_TYPES_MAP.callout },
  { icon: <CodeIcon />, keywords: 'code bug', name: 'Code', type: ELEMENT_TYPES_MAP.code },
  { icon: <ImageIcon />, keywords: 'image picture', name: 'Image', type: ELEMENT_TYPES_MAP.image },
  { icon: <VideoIcon />, keywords: 'video', name: 'Video', type: ELEMENT_TYPES_MAP.video },
  { icon: <EmbedIcon />, keywords: 'embed', name: 'Embed', type: ELEMENT_TYPES_MAP.embed },
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
  const [focusableElement, setFocusableElement] = useState(0);

  const elements = useMemo(
    () => (typeof filterListCallback === 'function' ? ELEMENT_TYPES.filter(filterListCallback) : ELEMENT_TYPES),
    [filterListCallback],
  );

  const elementListRef = useRef<HTMLOListElement>(null);

  // eslint-disable-next-line no-confusing-arrow
  const isBlockActive = (elem: Block) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    selectedElementType ? selectedElementType === elem.type : elements[0].type === elem.type;

  const notFound = elements.length === 0;

  useEffect(() => {
    if (notFound && onClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [notFound]);

  const handleChangeNode = (e: any, type: string) => {
    e.stopPropagation();
    e.preventDefault();

    closeNodeSettings();
    changeNodeType(type);
  };

  useEffect(() => {
    if (!isOpen) {
      return setFocusableElement(0);
    }

    const firstListItemDomElement = elementListRef.current?.childNodes[0] as HTMLLIElement | undefined;
    firstListItemDomElement?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const listNodes = elementListRef.current?.childNodes;
    if (listNodes && focusableElement > listNodes.length - 1) {
      setFocusableElement(0);
    }

    const handleKeyDown = (event) => {
      const isEscape = event.key === 'Escape';
      const isEnter = event.key === 'Enter';
      const isTab = event.key === 'Tab';
      const isArrowDown = event.key === 'ArrowDown';
      const isArrowUp = event.key === 'ArrowUp';

      if (isTab) {
        event.preventDefault();
      }

      if (isEscape) {
        event.preventDefault();
        return onClose?.();
      }

      if (isArrowDown) {
        event.preventDefault();

        const nextElementIndex = focusableElement + 1;
        const focusableElementIndex = nextElementIndex > listNodes!.length - 1 ? 0 : nextElementIndex;
        setFocusableElement(focusableElementIndex);

        const selectedNodeEl = listNodes?.[focusableElementIndex] as HTMLLIElement | undefined;
        selectedNodeEl?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return;
      }

      if (isArrowUp) {
        event.preventDefault();

        const prevElementIndex = focusableElement - 1;
        const focusableElementIndex = prevElementIndex < 0 ? listNodes!.length - 1 : prevElementIndex;
        setFocusableElement(focusableElementIndex);

        const selectedNodeEl = listNodes?.[focusableElementIndex] as HTMLLIElement | undefined;
        selectedNodeEl?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return;
      }

      if (isEnter) {
        event.preventDefault();
        event.stopPropagation();

        const selectedNodeEl = elementListRef.current?.childNodes[focusableElement] as HTMLLIElement | undefined;
        const dataType = selectedNodeEl?.dataset.type || 'paragraph';

        changeNodeType(dataType);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };

    // [TODO] - rewrite with useRef
  }, [isOpen, focusableElement, elements.length]);

  return (
    <div
      className={cx(s.dropdown, 'yopta-suggestion_list yopta-tools')}
      role="dialog"
      aria-modal="true"
      ref={ref}
      style={style}
    >
      <ul className={s.elementList} ref={elementListRef}>
        {elements.map((element, i) => (
          <li
            key={element.type}
            className={cx(s.elementListItem, {
              [s.__active]: isBlockActive(element),
              [s.hovered]: i === focusableElement,
            })}
            data-type={element.type}
          >
            <button
              type="button"
              onMouseDown={(e) => handleChangeNode(e, element.type)}
              className={s.button}
              aria-hidden
            >
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              {element.icon} <span>{element.name}</span>
            </button>
          </li>
        ))}
        {notFound && (
          <li className={s.elementListItem}>
            <button type="button" className={s.button}>
              <span>Not found</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
});

SuggestionElementList.displayName = 'SuggestionElementList';
