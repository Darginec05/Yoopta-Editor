import { generateId, YooptaPlugin } from '@yoopta/editor';
import { CodeElementProps, CodePluginBlockOptions, CodePluginElements } from '../types';
import { CodeEditor } from '../ui/Code';

const Code = new YooptaPlugin<CodePluginElements, CodeElementProps, CodePluginBlockOptions>({
  type: 'Code',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: (props) => {
        return <pre />;
      },
      props: {
        nodeType: 'void',
        language: 'javascript',
        theme: 'VSCode',
      },
    },
  },
  options: {
    display: {
      title: 'Code',
      description: 'Write the best code ever!',
    },
    shortcuts: ['```'],
    // defaultLanguage: 'javascript',
    // defaultTheme: 'VSCode',
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['PRE'],
        parse(el) {
          if (el.nodeName === 'PRE') {
            const code = el.querySelector('code');
            const textContent = code ? code.textContent : el.textContent;

            return {
              children: [{ text: textContent || '' }],
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
