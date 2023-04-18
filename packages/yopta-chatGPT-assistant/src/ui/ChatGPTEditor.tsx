import { cx, generateId, isKeyHotkey, RenderElementProps } from '@yopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Editor, Element, Path, Point, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { PromptUI } from '../components/PromptUI';
import s from './ChatGPT.module.scss';

// Установка параметров запроса
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
const OPENAI_API_KEY = 'your-key';
// const prompt = 'Why do we need ';

const ACTION_MENU_ITEM_DATA_ATTR = 'data-action-menu-item';

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

const ChatGPTAssistant = ({ trigger = '?', editorRef, PLUGINS_MAP }) => {
  const editor = useSlate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [promptText, setText] = useState('');
  const [chatGPTText, setChatGPTText] = useState('');

  const [menuProps, setMenuProps] = useState<MenuProps>(MENU_PROPS_VALUE);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const showActionMenu = () => {
    if (!editor.selection) return;

    const selectionRect = getRectByCurrentSelection();
    const actionMenuHeight = actionMenuRef.current!.clientHeight;

    const showAtTop = selectionRect.top + selectionRect.height + actionMenuHeight > window.innerHeight;

    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    const parentPath = Path.parent(editor.selection.anchor.path);

    ReactEditor.blur(editor);
    actionMenuRef.current?.querySelector('textarea')?.focus();

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

  const hideActionMenu = () => {
    enableBodyScroll(document.body);
    setMenuProps(MENU_PROPS_VALUE);

    const childNodes = document.querySelectorAll(`[${ACTION_MENU_ITEM_DATA_ATTR}]`);
    childNodes.forEach((childNode) => childNode?.setAttribute('aria-selected', 'false'));

    const firstNodeEl = childNodes?.[0] as HTMLLIElement | undefined;
    firstNodeEl?.setAttribute('aria-selected', 'true');

    if (firstNodeEl?.nodeType === 1) {
      firstNodeEl?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
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
    if (!editor.selection || !menuProps.point) return hideActionMenu();

    const parentPath: Path = Path.parent(editor.selection.anchor.path);
    const selectionPoint: Point = { path: parentPath, offset: editor.selection.anchor.offset };

    if (!Path.equals(selectionPoint.path, menuProps.point.path) || Point.isBefore(selectionPoint, menuProps.point)) {
      hideActionMenu();
    }
  }, [editor.selection, menuProps.point]);

  useEffect(() => {
    const contentEditor = document.querySelector('#yopta-contenteditable');
    contentEditor?.addEventListener('keyup', handleKeyup);

    return () => {
      contentEditor?.removeEventListener('keyup', handleKeyup);
    };
  }, [editor, isMenuOpen]);

  const fetchChatGPT = async () => {
    const chatGPTBody = {
      model: 'text-davinci-003',
      prompt: promptText,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    };

    const apiCall = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(chatGPTBody),
    });

    const response = await apiCall.json();
    return response;
  };

  const askChatGPT = async () => {
    if (promptText.trim().length === 0) return;

    const chatGPTResponse = await fetchChatGPT();
    const elementPath = menuProps.point?.path || [editor.children.length - 1];

    const paragraph = {
      id: generateId(),
      type: 'paragraph',
      children: [{ text: chatGPTResponse.choices[0].text.replaceAll('\n', '') }],
      nodeType: 'block',
    };

    console.log('chatGPTResponse', chatGPTResponse);
    Transforms.removeNodes(editor, { at: elementPath, match: (n) => Element.isElement(n) });
    Transforms.insertNodes(editor, paragraph, { at: elementPath, match: (n) => Element.isElement(n), select: true });
    Transforms.select(editor, elementPath);
    ReactEditor.focus(editor);

    hideActionMenu();
  };

  return (
    <div role={'dialog'} aria-modal className={s.root} style={menuProps.fixedStyle}>
      <div className={s.relative}>
        <div className={s.absolute} style={menuProps.absoluteStyle}>
          <div ref={actionMenuRef} className={s.content}>
            <PromptUI value={promptText} onChange={(event) => setText(event.target.value)} askChatGPT={askChatGPT} />
          </div>
        </div>
      </div>
    </div>
  );
};

ChatGPTAssistant.displayName = 'ChatGPTAssistant';

export { ChatGPTAssistant };

// //Bubble Sort
// function bubbleSort(arr) {
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         let temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         swapped = true;
//       }
//     }
//   } while (swapped);
//   return arr;
// }

// let arr = [5, 2, 8, 1, 4];
// bubbleSort(arr);
// // [1, 2, 4, 5, 8]

// With the increasingly competitive digital landscape, it is essential for businesses to pay close attention to their web page performance. Slow loading speeds, poor design, and other technical issues can lead to frustrated customers, reduced conversions, and decreased traffic. Fortunately, there are several ways to improve web page performance and ensure a seamless user experience.
// First and foremost, businesses should ensure that their websites are optimized for both mobile and desktop devices. This means that all design elements, text, images, and videos should be properly sized and formatted for each device. Additionally, businesses should optimize their websites for speed by minimizing the number of requests, compressing and caching files, minifying code, and reducing the size of images.
// Another way to improve web page performance is to focus on user experience. This includes making sure that navigation is intuitive and that pages load quickly. Additionally, businesses should make sure that the content is relevant and engaging to keep visitors on the page. Additionally, businesses should make sure that their pages are properly indexed for search engines so that potential customers can easily find them.
// Finally, businesses should track their web page performance to identify areas for improvement. This can be done with tools such as Google Analytics, which allows businesses to track page speed, user engagement,
