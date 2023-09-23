import { getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';
import { ReactNode } from 'react';
import FileIcon from '../icons/file.svg';
import { FileElement } from '../types';
import s from './File.module.scss';

type Props = RenderYooptaElementProps<FileElement> & { children?: ReactNode };

function formatBytesToKilobytes(bytes) {
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    return null;
  }
  const kilobytes = bytes / 1024;
  return kilobytes.toFixed(2) + ' KB';
}

const File = ({ attributes, element, children, HTMLAttributes }: Props) => {
  if (!element.data.url) return <div {...attributes} />;

  return (
    <div {...attributes} className={s.fileElement} contentEditable={false} draggable={false}>
      <a
        target="_blank"
        href={element.data.url}
        className={getElementClassname<FileElement>({ element, HTMLAttributes, className: s.file })}
      >
        <div className={s.fileContent}>
          <FileIcon height={20} width={20} />
          <div className={s.fileContentText}>
            {element.data.name}
            <span className={s.fileContentTextSize}>{formatBytesToKilobytes(element.data.size)}</span>
          </div>
        </div>
      </a>
      {children}
    </div>
  );
};

export { File };
