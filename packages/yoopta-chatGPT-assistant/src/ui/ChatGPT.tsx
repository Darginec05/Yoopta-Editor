import { cx, disableBodyScroll, enableBodyScroll } from '@yoopta/editor';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Editor, Path, Point, Selection, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessages } from '../components/ChatMessages';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { useChatMessages } from '../hooks/useChatMessages';
import { OpenAIChatMessage } from '../types';
import s from './ChatGPT.module.scss';

type MenuProps = { fixedStyle: CSSProperties; absoluteStyle: CSSProperties; point: Point | null };

const getDefaultMenuPropsState = (style?: CSSProperties): MenuProps => ({
  fixedStyle: { position: 'fixed', opacity: 0, zIndex: 6, left: -1000, bottom: -1000, ...style },
  absoluteStyle: { left: 0, bottom: 0, top: 'auto', right: 'auto' },
  point: null,
});

// [TODO] - check for window.getSelection()
export function getRectByCurrentSelection(): DOMRect {
  const domSelection = window.getSelection();
  const domRange = domSelection!.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  return rect;
}

const checkIsChatGPTOpen = (style: CSSProperties) => style.opacity === 1 && !!style.top && !!style.right;

type ChatGPTAssistantProps = {
  // trigger?: string;
  API_URL?: string;
  placeholder?: string;
  context?: OpenAIChatMessage[];
  [x: string]: any;
};

const TRIGGER = '?';

/**
 * Actions:
 *  1. Summarize
 *  2. Fix spelling
 *  3. Translate to
 *  4. Continue writing
 */
const ChatGPTAssistant = ({ API_URL = '', placeholder, context, ...rest }: ChatGPTAssistantProps) => {
  const editor = useSlate();
  const [inputMessage, setInputMessage] = useState('');
  const selectionRef = useRef<Selection | null>(null);

  const [menuProps, setMenuProps] = useState<MenuProps>(() => getDefaultMenuPropsState(rest?.style));
  const chatContentRef = useRef<HTMLDivElement>(null);
  const { messages, updateMessage } = useChatMessages({ context });

  const { loading, fetchChatGPT, streamingMessage, error } = useChatCompletion({
    onUpdateMessage: updateMessage,
    inputMessage,
    messages,
  });

  const showChatGPT = () => {
    if (!editor.selection) return;

    const selectionRect = getRectByCurrentSelection();
    const actionMenuHeight = chatContentRef.current!.clientHeight;

    const showAtTop = selectionRect.top + selectionRect.height + actionMenuHeight > window.innerHeight;

    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    const parentPath = Path.parent(editor.selection.anchor.path);

    selectionRef.current = editor.selection;

    const absoluteStyle = showAtTop
      ? { left: 0, bottom: 5, top: 'auto', right: 'auto' }
      : { left: 0, bottom: 'auto', top: selectionRect.height + 5, right: 'auto' };

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
      },
      point: { path: parentPath, offset: editor.selection.anchor.offset },
    });
  };

  const hideChatGPT = () => {
    enableBodyScroll(document.body);
    setMenuProps(getDefaultMenuPropsState(rest?.style));
    setInputMessage('');

    if (selectionRef.current) {
      Transforms.select(editor, selectionRef.current);
      ReactEditor.focus(editor);
      Editor.removeMark(editor, 'selection');
    }

    selectionRef.current = null;
  };

  const isChatGPTOpen = checkIsChatGPTOpen(menuProps.fixedStyle);

  const handleKeyup = (event) => {
    if (!editor.selection) return;
    event.preventDefault();

    const parentPath = Path.parent(editor.selection.anchor.path);
    const string = Editor.string(editor, parentPath);

    if (!isChatGPTOpen && string?.trim() === TRIGGER) {
      event.preventDefault();
      return showChatGPT();
    }
  };

  useEffect(() => {
    if (!editor.selection || !menuProps.point) return hideChatGPT();

    const parentPath: Path = Path.parent(editor.selection.anchor.path);
    const selectionPoint: Point = { path: parentPath, offset: editor.selection.anchor.offset };

    if (!Path.equals(selectionPoint.path, menuProps.point.path) || Point.isBefore(selectionPoint, menuProps.point)) {
      hideChatGPT();
    }
  }, [editor.selection, menuProps.point]);

  useEffect(() => {
    const contentEditor = document.querySelector('#yoopta-contenteditable');
    contentEditor?.addEventListener('keyup', handleKeyup);

    if (isChatGPTOpen) {
      console.log('chatContentRef', chatContentRef.current);
      console.log('chatContentRef.current?.scrollHeight', chatContentRef.current?.scrollHeight);
      chatContentRef.current?.scrollTo(0, chatContentRef.current?.scrollHeight);
    }

    return () => {
      contentEditor?.removeEventListener('keyup', handleKeyup);
    };
  }, [editor, isChatGPTOpen]);

  // Give me example of using OpenAI with ChatGPT in NodeJS

  const askChatGPT = () => {
    if (loading || inputMessage.trim() === '') return;

    setInputMessage('');
    fetchChatGPT();
  };

  const chatMessages = messages.filter((message) => !message.fromContext);
  const isMessageListEmpty = chatMessages.length === 0;

  return (
    <div role={'dialog'} aria-modal className={s.root} style={menuProps.fixedStyle}>
      <div className={s.relative}>
        <div className={s.absolute} style={menuProps.absoluteStyle}>
          <div ref={chatContentRef} className={cx(s.chatContent, 'yoopta-chatGPT')}>
            {isChatGPTOpen && (
              <>
                <ChatMessages messages={chatMessages} streamingMessage={streamingMessage} />
                <ChatInput
                  value={inputMessage}
                  onChange={(event) => setInputMessage(event.target.value)}
                  askChatGPT={askChatGPT}
                  loading={loading}
                  onClose={hideChatGPT}
                  placeholder={placeholder}
                  isMessageListEmpty={isMessageListEmpty}
                  selectionRef={selectionRef}
                  editor={editor}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ChatGPTAssistant.displayName = 'ChatGPTAssistant';

export { ChatGPTAssistant };
