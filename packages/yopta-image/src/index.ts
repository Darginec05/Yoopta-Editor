import { YoptaComponent } from '@yopta/editor';
import { Image as ImageRender } from './ui/Image';
import { ImageEditor } from './ui/ImageEditor';

const Image = new YoptaComponent({
  type: 'image',
  renderer: ImageEditor,
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === this.type ? true : isVoid(element);
    };

    return editor;
  },
  element: {
    isVoid: true,
    type: 'block',
  },
});

export default Image;
