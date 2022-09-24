import { useRef, useEffect, MouseEvent, useState, ReactNode, FC } from 'react';
import { Range, Editor } from 'slate';
import cx from 'classnames';
import { useSlate, ReactEditor } from 'slate-react';
import {
  isMarkActive,
  isBlockActive,
  toggleBlock,
  toggleMark,
  getMatchedNode,
  getAbsPositionBySelection,
} from '../utils';
import { ReactComponent as LinkIcon } from './icons/link.svg';
import { ReactComponent as BoldIcon } from './icons/bold.svg';
import { ReactComponent as ItalicIcon } from './icons/italic.svg';
import { ReactComponent as UnderlineIcon } from './icons/underline.svg';
import { ReactComponent as StrikeIcon } from './icons/strike.svg';
import { ReactComponent as CodeIcon } from './icons/code.svg';
import { Fade } from '../../Fade';
import { LinkInput } from '../../LinkInput';
import { ElementsListDropdown, ELEMENT_TYPES } from '../ElementsListDropdown/ElementsListDropdown';
import { TEXT_ELEMENTS_LIST } from '../constants';

import s from './Toolbar.module.scss';
import { OutsideClick } from '../../OutsideClick';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

const defaultBlock: Block = {
  name: 'Heading 1',
  type: 'heading-one',
  icon: null,
};

type ToolbarProps = {};

const Toolbar: FC<ToolbarProps> = () => {
  const editor = useSlate();
  const ref = useRef<HTMLDivElement | null | any>();
  const elementsListDropdownRef = useRef<HTMLDivElement | null | any>();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isLinkOpen, setLinkOpen] = useState<boolean>(false);
  const [activeBlock, setActiveBlock] = useState<Block>(defaultBlock);

  const toggleElementsListDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLinkOpen) setLinkOpen(false);
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleLinkInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDropdownOpen) setDropdownOpen(false);
    setLinkOpen(!isLinkOpen);
  };

  const setCurrentBlock = () => {
    const current = ELEMENT_TYPES.find((elem) => isBlockActive(editor, elem.type));
    setActiveBlock(current || defaultBlock);
  };

  const hideElementsList = () => {
    elementsListDropdownRef.current!.style.opacity = '0';
    elementsListDropdownRef.current!.style.left = '-1000px';
    elementsListDropdownRef.current!.style.top = '-1000px';
  };

  const hideAllToolbarTools = () => {
    ref.current.removeAttribute('style');
    setLinkOpen(false);
    setDropdownOpen(false);
    hideElementsList();
  };

  const toggleToolbar = () => {
    const el = ref.current;
    const elementsListDropdown = elementsListDropdownRef.current;

    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      return hideAllToolbarTools();
    }

    if (elementsListDropdown) {
      const toolbarRect = el.getBoundingClientRect();
      const elementsListDropdownRect = elementsListDropdown.getBoundingClientRect();

      const isBottomPosition = toolbarRect.top < elementsListDropdownRect.height;

      elementsListDropdown.style.opacity = isDropdownOpen ? '1' : '0px';
      elementsListDropdown.style.left = isDropdownOpen ? '0px' : '-1000px';
      elementsListDropdown.style.top = isBottomPosition ? `${toolbarRect.height + 5}px` : 'auto';
      elementsListDropdown.style.bottom = isBottomPosition ? 'auto' : `${toolbarRect.height + 5}px`;
    }

    const { top, left } = getAbsPositionBySelection(el);

    el.style.opacity = '1';
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  };

  useEffect(() => {
    setCurrentBlock();
    toggleToolbar();
  });

  const handleMarkClick = (e: MouseEvent<HTMLButtonElement>, mark: string) => {
    e.preventDefault();
    toggleMark(editor, mark);
  };

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    toggleBlock(editor, type);
    toggleElementsListDropdown(e);
  };

  const linkNode = getMatchedNode(editor, 'link');

  return (
    <OutsideClick onClose={hideAllToolbarTools}>
      <div ref={ref} className={s.menu}>
        <div className={s.toolbar}>
          <ElementsListDropdown
            handleBlockClick={handleBlockClick}
            selectedElementType={activeBlock.type}
            filterListCallback={(item) => TEXT_ELEMENTS_LIST.includes(item.type)}
            ref={elementsListDropdownRef}
            style={{ position: 'absolute' }}
          />
          <Fade show={isLinkOpen} animationDelay={300}>
            <LinkInput editor={editor} linkNode={linkNode} onClose={() => setLinkOpen(false)} />
          </Fade>
          <button type="button" className={s.button} onMouseDown={toggleElementsListDropdown}>
            {activeBlock?.name}
          </button>
          <button type="button" className={cx(s.button, !!linkNode && s.__active)} onMouseDown={toggleLinkInput}>
            <LinkIcon /> <span>Link</span>
          </button>
          <button
            type="button"
            onMouseDown={(e) => handleMarkClick(e, 'bold')}
            className={cx(s.button, isMarkActive(editor, 'bold') && s.__active)}
          >
            <BoldIcon />
          </button>
          <button
            type="button"
            onMouseDown={(e) => handleMarkClick(e, 'italic')}
            className={cx(s.button, isMarkActive(editor, 'italic') && s.__active)}
          >
            <ItalicIcon />
          </button>
          <button
            type="button"
            onMouseDown={(e) => handleMarkClick(e, 'underline')}
            className={cx(s.button, isMarkActive(editor, 'underline') && s.__active)}
          >
            <UnderlineIcon />
          </button>
          <button
            type="button"
            onMouseDown={(e) => handleMarkClick(e, 'strike')}
            className={cx(s.button, isMarkActive(editor, 'strike') && s.__active)}
          >
            <StrikeIcon />
          </button>
          <button
            type="button"
            onMouseDown={(e) => handleMarkClick(e, 'code')}
            className={cx(s.button, isMarkActive(editor, 'code') && s.__active)}
          >
            <CodeIcon />
          </button>
        </div>
      </div>
    </OutsideClick>
  );
};

export { Toolbar };
