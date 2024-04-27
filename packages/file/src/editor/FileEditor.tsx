import { FileRender } from '../render/FileRender';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useBlockSelected,
  useYooptaReadOnly,
} from '@yoopta/editor';
import { Placeholder } from './Placeholder';
import { FileBlockOptions } from './FileBlockOptions';

const FileEditor = ({ element, attributes, children, blockId }: PluginElementRenderProps) => {
  const { src } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const blockSelected = useBlockSelected({ blockId });

  if (!src) {
    return (
      <Placeholder attributes={attributes} blockId={blockId}>
        {children}
      </Placeholder>
    );
  }

  return (
    <div
      data-element-type={element.type}
      contentEditable={false}
      draggable={false}
      className="yoo-file-mt-4 yoo-file-relative yoo-file-flex"
    >
      {blockSelected && (
        <div className="yoo-file-absolute yoo-file-pointer-events-none yoo-file-inset-0 yoo-file-bg-[rgba(35,131,226,0.14)] yoo-file-z-[81] yoo-file-rounded-[3px] yoo-file-opacity-100 yoo-file-transition-opacity yoo-file-duration-150 yoo-file-ease-in" />
      )}
      <FileRender attributes={attributes} element={element} block={block}>
        {children}
      </FileRender>
      {!isReadOnly && <FileBlockOptions block={block} editor={editor} props={element.props} />}
    </div>
  );
};

export { FileEditor };
