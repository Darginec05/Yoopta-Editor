import { MouseEvent, useState } from 'react';
import { Editor } from 'slate';
import cx from 'classnames';
import { isMarkActive, toggleMark, getMatchedNode } from '../utils';
import { ReactComponent as LinkIcon } from './icons/link.svg';
import { ReactComponent as BoldIcon } from './icons/bold.svg';
import { ReactComponent as ItalicIcon } from './icons/italic.svg';
import { ReactComponent as UnderlineIcon } from './icons/underline.svg';
import { ReactComponent as StrikeIcon } from './icons/strike.svg';
import { ReactComponent as CodeIcon } from './icons/code.svg';
import { Fade } from '../../Fade';
import { LinkInput } from '../../LinkInput';

import s from './Toolbar.module.scss';
import { useActionMenuContext } from '../../../contexts/ActionMenuContext/ActionMenuContext';

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const [isLinkOpen, setLinkOpen] = useState<boolean>(false);
  const { toolbarRef, toolbarStyle, showSuggestionList, hideSuggestionList, isSuggesstionListOpen, selectedElement } =
    useActionMenuContext();

  const toggleElementsListDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLinkOpen) setLinkOpen(false);

    const toolbarRect = toolbarRef.current!.getBoundingClientRect();

    if (isSuggesstionListOpen) {
      hideSuggestionList();
    } else {
      showSuggestionList({ ...toolbarStyle, top: (toolbarStyle!.top as number) + toolbarRect.height });
    }
  };

  const toggleLinkInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLinkOpen(!isLinkOpen);
  };

  const handleMarkClick = (e: MouseEvent<HTMLButtonElement>, mark: string) => {
    e.preventDefault();
    toggleMark(editor, mark);
  };

  const linkNode = getMatchedNode(editor, 'link');

  return (
    <div ref={toolbarRef} className={s.menu} style={toolbarStyle}>
      <div className={s.toolbar}>
        <Fade show={isLinkOpen} animationDelay={300}>
          <LinkInput editor={editor} linkNode={linkNode} onClose={() => setLinkOpen(false)} />
        </Fade>
        <button type="button" className={s.button} onMouseDown={toggleElementsListDropdown}>
          {selectedElement?.name}
        </button>
        <button type="button" className={cx(s.button, !!linkNode && s.__active)} onMouseDown={toggleLinkInput}>
          <LinkIcon />
          {' '}
          <span>Link</span>
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
      {/* )} */}
    </div>
  );
};

export { Toolbar };
