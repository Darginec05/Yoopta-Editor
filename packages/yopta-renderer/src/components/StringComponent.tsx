import { useState, useLayoutEffect, useEffect, memo, forwardRef, useRef } from 'react';

export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const StringComponent = (props: { isLast: boolean; leaf: any; parent: any; text: any }) => {
  const { isLast, leaf, parent, text } = props;

  if (isLast && leaf.text.slice(-1) === '\n') {
    return <TextString isTrailing text={leaf.text} />;
  }

  return <TextString text={leaf.text} />;
};

const TextString = (props: { text: string; isTrailing?: boolean }) => {
  const { text, isTrailing = false } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const getTextContent = () => `${text ?? ''}${isTrailing ? '\n' : ''}`;

  const [initialText] = useState(getTextContent);

  useLayoutEffect(() => {
    const textWithTrailing = getTextContent();

    if (ref.current && ref.current.textContent !== textWithTrailing) {
      ref.current.textContent = textWithTrailing;
    }
  });

  return <MemoizedText ref={ref}>{initialText}</MemoizedText>;
};

const MemoizedText = memo(
  forwardRef<HTMLSpanElement, { children: string }>((props, ref) => {
    return (
      <span data-slate-string ref={ref}>
        {props.children}
      </span>
    );
  }),
);

export const ZeroWidthString = (props: { length?: number; isLineBreak?: boolean; isMarkPlaceholder?: boolean }) => {
  const { length = 0, isLineBreak = false, isMarkPlaceholder = false } = props;

  const attributes = {
    'data-slate-zero-width': isLineBreak ? 'n' : 'z',
    'data-slate-length': length,
  };

  if (isMarkPlaceholder) {
    attributes['data-slate-mark-placeholder'] = true;
  }

  return <span {...attributes}>{isLineBreak ? <br /> : null}</span>;
};

export { StringComponent };
