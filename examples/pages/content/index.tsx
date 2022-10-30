import { YoptaRenderer } from 'yopta-editor/dist/YoptaRenderer';
import s from '../../styles/Home.module.css';

const ContentPage = () => {
  return (
    <div className={s.main}>
      <YoptaRenderer data={[]} wrapCls={s.editorWrapper} />
    </div>
  );
};

export default ContentPage;
