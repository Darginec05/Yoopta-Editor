import { RenderElementProps } from 'slate-react';
import { Editor } from '../components/Editor';
import { Image } from './Image';
import s from './ImageEditor.module.scss';

type Props = RenderElementProps;

const ImageEditor = (props) => {
  const { element } = props;

  if (!element.src) {
    return <Editor {...props} />;
  }

  return (
    <div contentEditable={false}>
      <Image {...props} />
    </div>
  );
};

export { ImageEditor };
