import { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { ReactEditor, useFocused, useSelected, useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { EmbedElement } from '../Editor/types';
import { MediaEditorOptions } from '../MediaEditorOptions';
import { ELEMENT_TYPES_MAP } from '../Editor/constants';
import { EmbedRender } from '../EmbedRender/EmbedRender';
import { LinkInput } from '../LinkInput';
import { Fade } from '../Fade';
import { OutsideClick } from '../OutsideClick';
import { getDefaultParagraphLine } from '../Editor/utils';
import s from './EmbedEditor.module.scss';
import { generateId } from '../../utils/generateId';

type Props = { element: EmbedElement; className: string; attributes: any; children: ReactNode };

const EmbedEditor: FC<Props> = ({ element, attributes, className, children }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const [isLinkInputOpen, setIsLinkInputOpen] = useState(false);

  const handleChangeEmbedUrl = (url: string) => {
    const embed: EmbedElement = {
      id: generateId(),
      type: 'embed',
      children: [{ text: '' }],
      src: url,
      title: '',
      isVoid: true,
    };

    Transforms.setNodes<EmbedElement>(editor, embed, { at: editor.selection?.anchor, voids: true });

    if (editor.selection) {
      Transforms.select(editor, editor.selection);
    }
  };

  const onDelete = () => {
    const isLastDeleted = editor.children.length === 1;

    if (isLastDeleted) {
      const lineParagraph = getDefaultParagraphLine();

      Transforms.setNodes(editor, lineParagraph, {
        mode: 'lowest',
        at: [0, 0],
        match: (n) => Editor.isEditor(editor) && SlateElement.isElement(n),
      });

      const focusTimeout = setTimeout(() => {
        Transforms.select(editor, { path: [0, 0], offset: 0 });
        ReactEditor.focus(editor);

        clearTimeout(focusTimeout);
      }, 0);
    } else {
      const path = ReactEditor.findPath(editor, element);
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ELEMENT_TYPES_MAP.embed,
        at: path,
      });
    }
  };

  const linkNode = (
    <Fade show={isLinkInputOpen} animationDelay={100}>
      <OutsideClick onClose={() => setIsLinkInputOpen(false)}>
        <LinkInput
          linkUrl={element.src || ''}
          onClose={() => setIsLinkInputOpen(false)}
          onRemove={() => {}}
          onAdd={handleChangeEmbedUrl}
          placeholder="Paste embed url"
        />
      </OutsideClick>
    </Fade>
  );

  if (element.src) {
    return (
      <div
        draggable={false}
        {...attributes}
        contentEditable={false}
        className={cx(className, { [s.selected]: selected && focused })}
      >
        {linkNode}
        <div className={s.options}>
          <MediaEditorOptions
            hasUrl={!!element.src}
            handleDelete={onDelete}
            handleChangeUrl={() => setIsLinkInputOpen(true)}
          />
        </div>
        <EmbedRender src={element.src} title={element.title} />
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      draggable={false}
      {...attributes}
      contentEditable={false}
      className={cx(className, s.editorLayout)}
      onClick={() => setIsLinkInputOpen(true)}
    >
      {linkNode}
      <span className={s.text}>Click to embed</span>
      <div className={s.options}>
        <MediaEditorOptions
          hasUrl={!!element.src}
          handleDelete={onDelete}
          handleChangeUrl={() => setIsLinkInputOpen(true)}
        />
      </div>
      {children}
    </button>
  );
};

export { EmbedEditor };
