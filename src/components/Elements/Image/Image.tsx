import { ImageEditor } from '../../ImageEditor';
import { ImageRender } from '../../ImageRender/ImageRender';
import s from './Image.module.scss';

const Image = ({ element, attributes, children, isEdit }) => {
  if (isEdit) {
    return (
      <ImageEditor element={element} attributes={attributes} className={s.image}>
        {children}
      </ImageEditor>
    );
  }

  return (
    <div className={s.image}>
      <ImageRender src={element.src} alt="URI" options={element.options} />
    </div>
  );
};

export { Image };
