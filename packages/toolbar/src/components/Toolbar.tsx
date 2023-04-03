import { cx } from '@yopta/editor';
import { CSSProperties, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import { getRectByCurrentSelection } from '../utils/selectionRect';
import s from './Toolbar.module.scss';

type RootProps = {
  className: string;
  ref: RefObject<HTMLDivElement>;
  style?: CSSProperties;
};

type MarkMap = { [key: string]: { toggle: (options?: { only: boolean }) => void; isActive: boolean } };

export type ToolbarProps = {
  getRootProps: () => RootProps;
  marks: MarkMap;
};

type FixedProps =
  | {
      type: 'fixed';
      style: CSSProperties;
      className?: CSSProperties;
    }
  | {
      type: 'fixed';
      style?: CSSProperties;
      className: CSSProperties;
    };

type Props =
  | FixedProps
  | {
      style: CSSProperties;
      type: 'bubble' | 'fixed' | 'floating';
      children: (props: ToolbarProps) => JSX.Element;
    };

const Toolbar = ({ type = 'bubble', style, marks, children }: Props) => {
  const editor = useSlate();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarProps, setToolbarProps] = useState({ open: false, style: {} });

  const isFixedToolbar = type === 'fixed';

  useEffect(() => {
    if (isFixedToolbar) return setToolbarProps({ open: true, style: {} });
    if (!editor.selection || !toolbarRef.current) return setToolbarProps({ open: false, style: {} });

    const isExpanded = Range.isExpanded(editor.selection) && Editor.string(editor, editor.selection).trim() !== '';
    if (!isExpanded) return setToolbarProps({ open: false, style: {} });

    const selectionRect = getRectByCurrentSelection();

    const top = selectionRect.top - toolbarRef.current.offsetHeight - selectionRect.height / 4;
    let left = selectionRect.left + window.pageXOffset - toolbarRef.current.offsetWidth / 2 + selectionRect.width / 2;

    left = left < 0 ? 10 : left;

    setToolbarProps({ open: true, style: { top, left, opacity: 1 } });
  }, [editor.selection]);

  const checkIsMarkActive = (mark) => {
    const marks = Editor.marks(editor);
    const checkIsMarkActive = !!marks?.[mark];
    return checkIsMarkActive;
  };

  const toggleMark = (mark: string, only: boolean = false) => {
    if (only) {
      Object.keys(Editor.marks(editor) || {}).forEach((activeMark) => {
        Editor.removeMark(editor, activeMark);
      });
    }

    if (!checkIsMarkActive(mark)) Editor.addMark(editor, mark, true);
    else Editor.removeMark(editor, mark);
  };

  const getRootProps = (): RootProps => ({
    className: s.toolbarRoot,
    ref: toolbarRef,
    style: isFixedToolbar ? style : toolbarProps.style,
  });

  const MARKS_TYPE = useMemo(() => {
    const markMap: MarkMap = {};

    marks.forEach((mark) => {
      markMap[mark] = {
        toggle: (options) => toggleMark(mark, options?.only),
        isActive: checkIsMarkActive(mark),
      };
    });

    return markMap;
  }, [marks]);

  const childrenProps: ToolbarProps = {
    getRootProps,
    marks: MARKS_TYPE,
  };

  if (typeof children === 'function') {
    return children(childrenProps);
  }

  return (
    <div {...getRootProps()}>
      <div className={s.toolbar}>
        {/* <button className={s.group}>
          <span className={s.text}>Ask ChatGTP</span>
        </button>
        <button className={s.group}>
          <span className={s.text}>Lol</span>
        </button> */}
        <div className={s.marks}>
          {marks?.map((mark) => {
            const marks = Editor.marks(editor);
            const checkIsMarkActive = !!marks?.[mark];

            return (
              <button
                key={mark}
                type="button"
                className={cx(s.mark, { [s.active]: checkIsMarkActive })}
                onClick={() => toggleMark(mark, checkIsMarkActive)}
              >
                {mark}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Toolbar };
