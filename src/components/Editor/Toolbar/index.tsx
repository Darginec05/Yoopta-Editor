import { useRef, useEffect, MouseEvent, useState } from "react";
import { Range, Editor } from "slate";
import cx from "classnames";
import { useSlate, ReactEditor } from "slate-react";
import { isMarkActive, toggleMark } from "../utils";
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

const TextDropdown = () => {
  return (
    <div className={s.dropdown}>
      <button type="button" className={cx(s.dropdownButton)}>
        <ParagraphIcon /> <span>Text</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <HeadingOneIcon /> <span>Heading 1</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <HeadingTwoIcon /> <span>Heading 2</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <HeadingThreeIcon /> <span>Heading 3</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <BulletedListIcon /> <span>Bulleted list</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <NumberedListIcon /> <span>Numbered list</span>
      </button>
      <button type="button" className={cx(s.dropdownButton, )}>
        <BlockQuoteIcon /> <span>Blockquote</span>
      </button>
    </div>
  );
};

const Toolbar = () => {
  const ref = useRef<HTMLDivElement | null | any>();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const editor = useSlate();

  const toggleTextDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
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

    el.style.top = "800.9375px";
    el.style.left = "301.9375px";

    // el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    // el.style.left = `${
    //   rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    // }px`;
  };

  useEffect(() => showToolbar());

  const onMouseDown = (e: MouseEvent<HTMLButtonElement>, format: string) => {
    e.preventDefault();
    toggleMark(editor, format);
  };

  console.log({ isDropdownOpen });

  return (
    <div ref={ref} className={s.menu}>
      <div className={s.toolbar}>
        {isDropdownOpen && <TextDropdown />}
        <button
          type="button"
          className={s.button}
          onMouseDown={toggleTextDropdown}
        >
          Heading 1
        </button>
        <button type="button" className={s.button}>
          <LinkIcon /> <span>Link</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => onMouseDown(e, "bold")}
          className={cx(s.button, isMarkActive(editor, "bold") && s.__active)}
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => onMouseDown(e, "italic")}
          className={cx(s.button, isMarkActive(editor, "italic") && s.__active)}
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => onMouseDown(e, "underline")}
          className={cx(
            s.button,
            isMarkActive(editor, "underline") && s.__active
          )}
        >
          <UnderlineIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => onMouseDown(e, "strike")}
          className={cx(s.button, isMarkActive(editor, "strike") && s.__active)}
        >
          <StrikeIcon />
        </button>
        <button
          type="button"
          onMouseDown={(e) => onMouseDown(e, "code")}
          className={cx(s.button, isMarkActive(editor, "code") && s.__active)}
        >
          <CodeIcon />
        </button>
      </div>
    </div>
  );
};

export { Toolbar };
