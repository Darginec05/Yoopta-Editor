import { YooptaPlugin } from '@yoopta/editor';
import { CodeEditor } from '../ui/Code';

const Code = new YooptaPlugin({
  type: 'Code',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: (props) => {
        console.log('Code element props:', props);
        return <pre />;
      },
      props: {
        nodeType: 'void',
        language: 'JavaScript',
        theme: 'VSCode',
      },
    },
  },
  options: {
    display: {
      title: 'Code',
      description: 'Write bugs',
    },
    shortcuts: ['```'],
  },
});

export { Code };
