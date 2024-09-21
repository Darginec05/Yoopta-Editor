import YooptaEditor, {
  Blocks,
  createYooptaEditor,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
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
    '6a2c52a9-4a03-4efa-9d6d-103b9c79db3d': {
      id: '6a2c52a9-4a03-4efa-9d6d-103b9c79db3d',
      value: [
        {
          id: 'bb656a10-18af-46bf-a348-ca12305dc63c',
          type: 'heading-one',
          children: [
            {
              text: 'Pointer events',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '3453a066-3444-49ec-a120-7be484a36b6b': {
      id: '3453a066-3444-49ec-a120-7be484a36b6b',
      value: [
        {
          id: '73197539-b53c-4eb7-9ff2-012308490017',
          type: 'paragraph',
          children: [
            {
              text: "Much of today's web content assumes the user's pointing device will be a mouse. However, since many devices support other types of pointing input devices, such as pen/stylus and touch surfaces, extensions to the existing pointing device event models are needed.",
            },
            {
              text: ' ',
            },
            {
              id: 'c028b465-590f-49ed-a1ad-60eee1b866e2',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#pointer_event',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'Pointer events',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Pointer events',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'address that need.',
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
    '20d9e71f-99eb-47ae-87cd-c2f2c6d42317': {
      id: '20d9e71f-99eb-47ae-87cd-c2f2c6d42317',
      value: [
        {
          id: '2509534d-8bd7-4fac-9901-26f5810293bb',
          type: 'paragraph',
          children: [
            {
              text: 'Pointer events are DOM events that are fired for a pointing device. They are designed to create a single DOM event model to handle pointing input devices such as a mouse, pen/stylus or touch (such as one or more fingers).',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 2,
        depth: 0,
      },
    },
    '6458a134-9370-4ab7-a022-3d8efa91008e': {
      id: '6458a134-9370-4ab7-a022-3d8efa91008e',
      value: [
        {
          id: '8ca6f705-cb9b-4bb2-84ad-9dee0c831cbf',
          type: 'paragraph',
          children: [
            {
              text: 'The',
            },
            {
              text: ' ',
            },
            {
              id: '3444c61d-9bf5-499a-bee4-d0a8912db7fe',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#pointer',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'pointer',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'pointer',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: "is a hardware-agnostic device that can target a specific set of screen coordinates. Having a single event model for pointers can simplify creating websites and applications and provide a good user experience regardless of the user's hardware. However, for scenarios when device-specific handling is desired, pointer events defines a",
            },
            {
              text: ' ',
            },
            {
              id: '8e2d241f-6f4f-4634-aa28-3b47b228e6a6',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'pointerType',
                nodeType: 'inline',
              },
              children: [
                {
                  code: true,
                  text: 'pointerType',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'property to inspect the device type which produced the event.',
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
    'd8c6108f-1740-4327-b7c1-99ab2285deea': {
      id: 'd8c6108f-1740-4327-b7c1-99ab2285deea',
      value: [
        {
          id: 'e2443223-16b7-492e-bb9e-01e580765063',
          type: 'paragraph',
          children: [
            {
              text: 'The events needed to handle generic pointer input are analogous to',
            },
            {
              text: ' ',
            },
            {
              id: '642ab145-4a38-4884-ae92-9c9725967f0a',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'mouse events',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'mouse events',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: '(',
            },
            {
              text: 'mousedown',
              code: true,
            },
            {
              text: '/',
            },
            {
              text: 'pointerdown',
              code: true,
            },
            {
              text: ',',
            },
            {
              text: ' ',
            },
            {
              text: 'mousemove',
              code: true,
            },
            {
              text: '/',
            },
            {
              text: 'pointermove',
              code: true,
            },
            {
              text: ', etc.). Consequently, pointer event types are intentionally similar to mouse event types.',
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
    'd079a16a-b874-4d5e-bd8e-aa89dcbd1bb1': {
      id: 'd079a16a-b874-4d5e-bd8e-aa89dcbd1bb1',
      value: [
        {
          id: 'bf87973f-c8c3-4f8e-841d-bd1ffeb69da7',
          type: 'paragraph',
          children: [
            {
              text: 'Additionally, a pointer event contains the usual properties present in mouse events (client coordinates, target element, button states, etc.) in addition to new properties for other forms of input: pressure, contact geometry, tilt, etc. In fact, the',
            },
            {
              text: ' ',
            },
            {
              id: '0c1fb0fb-a317-4aa0-8d09-bee2d224c32b',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'PointerEvent',
                nodeType: 'inline',
              },
              children: [
                {
                  code: true,
                  text: 'PointerEvent',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'interface inherits all of the',
            },
            {
              text: ' ',
            },
            {
              id: '99b64f9b-ba11-41cd-a683-7396b86f2722',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'MouseEvent',
                nodeType: 'inline',
              },
              children: [
                {
                  code: true,
                  text: 'MouseEvent',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'properties, thus facilitating the migration of content from mouse events to pointer events.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 5,
        depth: 0,
      },
    },
    'c16c42d0-a230-444b-b513-0853d7c1339d': {
      id: 'c16c42d0-a230-444b-b513-0853d7c1339d',
      value: [
        {
          id: '9f920a57-3230-46a2-9ca5-56403535c86d',
          type: 'heading-two',
          children: [
            {
              id: '6b410c05-db94-490d-8dc1-b16aa20e54f2',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#terminology',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'Terminology',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Terminology',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 6,
        depth: 0,
      },
    },
    '6030afa8-e38b-49fa-b0ac-bf40216e6af7': {
      id: '6030afa8-e38b-49fa-b0ac-bf40216e6af7',
      value: [
        {
          id: 'fd01676a-e726-464e-a41e-e17cbfddc8ff',
          type: 'heading-three',
          children: [
            {
              id: '5813f8a3-cb8f-467b-9aa0-08af57194100',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#active_buttons_state',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'active buttons state',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'active buttons state',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 7,
        depth: 0,
      },
    },
    'adc44202-731b-477c-8fc9-802cb5b72b5f': {
      id: 'adc44202-731b-477c-8fc9-802cb5b72b5f',
      value: [
        {
          id: '85b35922-af93-4ae0-bc52-6c2fa4067a30',
          type: 'paragraph',
          children: [
            {
              text: 'The condition when a',
            },
            {
              text: ' ',
            },
            {
              id: 'd7e78fe7-748d-44e3-9d1e-47374392db8e',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#pointer',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'pointer',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'pointer',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'has a non-zero value for the',
            },
            {
              text: ' ',
            },
            {
              text: 'buttons',
              code: true,
            },
            {
              text: ' ',
            },
            {
              text: 'property. For example, in the case of a pen, when the pen has physical contact with the digitizer, or at least one button is pressed while hovering.',
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
    'aba54ab4-eec5-461e-ae7a-cc9c8de7a8f7': {
      id: 'aba54ab4-eec5-461e-ae7a-cc9c8de7a8f7',
      value: [
        {
          id: '24456bec-f92d-453d-92f0-f030258044e7',
          type: 'heading-three',
          children: [
            {
              id: 'b20d5b19-2e3f-4966-b388-f7df82b66d05',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#active_pointer',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'active pointer',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'active pointer',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 9,
        depth: 0,
      },
    },
    'c89f332a-822b-442f-85f5-bc82ed1c3364': {
      id: 'c89f332a-822b-442f-85f5-bc82ed1c3364',
      value: [
        {
          id: '4875bf2d-10f0-4d3b-ab81-65d85132492d',
          type: 'paragraph',
          children: [
            {
              text: 'Any',
            },
            {
              text: ' ',
            },
            {
              id: 'f8d9d8f9-ece2-487d-b9aa-2efdc17e3ee3',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#pointer',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'pointer',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'pointer',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'input device that can produce events. A pointer is considered active if it can still produce further events. For example, a pen that is a down state is considered active because it can produce additional events when the pen is lifted or moved.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 10,
        depth: 0,
      },
    },
    'fd8266cb-75e1-4c59-8945-0fa3f52b1452': {
      id: 'fd8266cb-75e1-4c59-8945-0fa3f52b1452',
      value: [
        {
          id: '5bc3d616-61b9-4ced-b9c2-b50da5b2807a',
          type: 'heading-three',
          children: [
            {
              id: 'cceafd78-1ce4-4888-9d38-9b70e4430387',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#digitizer',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'digitizer',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'digitizer',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 11,
        depth: 0,
      },
    },
    '1f392f03-1f96-4959-885f-2ea70311bf6b': {
      id: '1f392f03-1f96-4959-885f-2ea70311bf6b',
      value: [
        {
          id: '95179a55-5f7d-4fdf-834f-ea0f2a9f9885',
          type: 'paragraph',
          children: [
            {
              text: 'A sensing device with a surface that can detect contact. Most commonly, the sensing device is a touch-enabled screen that can sense input from an input device such as a pen, stylus, or finger. Some sensing devices can detect the close proximity of the input device, and the state is expressed as a hover following the mouse.',
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
  });

  useEffect(() => {
    editor.on('change', (value: YooptaChildrenValue) => {
      setValue(value);
    });
  }, [editor]);

  console.log(value);

  return (
    <>
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
