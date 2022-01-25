import { useRef, useEffect, MouseEvent, useState, ReactNode } from "react";
import { Range, Editor } from "slate";
import cx from "classnames";
import { useSlate, ReactEditor } from "slate-react";
import { isMarkActive, isBlockActive, toggleBlock, toggleMark, unwrapLink } from "../utils";
import { ReactComponent as LinkIcon } from "./icons/link.svg";
import { ReactComponent as BoldIcon } from "./icons/bold.svg";
import { ReactComponent as ItalicIcon } from "./icons/italic.svg";
import { ReactComponent as UnderlineIcon } from "./icons/underline.svg";
import { ReactComponent as StrikeIcon } from "./icons/strike.svg";
import { ReactComponent as CodeIcon } from "./icons/code.svg";
import { ReactComponent as ParagraphIcon } from "./icons/paragraph.svg";
import { ReactComponent as HeadingOneIcon } from "./icons/heading_one.svg";
import { ReactComponent as HeadingTwoIcon } from "./icons/heading_two.svg";
import { ReactComponent as HeadingThreeIcon } from "./icons/heading_three.svg";
import { ReactComponent as BulletedListIcon } from "./icons/bulleted_list.svg";
import { ReactComponent as NumberedListIcon } from "./icons/numbered_list.svg";
import { ReactComponent as BlockQuoteIcon } from "./icons/blockquote.svg";
import s from "./Toolbar.module.scss";

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

const ELEMENT_TYPES: Block[] = [
  { icon: <ParagraphIcon />, name: "Text", type: "paragraph" },
  { icon: <HeadingOneIcon />, name: "Heading 1", type: "heading-one" },
  { icon: <HeadingTwoIcon />, name: "Heading 2", type: "heading-two" },
  { icon: <HeadingThreeIcon />, name: "Heading 3", type: "heading-three" },
  { icon: <BulletedListIcon />, name: "Bulleted List", type: "bulleted-list" },
  { icon: <NumberedListIcon />, name: "Numbered List", type: "numbered-list" },
  { icon: <BlockQuoteIcon />, name: "Blockquote", type: "block-quote" },
];

const defaultBlock: Block = {
  name: "Heading 1",
  type: "heading-one",
  icon: null,
};

const TextDropdown = ({ handleBlockClick, activeElementType }) => {
  return (
    <div className={s.dropdown}>
      {ELEMENT_TYPES.map((element) => (
        <button
          onMouseDown={(e) => handleBlockClick(e, element.type)}
          type="button"
          className={cx(
            s.dropdownButton,
            activeElementType === element.type && s.__active
          )}
          key={element.type}
        >
          {element.icon} <span>{element.name}</span>
        </button>
      ))}
    </div>
  );
};

const Toolbar = () => {
  const editor = useSlate();
  const ref = useRef<HTMLDivElement | null | any>();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activeBlock, setActiveBlock] = useState<Block>(defaultBlock);

  const toggleTextDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const setCurrentBlock = () => {
    const current = ELEMENT_TYPES.find((elem) =>
      isBlockActive(editor, elem.type)
    );
    setActiveBlock(current || defaultBlock);
  };

  const showToolbar = () => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection()!;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";

    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCurrentBlock();
    showToolbar();
  });

  const handleMarkClick = (e: MouseEvent<HTMLButtonElement>, mark: string) => {
    e.preventDefault();
    toggleMark(editor, mark);
  };

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    toggleBlock(editor, type);
    toggleTextDropdown(e);
  };

  const isLinkActive = isBlockActive(editor, "link");

  const toggleLink = () => {
    if (isLinkActive) {
      unwrapLink(editor)
    }
  };

  return (
    <div ref={ref} className={s.menu}>
      <div className={s.toolbar}>
        {isDropdownOpen && (
          <TextDropdown
            handleBlockClick={handleBlockClick}
            activeElementType={activeBlock.type}
          />
        )}
        <button
          type="button"
          className={s.button}
          onMouseDown={toggleTextDropdown}
        >
          {activeBlock?.name}
        </button>
        <button
          type="button"
          className={cx(s.button, isLinkActive && s.__active)}
          onMouseDown={toggleLink}
        >
          <LinkIcon /> <span>Link</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleMarkClick(e, "bold")}
          className={cx(s.button, isMarkActive(editor, "bold") && s.__active)}
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleMarkClick(e, "italic")}
          className={cx(s.button, isMarkActive(editor, "italic") && s.__active)}
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleMarkClick(e, "underline")}
          className={cx(
            s.button,
            isMarkActive(editor, "underline") && s.__active
          )}
        >
          <UnderlineIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleMarkClick(e, "strike")}
          className={cx(s.button, isMarkActive(editor, "strike") && s.__active)}
        >
          <StrikeIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleMarkClick(e, "code")}
          className={cx(s.button, isMarkActive(editor, "code") && s.__active)}
        >
          <CodeIcon />
        </button>
      </div>
    </div>
  );
};

export { Toolbar };
