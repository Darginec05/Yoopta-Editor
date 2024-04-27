import YooptaRenderer from '@yoopta/renderer';
import { useEffect, useState } from 'react';
import { value } from '../../utils/defaultValue';
import { MARKS, plugins } from '../../utils/plugins';

const RenderExample = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const editorData = localStorage.getItem('editorData') || '{}';
    setContent(JSON.parse(editorData));
  }, []);

  if (!content) return null;

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center">
      <YooptaRenderer plugins={plugins} marks={MARKS} width={750} value={content} />
    </div>
  );
};

export default RenderExample;
