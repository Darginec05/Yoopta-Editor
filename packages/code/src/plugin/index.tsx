import { YooptaPlugin } from '@yoopta/editor';
import { CodeEditor } from '../ui/Code';

const Code = new YooptaPlugin({
  type: 'CodePlugin',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: CodeEditor,
      props: {
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Code',
    shortcuts: ['```'],
  },
});

export { Code };
