import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { TableCommands } from '@yoopta/table';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '678b2ff1-322b-44f7-ad16-80a2f2fdde32': {
      id: '678b2ff1-322b-44f7-ad16-80a2f2fdde32',
      value: [
        {
          id: 'f4e9429f-b7e6-4272-86dc-3b8dcba00e49',
          type: 'paragraph',
          children: [
            {
              text: 'Our total performance scroll jumped from a base of 43 to 78, which is a massive gain.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '8e50f4af-02e1-4c8a-a90c-3ca16ca0dc1f': {
      id: '8e50f4af-02e1-4c8a-a90c-3ca16ca0dc1f',
      value: [
        {
          id: '3b3bde07-59f1-4e5b-a43f-5e73a0690e4f',
          type: 'paragraph',
          children: [
            {
              text: 'This is because of the fact that we essentially chopped our list into tiny portions. Instead of rendering all 10,000 items at once, we only rendered the first few items needed to render the portion of the page in the user’s view. When the user scrolls down, the react-infinite-scroller library adds more items to the DOM.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 1,
        depth: 0,
      },
    },
    'e252f92a-8631-4dce-8e89-911946bf1ed0': {
      id: 'e252f92a-8631-4dce-8e89-911946bf1ed0',
      value: [
        {
          id: '91f580b7-72e3-46a9-9aff-32bc5589d9cf',
          type: 'heading-two',
          children: [
            {
              text: 'Windowing ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 2,
        depth: 0,
      },
    },
    'cf350a6a-072a-4c92-a5b1-6fb01816fc5f': {
      id: 'cf350a6a-072a-4c92-a5b1-6fb01816fc5f',
      value: [
        {
          id: '672ebded-668d-4200-a2a8-826f495dcb6d',
          type: 'paragraph',
          children: [
            {
              text: 'Another solution to this problem is to use the windowing technique. ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    '48f5223a-a317-4ef9-96f4-c6839801ec06': {
      id: '48f5223a-a317-4ef9-96f4-c6839801ec06',
      value: [
        {
          id: 'b4817b25-731f-4b29-a7b2-2c79e9903355',
          type: 'paragraph',
          children: [
            {
              bold: true,
              text: 'Windowing (or virtualization)',
            },
            {
              text: ' ',
            },
            {
              text: 'is a technique where you only render the portion of the list that is visible to the user at any time. Unlike infinite scroll, in windowing the DOM always has a constant number of elements. In other words, we only render the required elements needed to fill the user’s field of vision and remove the elements from the top and bottom of the list that are not in the view yet.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 4,
        depth: 0,
      },
    },
    '56cd9171-67e8-489d-b8e5-5f35bdd5b02f': {
      id: '56cd9171-67e8-489d-b8e5-5f35bdd5b02f',
      value: [
        {
          id: '682a2a53-1ce0-4d1b-a70a-bd9cabbd508e',
          type: 'image',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'void',
            src: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-6-_-windowing-technique-illustration.png',
            alt: 'Image',
            srcSet:
              'https://blog.uber-cdn.com/cdn-cgi/image/width=735,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-6-_-windowing-technique-illustration.png 735w, https://blog.uber-cdn.com/cdn-cgi/image/width=300,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-6-_-windowing-technique-illustration.png 300w',
            fit: 'contain',
            sizes: {
              width: 735,
              height: 488,
            },
          },
        },
      ],
      type: 'Image',
      meta: {
        order: 5,
        depth: 0,
      },
    },
    '5539eb83-cc5a-42ec-a303-b655112d8be3': {
      id: '5539eb83-cc5a-42ec-a303-b655112d8be3',
      value: [
        {
          id: 'fe49cd86-ba8c-4f04-8461-3d81300b468c',
          type: 'paragraph',
          children: [
            {
              text: 'Windowing shines when each item in your list has a fixed height. That way it becomes easy to calculate which items need to be added or removed from the DOM based on the scroll. Furthermore, the memory usage of your page stays constant, as the number of DOM elements stays constant, no matter where the user has scrolled.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 6,
        depth: 0,
      },
    },
    '22c352e6-2c13-4feb-95e1-eec9b25ae286': {
      id: '22c352e6-2c13-4feb-95e1-eec9b25ae286',
      value: [
        {
          id: 'b871d80f-a0c8-4f98-bf5d-bfde60c02ad9',
          type: 'paragraph',
          children: [
            {
              id: '9d9077a6-4285-4812-8762-dea1e2841065',
              type: 'link',
              props: {
                url: 'https://codesandbox.io/s/react-window-483zwp?file=/src/components/list.js:1612-1620',
                target: '_blank',
                rel: 'noreferrer noopener',
                title: 'Here’s',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Here’s',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'the implementation of the same 10,000-item list using react-window.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 7,
        depth: 0,
      },
    },
    '73fd426a-d8c0-4e87-a57b-57c357f8fca1': {
      id: '73fd426a-d8c0-4e87-a57b-57c357f8fca1',
      value: [
        {
          id: '2a0731bd-7bb4-4979-8e76-c5fe2d8a7149',
          type: 'paragraph',
          children: [
            {
              text: 'Let’s see how it affects our performance:',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 8,
        depth: 0,
      },
    },
    '7d7b7385-b169-44c8-a60e-b7ac7a664b7a': {
      id: '7d7b7385-b169-44c8-a60e-b7ac7a664b7a',
      value: [
        {
          id: '7ffadd0b-ef19-49d1-b5cf-4f1d1b5a6892',
          type: 'image',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'void',
            src: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing-1024x792.png',
            alt: 'Image',
            srcSet:
              'https://blog.uber-cdn.com/cdn-cgi/image/width=1024,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing.png 1024w, https://blog.uber-cdn.com/cdn-cgi/image/width=300,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing.png 300w, https://blog.uber-cdn.com/cdn-cgi/image/width=768,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing.png 768w, https://blog.uber-cdn.com/cdn-cgi/image/width=1536,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing.png 1536w, https://blog.uber-cdn.com/cdn-cgi/image/width=1712,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/12/Figure-7-_-Lighthouse-score-of-massive-list-with-windowing.png 1712w',
            fit: 'contain',
            sizes: {
              width: 1024,
              height: 792,
            },
          },
        },
      ],
      type: 'Image',
      meta: {
        order: 9,
        depth: 0,
      },
    },
    '50d1bfe1-7cdd-4972-8a4c-0f923cf20eb0': {
      id: '50d1bfe1-7cdd-4972-8a4c-0f923cf20eb0',
      value: [
        {
          id: 'e3e649f8-e1bb-4fd5-aecb-df93f9e2dc56',
          type: 'heading-two',
          children: [
            {
              text: 'Key Things to Keep in Mind',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 10,
        depth: 0,
      },
    },
    '16dbd432-d5e6-4f74-a471-c20c0b100208': {
      id: '16dbd432-d5e6-4f74-a471-c20c0b100208',
      value: [
        {
          id: '209d8975-f8c5-44af-9d7f-434e0163122d',
          type: 'paragraph',
          children: [
            {
              text: 'With both these techniques, you lose the capability to perform a browser search. In other words, if the user performs a',
            },
            {
              text: ' ',
            },
            {
              italic: true,
              text: 'cmd + f',
            },
            {
              text: ' ',
            },
            {
              text: 'search for a text that hasn’t been rendered yet, they’ll see 0 of 0 matches. To prevent this, you should add custom search or filtering options to your lists.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 11,
        depth: 0,
      },
    },
    'bbbdba86-96e8-49c7-b346-7b9a4259fe4d': {
      id: 'bbbdba86-96e8-49c7-b346-7b9a4259fe4d',
      value: [
        {
          id: 'f757b65d-e680-41f8-a013-5a719beabdb1',
          type: 'paragraph',
          children: [
            {
              text: 'There will also always be minor delays in adding/removing elements from the DOM, as compared to native scrolling, but that’s still better than your application ultimately hanging due to massive amounts of DOM elements.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 12,
        depth: 0,
      },
    },
    'ab0ffce6-ee2a-45ff-a9e1-4a34dbfac65e': {
      id: 'ab0ffce6-ee2a-45ff-a9e1-4a34dbfac65e',
      value: [
        {
          id: 'a680c2ac-c1e6-4ac0-a774-52f830d3c294',
          type: 'heading-two',
          children: [
            {
              text: 'Creating Your Own Solution',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 13,
        depth: 0,
      },
    },
    'f240e5a5-bd7f-42c3-9508-becbf7dd4df9': {
      id: 'f240e5a5-bd7f-42c3-9508-becbf7dd4df9',
      value: [
        {
          id: '5c53dd6d-3166-4b28-99ac-4784fedecf2e',
          type: 'paragraph',
          children: [
            {
              text: 'If you want to keep your solution lightweight and don’t want to use any libraries, you can also implement your own lazy loading of DOM elements by using an',
            },
            {
              text: ' ',
            },
            {
              id: 'b719bd05-14ae-4d3d-86ff-153bdb57e5b7',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
                target: '_blank',
                rel: 'noreferrer noopener',
                title: 'Intersection Observer API',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Intersection Observer API',
                },
              ],
            },
            {
              text: '. ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 14,
        depth: 0,
      },
    },
    'a824cbd7-3110-4b06-99cd-5d9dfd639753': {
      id: 'a824cbd7-3110-4b06-99cd-5d9dfd639753',
      value: [
        {
          id: 'fd750efc-fd63-4502-8850-fa48fb8ffce1',
          type: 'paragraph',
          children: [
            {
              text: 'First, add enough components to fill up your viewport. Get the viewport height using getBoundingClientRect and divide that by your approximate minimum item height. Add 1 to this count for good measure. Now add a dummy component below it (this component doesn’t need to show anything; it just needs to exist at the bottom of your list). Attach the intersection observable to this component, and whenever this component is in view, add more items to your list to be rendered in the DOM. This way you’ll end up developing a simple infinite-scroll solution.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 15,
        depth: 0,
      },
    },
  });

  return (
    <>
      <button onClick={() => editor.commands?.insertTable({ columnWidth: 350 })} type="button">
        Insert table
      </button>

      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          placeholder="Type / to open menu"
          tools={TOOLS}
          readOnly={readOnly}
          style={EDITOR_STYLE}
          value={value}
        />
      </div>
    </>
  );
};

export default BasicExample;
