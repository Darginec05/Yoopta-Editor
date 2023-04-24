import { cx } from '@yopta/editor';
import { CSSProperties, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
// import { isInViewport } from '../utils/isInViewport';
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
      type: 'bubble';
      children: (props: ToolbarProps) => JSX.Element;
    };

const STYLES: CSSProperties = { position: 'relative' };

const Toolbar = ({ type = 'bubble', style, marks, children, editorRef }: Props) => {
  const editor = useSlate();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarProps, setToolbarProps] = useState({ open: false, style: {} });

  const isFixedToolbar = type === 'fixed';

  const hideToolbar = () => {
    setToolbarProps({ open: false, style: {} });
  };

  const updateToolbarPosition = () => {
    const selectionRect = getRectByCurrentSelection();

    const top = selectionRect.top - toolbarRef.current!.offsetHeight - selectionRect.height / 4;
    let left = selectionRect.left + window.pageXOffset - toolbarRef.current!.offsetWidth / 2 + selectionRect.width / 2;

    left = left < 0 ? 10 : left;

    setToolbarProps({ open: true, style: { top, left, opacity: 1 } });
  };

  useEffect(() => {
    if (isFixedToolbar) return setToolbarProps({ open: true, style: {} });
    if (!editor.selection || !toolbarRef.current) return hideToolbar();

    const [, firstElementPath] = Editor.first(editor, [0]);
    const [, lastElementPath] = Editor.last(editor, [editor.children.length - 1]);

    const fullRange = Editor.range(editor, firstElementPath, lastElementPath);
    const isAllNodesSelected = Range.equals(editor.selection, fullRange);

    const isExpanded = Range.isExpanded(editor.selection) && Editor.string(editor, editor.selection).trim() !== '';
    if (!isExpanded || (isAllNodesSelected && editor.children.length > 1)) return hideToolbar();

    updateToolbarPosition();
  }, [editor.selection]);

  useEffect(() => {
    const editorEl = document.getElementById('yopta-contenteditable');

    if (toolbarProps.open) {
      editorEl!.addEventListener('blur', hideToolbar);
      window.addEventListener('scroll', updateToolbarPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateToolbarPosition);
      editorEl!.removeEventListener('blur', hideToolbar);
    };
  }, [toolbarProps.open, editorRef.current]);

  const checkIsMarkActive = (mark) => {
    const marks = Editor.marks(editor);
    const checkIsMarkActive = !!marks?.[mark];
    return checkIsMarkActive;
  };

  const toggleMark = (mark: any, only: boolean = false) => {
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

  const marksMap = useMemo(() => {
    const mapper: MarkMap = {};

    marks.forEach((mark) => {
      mapper[mark] = {
        toggle: (options) => toggleMark(mark, options?.only),
        isActive: checkIsMarkActive(mark),
      };
    });

    return mapper;
  }, [marks]);

  const childrenProps: ToolbarProps = {
    getRootProps,
    marks: marksMap,
  };

  if (typeof children === 'function') {
    return <div style={STYLES}>{children(childrenProps)}</div>;
  }

  return (
    <div {...getRootProps()}>
      <div className={s.toolbar}>
        <div className={s.marks}>
          {marks?.map((mark) => {
            const marks = Editor.marks(editor);
            const checkIsMarkActive = !!marks?.[mark];

            return (
              <button
                key={mark}
                type="button"
                className={cx(s.mark, { [s.active]: checkIsMarkActive })}
                onClick={() => toggleMark(mark)}
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
