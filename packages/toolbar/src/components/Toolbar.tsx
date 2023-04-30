import { cx, useYopta } from '@yopta/editor';
import { CSSProperties, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
// import { isInViewport } from '../utils/isInViewport';
import { getRectByCurrentSelection } from '../utils/selectionRect';
import { DefaultToolbar } from './DefaultToolbar';
import s from './DefaultToolbar.module.scss';

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
      style?: CSSProperties;
      className?: CSSProperties;
      render?: (props: ToolbarProps) => JSX.Element;
    }
  | {
      type: 'fixed';
      style?: CSSProperties;
      className: CSSProperties;
      render?: (props: ToolbarProps) => JSX.Element;
    };

type Props =
  | FixedProps
  | {
      style?: CSSProperties;
      type: 'bubble';
      render?: (props: ToolbarProps) => JSX.Element;
    };

const STYLES: CSSProperties = { position: 'relative' };

const Toolbar = ({ type = 'bubble', style, render }: Props) => {
  const editor = useSlate();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarProps, setToolbarProps] = useState({ open: false, style: {} });
  const { marks } = useYopta();

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
      // editorEl!.addEventListener('blur', hideToolbar);
      window.addEventListener('scroll', updateToolbarPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateToolbarPosition);
      // editorEl!.removeEventListener('blur', hideToolbar);
    };
  }, [toolbarProps.open]);

  const getRootProps = (): RootProps => ({
    className: s.toolbarRoot,
    ref: toolbarRef,
    style: isFixedToolbar ? style : toolbarProps.style,
  });

  const renderProps: ToolbarProps = {
    getRootProps,
    marks,
  };

  if (typeof render === 'function') {
    return <div style={STYLES}>{render(renderProps)}</div>;
  }

  return <DefaultToolbar {...renderProps} />;
};

export { Toolbar };
