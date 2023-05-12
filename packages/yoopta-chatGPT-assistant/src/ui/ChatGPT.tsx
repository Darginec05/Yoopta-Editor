import { generateId } from '@yoopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import { Editor, Element, Path, Point, Selection, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { PromptUI } from '../components/PromptUI';
import s from './ChatGPT.module.scss';

// Установка параметров запроса
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
// const OPENAI_API_KEY = 'some-kek';
// const prompt = 'Why do we need ';

// const response = {
//   id: 'cmpl-76k7aa3zHPHgFcq6uq51ikWjGBcux',
//   object: 'text_completion',
//   created: 1681841614,
//   model: 'text-davinci-003',
//   choices: [
//     {
//       text: '\n\n// Bubble Sort is a simple sorting algorithm that repeatedly steps through a list (or array) of elements, comparing each pair of adjacent elements and swapping them if they are in the wrong order.\n\n// The algorithm works by repeatedly looping through the list of elements, comparing each pair of elements  and swapping them if they are in the wrong order. \n\n// Below is an example of an implementation of the Bubble Sort algorithm in JavaScript:\n\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < (arr.length - i - 1); j++) {\n      if (arr[j] > arr[j+1]) {\n        let temp = arr[j];\n        arr[j] = arr[j+1];\n        arr[j+1] = temp;\n      }\n    }\n  }\n  return arr;\n}',
//       index: 0,
//       logprobs: null,
//       finish_reason: 'stop',
//     },
//   ],
//   usage: {
//     prompt_tokens: 9,
//     completion_tokens: 207,
//     total_tokens: 216,
//   },
// };

// const chatGPTBody = {
//   model: 'text-davinci-003',
//   prompt: promptText,
//   temperature: 0.7,
//   max_tokens: 256,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// };

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

type ChatCompletionRequestMessage = {
  /**
   * The role of the author of this message.
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  role: 'system' | 'user' | 'assistant';
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  content: string;
  /**
   * The name of the user in a multi-user chat
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  name?: string;
};

function deserialize(text) {
  const lines = text.trim().split('\n');
  const nodes = [];

  let currentList: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (/^[\d]+[.)]/.test(line)) {
      // If the line starts with a number followed by a period or bracket,
      // create a new ordered list if we don't have one already, or add the
      // current list to the nodes if we do, and add the current line as a
      // new list item.
      const listItem = {
        id: generateId(),
        nodeType: 'block',
        type: 'list-item',
        children: [{ text: line.replace(/^[\d]+[.)]/, '').trim() }],
      };

      if (currentList === null || currentList.type !== 'numbered-list') {
        currentList = {
          id: generateId(),
          nodeType: 'block',
          type: 'numbered-list',
          children: [listItem],
          data: { depth: 1, skipDrag: true, skipSettings: true },
        };
        nodes.push(currentList);
      } else {
        currentList.children.push(listItem);
      }
    } else if (/^[-*+]/.test(line)) {
      // If the line starts with a hyphen, asterisk, or plus sign, create a
      // new bulleted list if we don't have one already, or add the current
      // list to the nodes if we do, and add the current line as a new list item.

      const listItem = {
        id: generateId(),
        type: 'list-item',
        nodeType: 'block',
        children: [{ text: line.replace(/^[-*+]/, '').trim() }],
      };

      if (currentList === null || currentList.type !== 'bulleted-list') {
        currentList = {
          id: generateId(),
          nodeType: 'block',
          type: 'bulleted-list',
          children: [listItem],
          data: { depth: 1, skipDrag: true, skipSettings: true },
        };
        nodes.push(currentList);
      } else {
        currentList.children.push(listItem);
      }
    } else {
      // Otherwise, add the current line as a paragraph.
      nodes.push({ id: generateId(), nodeType: 'block', type: 'paragraph', children: [{ text: line }] });
      currentList = null;
    }
  }

  return nodes;
}

const text = `1. Введение
- Что такое криптовалюта?
- Какие преимущества и недостатки у криптовалюты?

2. История криптовалюты
- Как и когда появилась первая криптовалюта?
- Как развивалась криптовалюта со временем?

3. Типы криптовалют
- Какие виды криптовалют существуют?
- Какие особенности каждого типа криптовалюты?

4. Как работает криптовалюта
- Как происходит создание и передача криптовалюты?
- Как происходит хранение криптовалюты?

5. Защита криптовалюты
- Какие меры безопасности нужно принимать, чтобы защитить сво`;

console.log('nodes', deserialize(text));

const checkIsMenuOpen = (style: CSSProperties) => style.opacity === 1 && !!style.top && !!style.right;

const ChatGPTAssistant = memo(({ trigger = '?', API_URL = '' }) => {
  const editor = useSlate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [promptText, setText] = useState('Give me example of using OpenAI with ChatGPT in NodeJS');
  const selectionRef = useRef<Selection | null>(null);

  const [menuProps, setMenuProps] = useState<MenuProps>(MENU_PROPS_VALUE);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const messages = useRef<ChatCompletionRequestMessage[] | null>(null);

  const showActionMenu = () => {
    if (!editor.selection) return;

    const selectionRect = getRectByCurrentSelection();

    console.log('selectionRect', selectionRect);

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

  const fetchChatGPT = async () => {
    try {
      setLoading(true);

      if (messages.current === null) {
        messages.current = [{ role: 'user', content: promptText }];
      } else {
        messages.current.push({ role: 'user', content: promptText });
      }

      console.log('MESSAGES BEFORE', messages);
      const headers = { 'Content-Type': 'application/json' };

      const apiCall = await fetch('/api/chatgpt', {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt: promptText, messages: messages.current }),
      });

      const response = await apiCall.json();

      Editor.withoutNormalizing(editor, () => {
        const nodes = deserialize(response.data.choices[0].message.content);
        Transforms.delete(editor, { at: selectionRef.current! });
        Transforms.insertFragment(editor, nodes, { at: selectionRef.current! });

        console.log('nodes', nodes);
      });

      messages.current.push({ role: 'assistant', content: response.data.choices[0].message.content });

      return response;
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

// 1. Принятие цифровой технологии: Бодрийяр призывает людей использовать цифровые технологии для обеспечения творческого и социального развития.

// 2. Социальная ответственность: Бодрийяр призывает людей быть социально ответственными
