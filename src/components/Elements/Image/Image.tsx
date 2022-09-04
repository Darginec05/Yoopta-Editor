import { ImageEditor } from '../../ImageEditor';
import { ImageRender } from '../../ImageRender/ImageRender';
import s from './Image.module.scss';

// [TODO] - problems when dynamic import
// const ImageEditor = dynamic(() => import('../../ImageEditor').then((mod) => mod.ImageEditor));

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
      <ImageRender src={element.src} alt="URI" />
    </div>
  );
};

export { Image };
