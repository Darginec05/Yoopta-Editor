import { UI, useYooptaTools } from '@yoopta/editor';
import { Copy, Globe } from 'lucide-react';
import { useState } from 'react';

const { Overlay, Portal } = UI;

const LinkHoverPreview = ({ style, setFloating, element }) => {
  console.log('element', element);
  const tools = useYooptaTools();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const LinkTool = tools?.LinkTool;
  const hasLinkTool = !!LinkTool;

  return (
    <Portal id="yoopta-link-preview">
      <div className="yoopta-link-preview" style={style} ref={setFloating}>
        {isToolsOpen ? (
          <LinkTool />
        ) : (
          <>
            <Globe size={14} strokeWidth={1} />
            <span className="yoopta-link-preview-text">{element.props.url}</span>
            <span onClick={() => setIsToolsOpen(true)}>Edit</span>
          </>
        )}
      </div>
    </Portal>
  );
};

export { LinkHoverPreview };
