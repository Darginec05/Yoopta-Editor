import { CSSProperties } from 'react';
import { YooptaRendererProps } from '../types';
import { BlocksRender } from './BlocksRender';

const YooptaRenderer = ({ value, marks, plugins, className, width }: YooptaRendererProps) => {
  const editorStyles: CSSProperties = {
    width,
    paddingBottom: 150,
  };

  return (
    <div id="yoopta-editor" className={className} style={editorStyles}>
      <BlocksRender value={value} marks={marks} plugins={plugins} />
    </div>
  );
};

export { YooptaRenderer };
