import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '5bdec252-def2-49d1-9a6d-414bc5d1b5e6': {
      id: '5bdec252-def2-49d1-9a6d-414bc5d1b5e6',
      value: [
        {
          id: '08087850-4568-4cb7-8c86-2cf38dd63fba',
          type: 'accordion-list',
          children: [
            {
              id: 'e733daf0-6cd0-4126-884c-eb1eae0e59a3',
              type: 'accordion-list-item',
              children: [
                {
                  id: 'fe95bcd1-c603-405b-8470-56fc1ade923c',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'First heading item',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: 'c5677c00-2e19-4603-a617-6ea6de29a28c',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'For this cursor position test, the rich text editor resides inside a Document Management System. Setting this up requires using the content_style option to target the body element and change the appearance',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
            {
              id: '79d41df7-cbb4-416f-8f22-88d498723ced',
              type: 'accordion-list-item',
              children: [
                {
                  id: '37c91acc-4def-467c-8fab-8886a1af8348',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'Second heading item',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: '766a51fd-e520-415d-9020-3fd7d9f6496a',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'You can change the “no-api-key” string to your TinyMCE API key. When you sign up for a FREE TinyMCE API key, you get a 14 day free trial of TinyMCE’s Premium plugins. Using the key also prevents domain identification errors showing up in the text area.',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 11,
        depth: 0,
      },
    },
    'b54622ee-0c19-4120-827e-4369cb0f1d03': {
      id: 'b54622ee-0c19-4120-827e-4369cb0f1d03',
      value: [
        {
          id: 'f51016be-6081-4114-972f-bd93869b216e',
          type: 'heading-one',
          children: [
            {
              text: 'Getting Started',
            },
            {
              text: '',
            },
            {
              id: '536e7d93-d806-45c7-93cc-e8f7d9045190',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/#getting-started',
                target: '',
                rel: '',
                title: '​',
                nodeType: 'inline',
              },
              children: [
                {
                  text: '​',
                },
              ],
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
        align: 'left',
      },
    },
    'b7caf1a0-686a-45b2-912f-5cbbef94fc62': {
      id: 'b7caf1a0-686a-45b2-912f-5cbbef94fc62',
      value: [
        {
          id: 'ccda7c3f-3c0b-4f93-a3a4-61183a9c96c3',
          type: 'heading-two',
          children: [
            {
              text: 'Overview',
            },
            {
              text: '',
            },
            {
              id: 'fd86e870-5697-45ea-8acf-53c136544c48',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/#overview',
                target: '',
                rel: '',
                title: '​',
                nodeType: 'inline',
              },
              children: [
                {
                  text: '​',
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
        order: 1,
        depth: 0,
        align: 'left',
      },
    },
    '0143333d-9f44-4e36-a8ef-7a13b411cb25': {
      id: '0143333d-9f44-4e36-a8ef-7a13b411cb25',
      value: [
        {
          id: '590ef55a-b0db-47fc-ad67-85fe643b9cec',
          type: 'paragraph',
          children: [
            {
              text: 'Vite (French word for "quick", pronounced',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: '/vit/',
            },
            {
              text: ', like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:',
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
        align: 'left',
      },
    },
    '74d84542-a671-4d14-8557-be19b22d64b1': {
      id: '74d84542-a671-4d14-8557-be19b22d64b1',
      value: [
        {
          id: '637e1399-2ac8-40bf-9ce4-27ef58e62095',
          type: 'bulleted-list',
          children: [
            {
              text: 'A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    '176a4353-c2da-4537-b369-d4953ceab75b': {
      id: '176a4353-c2da-4537-b369-d4953ceab75b',
      value: [
        {
          id: 'dc94b211-4f81-4da5-ae5d-406eca35f5f5',
          type: 'bulleted-list',
          children: [
            {
              text: 'A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 4,
        depth: 0,
      },
    },
    'a33d3bb7-7cd0-4f04-bd63-d146e3a593d6': {
      id: 'a33d3bb7-7cd0-4f04-bd63-d146e3a593d6',
      value: [
        {
          id: 'a5354895-951c-4d2f-aaa3-69d8d7ee298b',
          type: 'paragraph',
          children: [
            {
              text: "Vite is opinionated and comes with sensible defaults out of the box. Read about what's possible in the",
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: 'd8e67ce2-c59d-4b28-9ac4-e499abf59979',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/features',
                target: '',
                rel: '',
                title: 'Features Guide',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Features Guide',
                },
              ],
            },
            {
              text: '. Support for frameworks or integration with other tools is possible through',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: 'ad3de686-083d-4e61-afce-56355b649d6f',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/using-plugins',
                target: '',
                rel: '',
                title: 'Plugins',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Plugins',
                },
              ],
            },
            {
              text: '. The',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '4287179d-f36f-4ebe-9626-69ad49f599cc',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/config/',
                target: '',
                rel: '',
                title: 'Config Section',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Config Section',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'explains how to adapt Vite to your project if needed.',
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
        align: 'left',
      },
    },
    'edef9098-e1bd-4ada-8fec-8fd0bdd79099': {
      id: 'edef9098-e1bd-4ada-8fec-8fd0bdd79099',
      value: [
        {
          id: '9846750a-b86f-417f-b098-a61184d0b84b',
          type: 'paragraph',
          children: [
            {
              text: 'Vite is also highly extensible via its',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: 'f9402699-9ba6-44a2-b8f0-9fbfe830d367',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/api-plugin',
                target: '',
                rel: '',
                title: 'Plugin API',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Plugin API',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'and',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '67eba545-98e3-4a4a-b001-4919e5b39eaf',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/api-javascript',
                target: '',
                rel: '',
                title: 'JavaScript API',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'JavaScript API',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'with full typing support.',
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
        align: 'left',
      },
    },
    '438f8e49-4fd0-4e35-8f2b-ef16e05fac25': {
      id: '438f8e49-4fd0-4e35-8f2b-ef16e05fac25',
      value: [
        {
          id: '95133998-f55b-4c39-ab8b-f9755c29f288',
          type: 'paragraph',
          children: [
            {
              text: 'You can learn more about the rationale behind the project in the',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '0cf96852-c959-4ae4-af12-0ad3a99a9ca1',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/why',
                target: '',
                rel: '',
                title: 'Why Vite',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Why Vite',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'section.',
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
        align: 'left',
      },
    },
    '8eec0a67-08d9-4762-9f6e-be74718c2ecd': {
      id: '8eec0a67-08d9-4762-9f6e-be74718c2ecd',
      value: [
        {
          id: '52cb9a00-0fed-4608-b030-8035704477b6',
          type: 'heading-two',
          children: [
            {
              text: 'Browser Support',
            },
            {
              text: '',
            },
            {
              id: 'ef7f17ab-3744-4b4d-a842-700a7770e436',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/#browser-support',
                target: '',
                rel: '',
                title: '​',
                nodeType: 'inline',
              },
              children: [
                {
                  text: '​',
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
        order: 8,
        depth: 0,
        align: 'left',
      },
    },
    '21f0a01e-d7fd-4924-9e1d-d9684aed05db': {
      id: '21f0a01e-d7fd-4924-9e1d-d9684aed05db',
      value: [
        {
          id: 'a65abaa1-7f6f-4af9-a596-871248332e8c',
          type: 'paragraph',
          children: [
            {
              text: 'During development, Vite sets',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '4537b140-1be7-44d2-a889-dfab7cd53b82',
              type: 'link',
              props: {
                url: 'https://esbuild.github.io/api/#target',
                target: '_blank',
                rel: 'noreferrer',
                title: 'esnext as the transform target',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'esnext as the transform target',
                },
              ],
            },
            {
              text: ', because we assume a modern browser is used and it supports all of the latest JavaScript and CSS features. This prevents syntax lowering, letting Vite serve modules as close as possible to the original source code.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 9,
        depth: 0,
        align: 'left',
      },
    },
    'f719be9a-f174-40ef-b88d-f7f147a740aa': {
      id: 'f719be9a-f174-40ef-b88d-f7f147a740aa',
      value: [
        {
          id: '3fad48bf-69fa-4f0e-ad78-b2e433f94786',
          type: 'paragraph',
          children: [
            {
              text: 'For the production build, by default Vite targets browsers that support',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '3ff92ea3-4046-4352-974d-bbaf88429aba',
              type: 'link',
              props: {
                url: 'https://caniuse.com/es6-module',
                target: '_blank',
                rel: 'noreferrer',
                title: 'native ES Modules',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'native ES Modules',
                },
              ],
            },
            {
              text: ',',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '76d0b035-b408-4500-bec5-fcac5b74740e',
              type: 'link',
              props: {
                url: 'https://caniuse.com/es6-module-dynamic-import',
                target: '_blank',
                rel: 'noreferrer',
                title: 'native ESM dynamic import',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'native ESM dynamic import',
                },
              ],
            },
            {
              text: ', and',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '90c30151-630a-48da-bcf8-7959abd17a12',
              type: 'link',
              props: {
                url: 'https://caniuse.com/mdn-javascript_operators_import_meta',
                target: '_blank',
                rel: 'noreferrer',
                title: 'import.meta',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'import.meta',
                },
              ],
            },
            {
              text: '. Legacy browsers can be supported via the official',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: 'ab0c677a-ae60-49b8-a232-134e0b29f9b1',
              type: 'link',
              props: {
                url: 'https://github.com/vitejs/vite/tree/main/packages/plugin-legacy',
                target: '_blank',
                rel: 'noreferrer',
                title: '@vitejs/plugin-legacy',
                nodeType: 'inline',
              },
              children: [
                {
                  text: '@vitejs/plugin-legacy',
                },
              ],
            },
            {
              text: '. See the',
            },
            {
              text: ' ',
            },
            {
              text: '',
            },
            {
              id: '1d1ffc4b-f272-4aa4-8b85-45505f2c80ae',
              type: 'link',
              props: {
                url: 'https://vitejs.dev/guide/build',
                target: '',
                rel: '',
                title: 'Building for Production',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Building for Production',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'section for more details.',
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
        align: 'left',
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

  return (
    <form className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        style={{ width: 750 }}
        value={value}
      />
    </form>
  );
};

export default BasicExample;
