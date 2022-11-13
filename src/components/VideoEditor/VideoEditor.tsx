/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { ReactEditor, useFocused, useSelected, useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { v4 } from 'uuid';
import { MediaEditorLayout } from '../MediaEditorLayout';
import { VideoElement } from '../Editor/types';
import { VideoRender } from '../VideoRender/VideoRender';
import { Loader } from '../Loader';
import { MediaEditorOptions } from '../MediaEditorOptions';
import { ELEMENT_TYPES_MAP } from '../Editor/constants';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { OutsideClick } from '../OutsideClick';
import { LinkInput } from '../LinkInput';
import { Fade } from '../Fade';
import s from './VideoEditor.module.scss';

const toBase64 = (file: File): Promise<any> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

type Props = { element: VideoElement; className: string; attributes: any; children: ReactNode };

const VideoEditor: FC<Props> = ({ element, attributes, className, children }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const [isLinkInputOpen, setIsLinkInputOpen] = useState(false);

  const {
    options: { media },
  } = useSettings();

  const videoProps = media?.videoProps;
  const optimistic = typeof videoProps?.optimistic === 'boolean' ? videoProps?.optimistic : true;

  const onUpload = async (file: File) => {
    let video = {};

    if (optimistic) {
      const dataSrc = await toBase64(file);

      video = {
        id: v4(),
        type: 'video',
        children: [{ text: '' }],
        'data-src': dataSrc,
        src: null,
        isVoid: true,
      };

      Transforms.setNodes(editor, video, { at: editor.selection?.anchor });
    }

    if (typeof videoProps?.onChange === 'function') {
      const { url, options } = await videoProps.onChange(file);

      const newImage = {
        ...video,
        src: url,
        'data-src': null,
        options,
      };

      Transforms.setNodes(editor, newImage, { at: editor.selection?.anchor, voids: true });

      if (editor.selection) {
        Transforms.select(editor, editor.selection);
      }
    }
  };

  const dataSrc = element['data-src'];

  const onDelete = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ELEMENT_TYPES_MAP.video,
      at: path,
    });
  };

  const handleChangeUrl = (url: string) => {
    if (element.src === url) return;
    const updatedVideo = {
      ...element,
      src: url,
      'data-src': null,
    };

    Transforms.setNodes(editor, updatedVideo, { at: editor.selection?.anchor, voids: true });

    if (editor.selection) {
      Transforms.select(editor, editor.selection);
    }
  };

  const linkNode = (
    <Fade show={isLinkInputOpen} animationDelay={150}>
      <OutsideClick onClose={() => setIsLinkInputOpen(false)}>
        <LinkInput
          linkUrl={element.src || ''}
          onClose={() => setIsLinkInputOpen(false)}
          onRemove={() => {}}
          onAdd={handleChangeUrl}
          placeholder="Paste embed url"
        />
      </OutsideClick>
    </Fade>
  );

  if (element.src || dataSrc) {
    const loader = videoProps?.loader || (
      <div className={s.loader}>
        <Loader />
      </div>
    );

    return (
      <div
        draggable={false}
        {...attributes}
        contentEditable={false}
        className={cx(className, { [s.selected]: selected && focused })}
      >
        {linkNode}
        {optimistic && dataSrc ? (
          loader
        ) : (
          <div className={s.options}>
            {/* @ts-ignore */}
            <MediaEditorOptions
              hasUrl={!!element.src}
              handleDelete={onDelete}
              handleChangeUrl={() => setIsLinkInputOpen(true)}
            />
          </div>
        )}
        <VideoRender key="render_image" src={element.src || dataSrc} options={element.options} />
        {children}
      </div>
    );
  }

  return (
    <div draggable={false} {...attributes} contentEditable={false} className={className}>
      {linkNode}
      <div className={s.options}>
        <MediaEditorOptions
          hasUrl={!!element.src}
          handleDelete={onDelete}
          handleChangeUrl={() => setIsLinkInputOpen(true)}
        />
      </div>
      <MediaEditorLayout
        mediaType="video"
        onUpload={onUpload}
        nodeId={element.id}
        options={{
          accept: videoProps?.accept || 'video/*',
          multiple: videoProps?.multiple,
        }}
      />
      {children}
    </div>
  );
};

export { VideoEditor };
