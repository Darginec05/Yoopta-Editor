import { YoptaComponent } from '@yopta/editor';
import { Video as VideoRender } from './ui/Video';
import { VideoEditor } from './ui/VideoEditor';

const Video = new YoptaComponent({
  type: 'video',
  // renderer: (editor) => VideoRender,
  renderer: (editor) => VideoEditor,
  // editorRenderer: (editor) => VideoEditor,
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

export default Video;
