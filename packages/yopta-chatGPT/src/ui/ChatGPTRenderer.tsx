import { RenderElementProps } from '@yopta/editor';
import { ChatGTPElement } from '../types';
import s from './ChatGPT.module.scss';

const ChatGPTRenderer = ({ attributes, children, element }: RenderElementProps<ChatGTPElement>) => {
  return (
    <div draggable={false} className={s.div} {...attributes}>
      {children}
    </div>
  );
};

ChatGPTRenderer.displayName = 'ChatGPT';

export { ChatGPTRenderer };
