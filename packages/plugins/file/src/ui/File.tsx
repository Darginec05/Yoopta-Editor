import { FileComponent } from './FileComponent';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useBlockSelected,
  useYooptaReadOnly,
} from '@yoopta/editor';
import { Placeholder } from './Placeholder';
import { FileBlockOptions } from './FileBlockOptions';

const FileRender = ({ element, attributes, children, blockId, extendRender }: PluginElementRenderProps) => {
  const { name, src, format, size } = element.props || {};
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

  const component = extendRender ? (
    extendRender({ element, attributes, children, blockId })
  ) : (
    <FileComponent name={name} format={format} src={src} size={size} blockId={blockId} align={block.meta.align} />
  );

  return (
    <div
      contentEditable={false}
      draggable={false}
      className={`yoo-file-mt-4 yoo-file-relative yoo-file-flex yoopta-file`}
      {...attributes}
    >
      {blockSelected && (
        <div className="yoo-file-absolute yoo-file-pointer-events-none yoo-file-inset-0 yoo-file-bg-[rgba(35,131,226,0.14)] yoo-file-z-[81] yoo-file-rounded-[3px] yoo-file-opacity-100 yoo-file-transition-opacity yoo-file-duration-150 yoo-file-ease-in" />
      )}
      {component}
      {!isReadOnly && <FileBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

export { FileRender };
