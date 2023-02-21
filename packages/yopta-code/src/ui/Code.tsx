import { KeyboardEvent, memo } from 'react';
import { Ed } from 'yopta-editor';
import { codeDecorator } from '../utils/decorator';
import s from './Code.module.scss';

const CodeRender = memo<any>(({ attributes, children, element }) => {
  return (
    <code className={s.code} {...attributes}>
      <pre className={s.pre}>{children}</pre>
    </code>
  );
});

CodeRender.displayName = 'Code';

const createNode = function ({ renderer: Component, shortcut, handlers, decorator }) {
  return {
    render: Component,
    shortcut,
    handlers,
    decorator,
  };
};

const Code = createNode({
  renderer: CodeRender,
  shortcut: '<',
  decorator: codeDecorator,
  handlers: {
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      console.log('event', event.key);
      console.log('isDefaultPrevented', event.isDefaultPrevented);
      console.log('defaultPrevented', event.defaultPrevented);

      const isEnter = event.key === 'Enter';

      if (isEnter) {
        // const lineParagraph = getDefaultParagraphLine();

        if (event.shiftKey) {
          event.preventDefault();

          // Transforms.splitNodes(editor, { always: true });
          // Transforms.setNodes(editor, lineParagraph);
          return;
        }

        if (!event.shiftKey) {
          // event.preventDefault();
          // editor.insertText('\n');
        }
      }
    },
  },
});

export { Code };
