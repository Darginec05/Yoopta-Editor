import { CSSProperties, memo } from 'react';
import { RenderLeafProps } from 'slate-react';

type LeafProps = RenderLeafProps & { placeholder?: string; leaf: any };

const leafStyle: CSSProperties = {
  margin: '1px 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontWeight: 'inherit',
};

const TextLeaf = memo(({ attributes, children, placeholder, leaf }: LeafProps) => {
  return (
    <span {...attributes} data-placeholder={placeholder} style={leafStyle}>
      {children}
    </span>
  );
});

TextLeaf.displayName = 'TextLeaf';

export { TextLeaf };
