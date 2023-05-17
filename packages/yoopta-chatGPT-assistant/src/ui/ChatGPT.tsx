import { generateId } from '@yoopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import { Editor, Path, Point, Selection, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { PromptUI } from '../components/PromptUI';
import { ChatMessage, OpenAIChatCompletionChunk, OpenAIChatMessage, OpenAIChatRole } from '../types';
import s from './ChatGPT.module.scss';

type MenuProps = { fixedStyle: CSSProperties; absoluteStyle: CSSProperties; point: Point | null };

const MENU_PROPS_VALUE: MenuProps = {
  fixedStyle: { position: 'fixed', opacity: 0, zIndex: 6, left: -1000, bottom: -1000 },
  absoluteStyle: { left: 0, bottom: 0, top: 'auto', right: 'auto' },
  point: null,
};

// [TODO] - check for window.getSelection()
export function getRectByCurrentSelection(): DOMRect {
  const domSelection = window.getSelection();
  const domRange = domSelection!.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  return rect;
}

const checkIsMenuOpen = (style: CSSProperties) => style.opacity === 1 && !!style.top && !!style.right;

const textDecoder = new TextDecoder();

type ChatGPTAssistantProps = {
  trigger?: string;
  API_URL?: string;
};

const ChatGPTAssistant = memo(({ trigger = '?', API_URL = '' }: ChatGPTAssistantProps) => {
  const editor = useSlate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [promptText, setText] = useState('Give me example of using OpenAI with ChatGPT in NodeJS');
  const selectionRef = useRef<Selection | null>(null);

  const [menuProps, setMenuProps] = useState<MenuProps>(MENU_PROPS_VALUE);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const messages = useRef<Omit<ChatMessage, 'meta' | 'timestamp'>[] | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const showActionMenu = () => {
    if (!editor.selection) return;

    const selectionRect = getRectByCurrentSelection();
    const actionMenuHeight = actionMenuRef.current!.clientHeight;

    const showAtTop = selectionRect.top + selectionRect.height + actionMenuHeight > window.innerHeight;

    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    const parentPath = Path.parent(editor.selection.anchor.path);

    const absoluteStyle = showAtTop
      ? { left: 0, bottom: 5, top: 'auto', right: 'auto' }
      : { left: 0, bottom: 'auto', top: 0, right: 'auto' };

    setMenuProps({
      absoluteStyle,
      fixedStyle: {
        ...menuProps.fixedStyle,
        left: selectionRect.left,
        top: selectionRect.top,
        right: 'auto',
        bottom: 'auto',
        opacity: 1,
        position: 'fixed',
        height: selectionRect.height,
      },
      point: { path: parentPath, offset: editor.selection.anchor.offset },
    });

    selectionRef.current = editor.selection;
  };

  const hideActionMenu = (shouldReturnSelection = true) => {
    enableBodyScroll(document.body);
    setMenuProps(MENU_PROPS_VALUE);
    setText('');

    if (selectionRef.current && shouldReturnSelection) {
      Transforms.select(editor, selectionRef.current);
      ReactEditor.focus(editor);
    }

    messages.current = null;
    selectionRef.current = null;
  };

  const isMenuOpen = checkIsMenuOpen(menuProps.fixedStyle);

  const handleKeyup = (event) => {
    if (!editor.selection || !trigger) return;

    const parentPath = Path.parent(editor.selection.anchor.path);
    const string = Editor.string(editor, parentPath);

    if (!isMenuOpen && string?.trim() === trigger && string.includes(event.key)) {
      event.preventDefault();
      return showActionMenu();
    }
  };

  useEffect(() => {
    if (!editor.selection || !menuProps.point) return hideActionMenu(false);

    const parentPath: Path = Path.parent(editor.selection.anchor.path);
    const selectionPoint: Point = { path: parentPath, offset: editor.selection.anchor.offset };

    if (!Path.equals(selectionPoint.path, menuProps.point.path) || Point.isBefore(selectionPoint, menuProps.point)) {
      hideActionMenu(false);
    }
  }, [editor.selection, menuProps.point]);

  useEffect(() => {
    const contentEditor = document.querySelector('#yoopta-contenteditable');
    contentEditor?.addEventListener('keyup', handleKeyup);

    return () => {
      contentEditor?.removeEventListener('keyup', handleKeyup);
    };
  }, [editor, isMenuOpen]);

  useEffect(() => {
    console.log('chatMessages', chatMessages);

    if (chatMessages.length > 0 && selectionRef.current) {
      const [lastMessage] = chatMessages.slice(-1);
      console.log('lastMessage', lastMessage);
      const string = Editor.string(editor, selectionRef.current);

      console.log('string', string);

      Transforms.insertText(editor, lastMessage, { at: selectionRef.current! });
    }
  }, [chatMessages, selectionRef.current]);

  const fetchChatGPT = async () => {
    try {
      setLoading(true);

      if (messages.current === null) {
        messages.current = [{ role: 'user', content: promptText }];
      } else {
        messages.current.push({ role: 'user', content: promptText });
      }

      const abortController = new AbortController();
      const signal = abortController.signal;

      const headers = { 'Content-Type': 'application/json' };

      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt: promptText, messages: messages.current }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`Response error with: ${response.status} - ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('Response error with empty body');
      }

      const reader = response.body.getReader();

      const updateLastItem = (msgFn) => (currentMessages) =>
        currentMessages.map((msg, i) => {
          if (currentMessages.length - 1 === i) {
            return msgFn(msg);
          }
          return msg;
        });

      function readStream() {
        return reader.read().then(({ done, value }) => {
          if (done) return;

          const decodedData = textDecoder.decode(value as Buffer);
          const lines = decodedData.split(/(\n){2}/);
          const chunks: OpenAIChatCompletionChunk[] = lines
            .map((line) => line.replace(/(\n)?^data:\s*/, '').trim())
            .filter((line) => line !== '' && line !== '[DONE]')
            .map((line) => JSON.parse(line));

          for (const chunk of chunks) {
            const chunkContent: string = (chunk.choices[0].delta.content || '').replace(/^`\s*/, '`');
            const roleChunk: OpenAIChatRole = chunk.choices[0].delta.role || '';

            setChatMessages((currentMessages) => [...currentMessages, chunkContent]);

            // setChatMessages(
            //   updateLastItem((msg) => ({
            //     content: `${msg.content}${chunkContent}`,
            //     role: `${msg.role}${roleChunk}` as OpenAIChatRole,
            //     timestamp: 0,
            //     meta: {
            //       ...msg.meta,
            //       chunks: [
            //         ...msg.meta.chunks,
            //         {
            //           content: chunkContent,
            //           role: roleChunk,
            //           timestamp: Date.now(),
            //         },
            //       ],
            //     },
            //   })),
            // );
          }

          return readStream();
        });
      }

      await readStream();

      // Editor.withoutNormalizing(editor, () => {
      //   const nodes = deserialize(response.data.choices[0].message.content);
      //   Transforms.delete(editor, { at: selectionRef.current! });
      //   Transforms.insertFragment(editor, nodes, { at: selectionRef.current! });
      // });

      // messages.current.push({ role: 'assistant', content: response.data.choices[0].message.content });

      // console.log('chatGPTResponse', response.data);

      // return response;
    } catch (_err) {
      return Promise.reject(_err);
    } finally {
      setLoading(false);
    }
  };

  // Give me example of using OpenAI with ChatGPT in NodeJS

  const askChatGPT = async () => {
    if (promptText.trim().length === 0) return;
    if (selectionRef.current === null) return;

    try {
      const chatGPTResponse = await fetchChatGPT();

      // const answerText = chatGPTResponse.choices[0].text.replace(/^(\n)*/g, '');

      // const paragraph = {
      //   id: generateId(),
      //   type: 'paragraph',
      //   children: [{ text: '' }],
      //   nodeType: 'block',
      // };

      // Transforms.delete(editor, {
      //   at: {
      //     anchor: { path: selectionRef.current.anchor.path, offset: 0 },
      //     focus: { path: selectionRef.current.focus.path, offset: 0 },
      //   },
      // });

      // Transforms.setNodes(editor, paragraph, {
      //   at: selectionRef.current,
      //   match: (n) => Element.isElement(n),
      // });

      // Transforms.insertText(editor, answerText, {
      //   at: selectionRef.current,
      // });

      // hideActionMenu();
    } catch (_err) {
      setError(_err);
    }
  };

  return (
    <div role={'dialog'} aria-modal className={s.root} style={menuProps.fixedStyle}>
      <div className={s.relative}>
        <div className={s.absolute} style={menuProps.absoluteStyle}>
          <div ref={actionMenuRef} className={s.content}>
            {isMenuOpen && (
              <PromptUI
                value={promptText}
                onChange={(event) => setText(event.target.value)}
                askChatGPT={askChatGPT}
                loading={loading}
                onClose={hideActionMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ChatGPTAssistant.displayName = 'ChatGPTAssistant';

export { ChatGPTAssistant };
