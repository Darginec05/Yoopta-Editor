import { YooptaPlugin } from '@yoopta/editor';
import { CodeEditor } from '../ui/Code';

const Code = new YooptaPlugin({
  type: 'Code',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: () => null,
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
