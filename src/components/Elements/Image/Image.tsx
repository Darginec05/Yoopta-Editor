import cx from 'classnames';
import { getElementClassname } from '../../Editor/utils';
import { ImageEditor } from '../../ImageEditor';
import { ImageRender } from '../../ImageRender/ImageRender';
import s from './Image.module.scss';

const Image = ({ element, attributes, children, isEdit }) => {
  if (isEdit) {
    return (
      <ImageEditor element={element} attributes={attributes} className={cx(s.image, getElementClassname(element))}>
        {children}
      </ImageEditor>
    );
  }

  return (
    <div className={cx(s.image, getElementClassname(element))}>
      <ImageRender src={element.src} alt="URI" options={element.options} />
    </div>
  );
};

export { Image };
