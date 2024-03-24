import { generateId, YooptaPlugin } from '@yoopta/editor';
import { CodeElementProps, CodePluginElements } from '../types';
import { CodeEditor } from '../ui/Code';

const Code = new YooptaPlugin<CodePluginElements, CodeElementProps>({
  type: 'Code',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: (props) => {
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
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['PRE'],
        parse(el) {
          if (el.nodeName === 'PRE') {
            return {
              children: [{ text: el.textContent || '' }],
              type: 'code',
              id: generateId(),
              props: {
                language: 'JavaScript',
                theme: 'VSCode',
                nodeType: 'void',
              },
            };
          }
        },
      },
    },
  },
});

export { Code };
