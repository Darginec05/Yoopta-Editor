import { FileComponent } from './FileComponent';
import {
  useBlockData,
  PluginElementRenderProps,
  useYooptaEditor,
  useYooptaPluginOptions,
  useBlockSelected,
  useYooptaReadOnly,
} from '@yoopta/editor';
import { Resizable, ResizableProps } from 're-resizable';
import { useEffect, useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import { FilePluginOptions } from '../types';
import { FileBlockOptions } from './FileBlockOptions';

const FileRender = ({ element, attributes, children, blockId }: PluginElementRenderProps) => {
  const { name, src, format, size } = element.props || {};
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const options = useYooptaPluginOptions<FilePluginOptions>('File');
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
      className="yoo-file-mt-4 yoo-file-relative yoo-file-flex yoopta-file"
      {...attributes}
    >
      {blockSelected && (
        <div className="yoo-file-absolute yoo-file-pointer-events-none yoo-file-inset-0 yoo-file-bg-[rgba(35,131,226,0.14)] yoo-file-z-[81] yoo-file-rounded-[3px] yoo-file-opacity-100 yoo-file-transition-opacity yoo-file-duration-150 yoo-file-ease-in" />
      )}
      <FileComponent name={name} format={format} src={src} size={size} blockId={blockId} />
      {!isReadOnly && <FileBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

export { FileRender };
