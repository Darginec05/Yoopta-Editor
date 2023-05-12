import { cx } from '@yoopta/editor';
import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import { getRectByCurrentSelection } from '../utils/selectionRect';
import { DefaultToolbar } from './DefaultToolbar';
import s from './DefaultToolbar.module.scss';

type RootProps = {
  className: string;
  ref: RefObject<HTMLDivElement>;
  style?: CSSProperties;
};

export type ToolbarProps = {
  getRootProps: () => RootProps;
};

type FixedProps = {
  // WORK IN PROGRESS
  type?: 'fixed';
  style?: CSSProperties;
  className?: string;
  render?: (props: ToolbarProps) => JSX.Element;
};

type BubleProps = {
  type?: 'bubble';
  style?: CSSProperties;
  className?: string;
  render?: (props: ToolbarProps) => JSX.Element;
};

type Props = FixedProps | BubleProps;

const STYLES: CSSProperties = { position: 'relative' };

const DEFAULT_BUBBLE_STYLE: CSSProperties = {
  bottom: 'auto',
  left: '-1000px',
  opacity: 0,
  position: 'fixed',
  right: 'auto',
  top: '-1000px',
};

const Toolbar = ({ type = 'bubble', style, className, render }: Props) => {
  const isFixedToolbar = type === 'fixed';

  const editor = useSlate();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarProps, setToolbarProps] = useState({ open: isFixedToolbar, style: DEFAULT_BUBBLE_STYLE });

  const hideToolbar = () => {
    setToolbarProps({ open: false, style: DEFAULT_BUBBLE_STYLE });
  };

  const updateToolbarPosition = () => {
    const selectionRect = getRectByCurrentSelection();

    const top = selectionRect.top - toolbarRef.current!.offsetHeight - selectionRect.height / 4;
    let left = selectionRect.left + window.pageXOffset - toolbarRef.current!.offsetWidth / 2 + selectionRect.width / 2;

    left = left < 0 ? 10 : left;

    setToolbarProps({ open: true, style: { ...toolbarProps.style, top, left, opacity: 1 } });
  };

  useEffect(() => {
    if (isFixedToolbar) return setToolbarProps({ open: true, style: DEFAULT_BUBBLE_STYLE });
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
    const editorEl = document.getElementById('yoopta-contenteditable');

    if (toolbarProps.open) {
      editorEl!.addEventListener('blur', hideToolbar);
      window.addEventListener('scroll', updateToolbarPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateToolbarPosition);
      editorEl!.removeEventListener('blur', hideToolbar);
    };
  }, [toolbarProps.open]);

  const getRootProps = (): RootProps => ({
    className: cx(s.toolbarRoot, { [s.toolbarFixed]: isFixedToolbar }, className),
    ref: toolbarRef,
    style: isFixedToolbar ? style : toolbarProps.style,
  });

  const renderProps: ToolbarProps = {
    getRootProps,
  };

  if (typeof render === 'function') {
    return (
      <div style={STYLES} className="yoopta-toolbar">
        {render(renderProps)}
      </div>
    );
  }

  return <DefaultToolbar {...renderProps} />;
};

export { Toolbar };
