import cx from 'classnames';
import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import { getElementClassname } from '../../Editor/utils';
import { EmbedEditor } from '../../EmbedEditor/EmbedEditor';
import { EmbedRender } from '../../EmbedRender/EmbedRender';
import s from './Embed.module.scss';

const Embed = memo<ElementProps>(({ element, attributes, isEdit, children }) => {
  if (isEdit) {
    return (
      <EmbedEditor
        element={element}
        attributes={attributes}
        className={cx(s.iframeWrap, getElementClassname(element))}
      >
        {children}
      </EmbedEditor>
    );
  }

  return (
    <div className={cx(s.iframeWrap, getElementClassname(element))}>
      <EmbedRender src={element.src} title={element.title} />
    </div>
  );
});

Embed.displayName = 'Embed';

export { Embed };
