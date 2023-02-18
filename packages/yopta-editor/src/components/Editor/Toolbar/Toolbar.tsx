import { MouseEvent, useEffect, useState } from 'react';
import { Editor } from 'slate';
import cx from 'classnames';
import { isMarkActive, toggleMark, getMatchedNode, removeLinkNode, addLinkNode } from '../utils';
import LinkIcon from './icons/link.svg';
import BoldIcon from './icons/bold.svg';
import ItalicIcon from './icons/italic.svg';
import UnderlineIcon from './icons/underline.svg';
import StrikeIcon from './icons/strike.svg';
import CodeIcon from './icons/code.svg';
import { Fade } from '../../Fade';
import { LinkInput } from '../../LinkInput';
import { useActionMenuContext } from '../../../contexts/ActionMenuContext/ActionMenuContext';
import s from './Toolbar.module.scss';

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const [isLinkOpen, setLinkOpen] = useState<boolean>(false);
  const {
    toolbarRef,
    toolbarStyle,
    showSuggestionList,
    hideSuggestionList,
    isSuggesstionListOpen,
    selectedElement,
    isToolbarActionOpen,
  } = useActionMenuContext();

  const toggleElementsListDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLinkOpen) setLinkOpen(false);

    const toolbarRect = toolbarRef.current!.getBoundingClientRect();

    if (isSuggesstionListOpen) {
      hideSuggestionList();
    } else {
      showSuggestionList({ ...toolbarStyle, top: (toolbarStyle!.top as number) + toolbarRect.height, zIndex: 1400 });
    }
  };

  const toggleLinkInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hideSuggestionList();
    setLinkOpen(!isLinkOpen);
  };

  const handleMarkClick = (e: MouseEvent<HTMLButtonElement>, mark: string) => {
    e.preventDefault();
    setLinkOpen(false);
    toggleMark(editor, mark);
  };

  useEffect(() => {
    if (!isToolbarActionOpen) setLinkOpen(false);
  }, [isToolbarActionOpen]);

  const linkNode = getMatchedNode(editor, 'link');

  return (
    <div
      ref={toolbarRef}
      role="tooltip"
      className={cx(s.menu, 'yopta-toolbar yopta-tools')}
      style={toolbarStyle}
      contentEditable={false}
    >
      <div className={s.toolbar}>
        <Fade show={isLinkOpen} animationDelay={300}>
          <LinkInput
            linkUrl={linkNode?.[0]?.url}
            onClose={() => setLinkOpen(false)}
            onRemove={() => removeLinkNode(editor)}
            onAdd={(url: string) => addLinkNode(editor, url)}
            placeholder="type link"
          />
        </Fade>
        <button type="button" className={s.button} onMouseDown={toggleElementsListDropdown}>
          {selectedElement?.name}
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
  );
};

export { Toolbar };
