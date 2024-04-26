import YooptaRenderer from '@yoopta/renderer';
import { value } from '../../utils/defaultValue';
import { MARKS, plugins } from '../../utils/plugins';

const RenderExample = () => {
  return (
    <div className="px-[100px]  max-w-[900px] mx-auto my-10 flex flex-col items-center">
      <YooptaRenderer plugins={plugins} marks={MARKS} width={750} value={value} />
    </div>
  );
};

export default RenderExample;
