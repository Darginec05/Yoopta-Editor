import { cx } from '@yoopta/editor';
import { useEffect, useRef } from 'react';
import s from './ChatMessages.module.scss';

const ChatMessages = ({ messages, streamingMessage }) => {
  const streamingMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamingMessageRef.current && streamingMessage.length > 0) {
      streamingMessageRef.current.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'end' });
    }
  }, [streamingMessage, streamingMessageRef.current]);

  if (messages.length === 0 && streamingMessage.length === 0) return null;

  return (
    <div className={s.messages}>
      {messages.length > 0 &&
        messages.map((message) => {
          if (message.fromContext) return null;

          return (
            <div
              key={message.id}
              className={cx(s.chatMessage, {
                [s.chatMessageAssistant]: message.role === 'assistant',
                [s.chatMessageUser]: message.role === 'user',
              })}
            >
              <div className={s.chatMessageContent}>{message.content}</div>
            </div>
          );
        })}
      {streamingMessage.length > 0 && (
        <div
          className={cx(s.chatMessage, {
            [s.chatMessageAssistant]: true,
          })}
          ref={streamingMessageRef}
        >
          <div className={s.chatMessageContent}>{streamingMessage.join('')}</div>
        </div>
      )}
    </div>
  );
};

export { ChatMessages };
