import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState<YooptaContentValue>({
    '805ff13e-7a15-465d-b73f-4a7699a67fe3': {
      id: '805ff13e-7a15-465d-b73f-4a7699a67fe3',
      value: [
        {
          id: '3abe4ec5-6052-4c67-ab40-f991afd536b0',
          type: 'heading-one',
          children: [
            {
              text: 'Running tasks',
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
    '6c97586e-b21b-4771-aab4-e4f974feb437': {
      id: '6c97586e-b21b-4771-aab4-e4f974feb437',
      value: [
        {
          id: 'ead11837-7bca-402c-90bd-b40d7b059ff7',
          type: 'paragraph',
          children: [
            {
              text: 'Turborepo optimizes the developer workflows in your repository by automatically parallelizing and caching tasks. Once a task is',
            },
            {
              text: ' ',
            },
            {
              id: 'c499c675-2bc0-4995-9bc0-e5cb9ad0835e',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks',
                target: '',
                rel: '',
                title: 'registered in turbo.json',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'registered in turbo.json',
                },
              ],
            },
            {
              text: ', you have a powerful new toolset for running the scripts in your repository:',
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
    'a4861c2b-c77a-46be-ad11-58412ca7e4e4': {
      id: 'a4861c2b-c77a-46be-ad11-58412ca7e4e4',
      value: [
        {
          id: 'c4a1efe1-ea47-4b8e-bb48-4c4664b0e5fe',
          type: 'bulleted-list',
          children: [
            {
              text: 'Use scripts in package.json for tasks you need to run often',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 2,
        depth: 0,
      },
    },
    'a3678c4e-ce39-4a66-81fc-78cc57897068': {
      id: 'a3678c4e-ce39-4a66-81fc-78cc57897068',
      value: [
        {
          id: '625a30bc-7191-4b73-b3e3-18bfc08d4304',
          type: 'bulleted-list',
          children: [
            {
              text: 'Use global turbo to quickly run custom tasks on-demand',
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
    'f5b8565c-49fa-4fb9-b0d3-8e9958576409': {
      id: 'f5b8565c-49fa-4fb9-b0d3-8e9958576409',
      value: [
        {
          id: '427f82d8-ef63-43a0-a23b-48d4b748a600',
          type: 'bulleted-list',
          children: [
            {
              text: 'Filter tasks by directories, package names, source control changes, and more',
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
    '1bfbffde-6fc9-4d24-a1d3-5367e9755449': {
      id: '1bfbffde-6fc9-4d24-a1d3-5367e9755449',
      value: [
        {
          id: '96502eb5-02f1-4603-85f9-69e60aea3a6d',
          type: 'paragraph',
          children: [
            {
              text: 'Running tasks through',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'is powerful because you get one model for executing workflows throughout your repository in development and in your CI pipelines.',
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
    'bd2b841e-f9ee-46b0-adfc-088782c4c72c': {
      id: 'bd2b841e-f9ee-46b0-adfc-088782c4c72c',
      value: [
        {
          id: 'f9e3f32c-111b-4d9e-84f4-33da3270efc4',
          type: 'heading-two',
          children: [
            {
              id: '710200ce-9d97-4dc1-b677-8465a180b7c2',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#using-scripts-in-packagejson',
                target: '',
                rel: '',
                title: 'Using scripts in package.json',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Using scripts in package.json',
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
    'd5cf04ab-8e32-4cd6-8ea2-2df27d12f700': {
      id: 'd5cf04ab-8e32-4cd6-8ea2-2df27d12f700',
      value: [
        {
          id: 'efc3b845-d64a-4cf8-a928-af44eefbedcd',
          type: 'paragraph',
          children: [
            {
              text: 'For tasks that you run frequently, you can write your',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'commands directly into your root',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'package.json',
            },
            {
              text: '.',
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
    '04e1c54c-2500-4789-87e1-00e0417c9da2': {
      id: '04e1c54c-2500-4789-87e1-00e0417c9da2',
      value: [
        {
          children: [
            {
              text: '{  "scripts": {    "dev": "turbo run dev",    "build": "turbo run build",    "test": "turbo run test",    "lint": "turbo run lint"  }}',
            },
          ],
          type: 'code',
          id: 'd096af98-99fd-4235-b86d-d3ef9527b27f',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 8,
        depth: 0,
      },
    },
    '87bcca1b-dcc8-4c5a-963c-83834c4e6c2a': {
      id: '87bcca1b-dcc8-4c5a-963c-83834c4e6c2a',
      value: [
        {
          id: 'e9a7faaa-e5d8-4d24-8b35-354ebef881ff',
          type: 'paragraph',
          children: [
            {
              text: 'Good to know:',
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
      },
    },
    '3d9d15bb-b158-4171-bccf-0fe551f53393': {
      id: '3d9d15bb-b158-4171-bccf-0fe551f53393',
      value: [
        {
          id: '61b56c01-8b86-432f-953f-c18adcaedfb7',
          type: 'paragraph',
          children: [
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'is an alias for',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo run',
            },
            {
              text: ' ',
            },
            {
              text: '- but we recommend using',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo run',
            },
            {
              text: ' ',
            },
            {
              text: 'in',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'package.json',
            },
            {
              text: ' ',
            },
            {
              text: 'and CI workflows to avoid potential collisions with possible',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'subcommands that could be added in the future.',
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
    '82f7045d-f203-4bf9-a5b0-91778f8b06bb': {
      id: '82f7045d-f203-4bf9-a5b0-91778f8b06bb',
      value: [
        {
          id: '1ccb86a9-6171-4858-9692-23cef94123f7',
          type: 'paragraph',
          children: [
            {
              text: 'These scripts can then be run using your package manager.',
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
    '9bd1b405-c3bb-4803-87b8-436eaaa93923': {
      id: '9bd1b405-c3bb-4803-87b8-436eaaa93923',
      value: [
        {
          children: [
            {
              text: 'npm run dev',
            },
          ],
          type: 'code',
          id: '80a8bf1b-1f50-4a1c-9242-178ea0296a7e',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 12,
        depth: 0,
      },
    },
    '76d91bf8-8026-442a-9e31-7c54ae5aea8b': {
      id: '76d91bf8-8026-442a-9e31-7c54ae5aea8b',
      value: [
        {
          id: 'd9c94602-1d76-4f46-b440-95d52f637c30',
          type: 'paragraph',
          children: [
            {
              text: 'You only want to write',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'commands in your root',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'package.json',
            },
            {
              text: '. Writing',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'commands into the',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'package.json',
            },
            {
              text: ' ',
            },
            {
              text: 'of packages can lead to recursively calling',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 13,
        depth: 0,
      },
    },
    '89cc2d0f-132d-4b65-9180-2e867b5aae21': {
      id: '89cc2d0f-132d-4b65-9180-2e867b5aae21',
      value: [
        {
          id: '3b7d5ece-c697-4f19-a32e-1f2ea61c680d',
          type: 'heading-two',
          children: [
            {
              id: '284f44ca-ba35-432f-8b47-93e5f6059a90',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#using-global-turbo',
                target: '',
                rel: '',
                title: 'Using global turbo',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Using global turbo',
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
        order: 14,
        depth: 0,
      },
    },
    '39abf9c6-a3eb-4a40-97bb-a38a2f9b59f0': {
      id: '39abf9c6-a3eb-4a40-97bb-a38a2f9b59f0',
      value: [
        {
          id: '4533fa67-6a65-4c14-9bdd-a83c46321e12',
          type: 'paragraph',
          children: [
            {
              id: '2197c1d1-249f-4da1-93b6-a94ab2a7ce55',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/getting-started/installation#global-installation',
                target: '',
                rel: '',
                title: 'Installing turbo globally',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Installing turbo globally',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'lets you run commands directly from your terminal. This improves your local development experience since it makes it easier to run exactly what you need, when you need it.',
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
    'd2d68ff5-57c6-41a4-b3ec-9dcf0786c165': {
      id: 'd2d68ff5-57c6-41a4-b3ec-9dcf0786c165',
      value: [
        {
          id: 'cfe409b1-802b-42b8-b53c-b5093b56b4f6',
          type: 'paragraph',
          children: [
            {
              text: 'Additionally, global',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'is useful in your CI pipelines, giving you maximum control of exactly which tasks to run at each point in your pipeline.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 16,
        depth: 0,
      },
    },
    '1664b32d-ec73-45e3-831f-96d77fa27397': {
      id: '1664b32d-ec73-45e3-831f-96d77fa27397',
      value: [
        {
          id: '1ae0cc65-a87a-426f-9352-6e6181fd3f9a',
          type: 'heading-three',
          children: [
            {
              id: '27441916-7c4c-4728-b84a-b5b44957a03a',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#automatic-package-scoping',
                target: '',
                rel: '',
                title: 'Automatic Package Scoping',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Automatic Package Scoping',
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
        order: 17,
        depth: 0,
      },
    },
    'cb4d7ae4-d2aa-4ff0-9a69-967b2de57cca': {
      id: 'cb4d7ae4-d2aa-4ff0-9a69-967b2de57cca',
      value: [
        {
          id: '0e372635-2226-4daa-8d7d-2c3b85171f57',
          type: 'paragraph',
          children: [
            {
              text: "When you're in a package's directory,",
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'will automatically scope commands to the',
            },
            {
              text: ' ',
            },
            {
              id: '066b29e9-1181-4de3-80d9-4325b808da1b',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/core-concepts/package-and-task-graph#package-graph',
                target: '',
                rel: '',
                title: 'Package Graph',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Package Graph',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'for that package. This means you can quickly write commands without having to',
            },
            {
              text: ' ',
            },
            {
              id: '5a0008c4-25de-4780-80e4-f10d76031bab',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/reference/run#--filter-string',
                target: '',
                rel: '',
                title: 'write filters',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'write filters',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'for the package.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 18,
        depth: 0,
      },
    },
    '1daa6215-0f00-4dde-a458-fb3463e9efae': {
      id: '1daa6215-0f00-4dde-a458-fb3463e9efae',
      value: [
        {
          children: [
            {
              text: 'cd apps/docsturbo build',
            },
          ],
          type: 'code',
          id: '60ba6b34-7e2a-4589-a094-44b8436df56a',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 19,
        depth: 0,
      },
    },
    '2ba49f22-387c-46bc-867f-419470cabf9d': {
      id: '2ba49f22-387c-46bc-867f-419470cabf9d',
      value: [
        {
          id: 'afa9edc2-00be-4226-9c03-33ea76ac947e',
          type: 'paragraph',
          children: [
            {
              text: 'In the example above, the',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo build',
            },
            {
              text: ' ',
            },
            {
              text: 'command will run the',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'build',
            },
            {
              text: ' ',
            },
            {
              text: 'task for the',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'docs',
            },
            {
              text: ' ',
            },
            {
              text: 'package using the',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'build',
            },
            {
              text: ' ',
            },
            {
              text: 'task registered in',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo.json',
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 20,
        depth: 0,
      },
    },
    '5702aee3-80c5-4580-86c2-8998d1a9318b': {
      id: '5702aee3-80c5-4580-86c2-8998d1a9318b',
      value: [
        {
          id: '61b9f05d-c8c8-4c4b-898e-2b64dc407d1d',
          type: 'paragraph',
          children: [
            {
              text: 'Good to know:',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 21,
        depth: 0,
      },
    },
    'df4d040f-2f2a-40c6-8697-57ecfb2df290': {
      id: 'df4d040f-2f2a-40c6-8697-57ecfb2df290',
      value: [
        {
          id: '1107a3a2-3534-4a70-8fff-9b7a60e2fec6',
          type: 'paragraph',
          children: [
            {
              id: '26f50e74-aec6-4199-8d0e-791457b7b5ba',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#using-filters',
                target: '',
                rel: '',
                title: 'Using a filter',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Using a filter',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'will override Automatic Package Scoping.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 22,
        depth: 0,
      },
    },
    'fe4ed7c0-7643-499c-b0c2-3e59e5931c0b': {
      id: 'fe4ed7c0-7643-499c-b0c2-3e59e5931c0b',
      value: [
        {
          id: '48294328-4b98-418d-8173-4ba93742a5d1',
          type: 'heading-three',
          children: [
            {
              id: '4bd12dac-735b-48d2-bf8b-4faad97164e6',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#customizing-behavior',
                target: '',
                rel: '',
                title: 'Customizing behavior',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Customizing behavior',
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
        order: 23,
        depth: 0,
      },
    },
    '95a34cdb-9e99-4a30-8c56-e3c6c0cb69ef': {
      id: '95a34cdb-9e99-4a30-8c56-e3c6c0cb69ef',
      value: [
        {
          id: 'd7fc971f-c5a8-4517-9890-799fd53c5efd',
          type: 'paragraph',
          children: [
            {
              text: 'In',
            },
            {
              text: ' ',
            },
            {
              id: 'd1f520e2-e520-4575-b958-3fd0ee284494',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/reference/run',
                target: '',
                rel: '',
                title: 'the documentation for the run subcommand',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'the documentation for the run subcommand',
                },
              ],
            },
            {
              text: ", you'll find many useful flags to tailor the behavior of",
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo run',
            },
            {
              text: ' ',
            },
            {
              text: 'for what you need. When running global',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ', you can go faster using workflows like:',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 24,
        depth: 0,
      },
    },
    '450da357-4c92-4c25-b755-e2554ab0dcc5': {
      id: '450da357-4c92-4c25-b755-e2554ab0dcc5',
      value: [
        {
          id: 'ff94fc31-1033-4dd6-94ba-3f09ef100fd3',
          type: 'bulleted-list',
          children: [
            {
              text: "Variations of your most common commands: The build script in package.json has the most utility when it is turbo build - but you might only be interested in a specific package at the moment. You can quickly filter for the specific package you're interested in using turbo build --filter=@repo/ui.",
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 25,
        depth: 0,
      },
    },
    'b0444145-5dc6-4cb4-ab2e-5ef3d1316b66': {
      id: 'b0444145-5dc6-4cb4-ab2e-5ef3d1316b66',
      value: [
        {
          id: '6ff50731-fd03-4afa-96a9-71ca8dc2f500',
          type: 'bulleted-list',
          children: [
            {
              text: "One-off commands: Commands like turbo build --dry aren't needed often so you likely won't create a script in your package.json for it. Instead, you can run it directly in your terminal whenever you need it.",
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 26,
        depth: 0,
      },
    },
    'ceac8a17-a58f-4bd8-956d-7315921f34ef': {
      id: 'ceac8a17-a58f-4bd8-956d-7315921f34ef',
      value: [
        {
          id: 'f60cedb7-9c34-40bc-94f7-08309412bb26',
          type: 'bulleted-list',
          children: [
            {
              text: 'Overriding turbo.json configuration: Some CLI flags have an equivalent in turbo.json that you can override. For instance, you may have a turbo build command configured to use "outputLogs": "full" in turbo.json - but you\'re only interested in seeing errors at the moment. Using global turbo, you can use turbo lint --output-logs=errors-only to only show errors.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 27,
        depth: 0,
      },
    },
    '249e39f3-f255-403f-a662-1432f900f695': {
      id: '249e39f3-f255-403f-a662-1432f900f695',
      value: [
        {
          id: '18b47e64-28f7-4ea1-bd2c-5fc14338b7ca',
          type: 'heading-two',
          children: [
            {
              id: '533aa2fb-747d-40c4-a411-f4e317a9da1e',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#running-multiple-tasks',
                target: '',
                rel: '',
                title: 'Running multiple tasks',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Running multiple tasks',
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
        order: 28,
        depth: 0,
      },
    },
    'c9734473-e9d1-4f76-8b79-ca89f0e1e099': {
      id: 'c9734473-e9d1-4f76-8b79-ca89f0e1e099',
      value: [
        {
          id: 'e78b7a61-952e-456d-b9e7-7f60bc694d45',
          type: 'paragraph',
          children: [
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'is able to run multiple tasks, parallelizing whenever possible.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 29,
        depth: 0,
      },
    },
    '05e596ed-5eb9-4bb1-9fac-6680e050afe6': {
      id: '05e596ed-5eb9-4bb1-9fac-6680e050afe6',
      value: [
        {
          children: [
            {
              text: 'turbo run build test lint check-types',
            },
          ],
          type: 'code',
          id: 'c463c876-2532-4930-9f8e-7d4843835d34',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 30,
        depth: 0,
      },
    },
    '044e4a19-72ca-4333-9197-bf26922abb03': {
      id: '044e4a19-72ca-4333-9197-bf26922abb03',
      value: [
        {
          id: 'd0ca21d8-052e-48ff-a607-5a71655dd01c',
          type: 'paragraph',
          children: [
            {
              text: 'This command will run all of the tasks, automatically detecting where it can run a script as early as possible, according to your task definitions.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 31,
        depth: 0,
      },
    },
    '5053027e-f0e9-42e5-b7c1-d2bde68c05c8': {
      id: '5053027e-f0e9-42e5-b7c1-d2bde68c05c8',
      value: [
        {
          id: '95fed8ec-e69d-4935-b534-4d1bd586036b',
          type: 'paragraph',
          children: [
            {
              text: 'Ordering of tasks',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 32,
        depth: 0,
      },
    },
    '35fa9372-4947-4ea8-895f-805fae8e715f': {
      id: '35fa9372-4947-4ea8-895f-805fae8e715f',
      value: [
        {
          id: 'd11f77b0-8b50-4b19-a9ea-3fc9ef2cd33b',
          type: 'paragraph',
          children: [
            {
              code: true,
              text: 'turbo test lint',
            },
            {
              text: ' ',
            },
            {
              text: 'will run tasks exactly the same as',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo lint test',
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 33,
        depth: 0,
      },
    },
    '5ec07948-4008-4d08-8cce-c091b692dee0': {
      id: '5ec07948-4008-4d08-8cce-c091b692dee0',
      value: [
        {
          id: '8e85dd74-406b-4923-86eb-b36fe1f97247',
          type: 'paragraph',
          children: [
            {
              text: 'If you want to ensure that one task blocks the execution of another, express that relationship in your',
            },
            {
              text: ' ',
            },
            {
              id: 'c1e450fa-d5be-42fc-816c-cbf0b1cbae75',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks#defining-tasks',
                target: '',
                rel: '',
                title: 'task configurations',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'task configurations',
                },
              ],
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 34,
        depth: 0,
      },
    },
    '0d2225a2-e711-4724-b2c1-96d38fe6e532': {
      id: '0d2225a2-e711-4724-b2c1-96d38fe6e532',
      value: [
        {
          id: '95de2696-d832-4342-8246-893f93e079f8',
          type: 'heading-two',
          children: [
            {
              id: '4784634d-f17d-4e37-9879-c14e9bc0f35d',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#using-filters',
                target: '',
                rel: '',
                title: 'Using filters',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Using filters',
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
        order: 35,
        depth: 0,
      },
    },
    '63067050-44ac-477a-8ad9-3cc0e096ff6a': {
      id: '63067050-44ac-477a-8ad9-3cc0e096ff6a',
      value: [
        {
          id: '807e6864-a71b-45fc-a3c4-ce58fcb916b7',
          type: 'paragraph',
          children: [
            {
              text: 'While',
            },
            {
              text: ' ',
            },
            {
              id: '49b8921c-f267-4e78-ac6c-9cb72dde138a',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks',
                target: '',
                rel: '',
                title: 'caching',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'caching',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'ensures you stay fast by never doing the same work twice, you can also filter tasks to run only a subset of',
            },
            {
              text: ' ',
            },
            {
              id: '20f46d83-2438-4229-bd22-87d601bba4e7',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/core-concepts/package-and-task-graph#task-graph',
                target: '',
                rel: '',
                title: 'the Task Graph',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'the Task Graph',
                },
              ],
            },
            {
              text: ', according to your needs.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 36,
        depth: 0,
      },
    },
    'ccc03641-ce50-4c1d-85ba-9c2763cf0546': {
      id: 'ccc03641-ce50-4c1d-85ba-9c2763cf0546',
      value: [
        {
          id: 'e64baeed-ba6c-4de6-acad-41f46439d89c',
          type: 'paragraph',
          children: [
            {
              text: 'There are many advanced use cases for filtering in',
            },
            {
              text: ' ',
            },
            {
              id: '597bdff0-19f5-4c23-83e9-c51b52f22f85',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/reference/run#--filter-string',
                target: '',
                rel: '',
                title: 'the --filter API reference',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'the --filter API reference',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'but the most common use cases are discussed below.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 37,
        depth: 0,
      },
    },
    '9aaeecc7-4a68-43eb-8b59-82bda3d4df80': {
      id: '9aaeecc7-4a68-43eb-8b59-82bda3d4df80',
      value: [
        {
          id: '80036824-a619-4b6c-b758-f5283945763b',
          type: 'heading-three',
          children: [
            {
              id: 'ee206427-23c7-4fa5-a099-80babbbd426c',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#filtering-by-package-name',
                target: '',
                rel: '',
                title: 'Filtering by package name',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Filtering by package name',
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
        order: 38,
        depth: 0,
      },
    },
    'b0b5aecb-d51d-4391-b3df-580d31b2137e': {
      id: 'b0b5aecb-d51d-4391-b3df-580d31b2137e',
      value: [
        {
          id: '10a9af8d-53f9-4385-897a-3c98e10bf90c',
          type: 'paragraph',
          children: [
            {
              text: "Filtering by package is a simple way to only run tasks for the packages you're currently working on.",
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 39,
        depth: 0,
      },
    },
    '0866b361-844c-4dc8-9639-d0d51935d1be': {
      id: '0866b361-844c-4dc8-9639-d0d51935d1be',
      value: [
        {
          children: [
            {
              text: 'turbo build --filter=@acme/web',
            },
          ],
          type: 'code',
          id: '8e2d5ec1-e369-4fbc-9116-0356412011bd',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 40,
        depth: 0,
      },
    },
    '4e03919e-8dca-4119-a99d-ad3af56833cf': {
      id: '4e03919e-8dca-4119-a99d-ad3af56833cf',
      value: [
        {
          id: '7dbde17f-126f-43d9-914d-72fc702ad530',
          type: 'heading-three',
          children: [
            {
              id: '22728ee7-e3b7-498d-9339-f738057ad907',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#filtering-by-directory',
                target: '',
                rel: '',
                title: 'Filtering by directory',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Filtering by directory',
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
        order: 41,
        depth: 0,
      },
    },
    '21c1153f-4acb-4cc4-9057-11647a826701': {
      id: '21c1153f-4acb-4cc4-9057-11647a826701',
      value: [
        {
          id: '70093556-196e-49d3-9c4a-20bd467c025c',
          type: 'paragraph',
          children: [
            {
              text: 'Your repository might have a directory structure where related packages are grouped together. In this case, you can capture the glob for that directory to focus',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'on those packages.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 42,
        depth: 0,
      },
    },
    '62b20eb9-db8d-493b-bd6d-b0bb1c964f51': {
      id: '62b20eb9-db8d-493b-bd6d-b0bb1c964f51',
      value: [
        {
          children: [
            {
              text: 'turbo lint --filter="./packages/utilities/*"',
            },
          ],
          type: 'code',
          id: '6fc43631-c7e0-435e-8c2b-6411f871c06c',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 43,
        depth: 0,
      },
    },
    '2f694884-6d4e-4a31-9e5f-7aa11174171f': {
      id: '2f694884-6d4e-4a31-9e5f-7aa11174171f',
      value: [
        {
          id: 'c17687ca-133e-4e5f-8a60-972da8dfead1',
          type: 'heading-three',
          children: [
            {
              id: '8be12e7c-3a14-40fb-b31b-909ec9eb5ad1',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#filtering-to-include-dependents',
                target: '',
                rel: '',
                title: 'Filtering to include dependents',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Filtering to include dependents',
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
        order: 44,
        depth: 0,
      },
    },
    'f9045fa2-b204-4b0e-abe2-77f4c405277c': {
      id: 'f9045fa2-b204-4b0e-abe2-77f4c405277c',
      value: [
        {
          id: '176f5e5a-e7d8-41a0-95d0-b4c40b915df7',
          type: 'paragraph',
          children: [
            {
              text: "When you're working on a specific package, you might want to run tasks for the package and its dependents. The",
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: '...',
            },
            {
              text: ' ',
            },
            {
              text: "microsyntax is useful when you're making changes to a package and want to ensure that the changes don't break any of its dependents.",
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 45,
        depth: 0,
      },
    },
    '4998dadb-5282-4052-b04c-f3a20f41637f': {
      id: '4998dadb-5282-4052-b04c-f3a20f41637f',
      value: [
        {
          children: [
            {
              text: 'turbo build --filter=...ui',
            },
          ],
          type: 'code',
          id: '5f3a5e38-74ae-4d07-b54a-9d1de0f9f4a8',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 46,
        depth: 0,
      },
    },
    '21650058-3849-457f-9a8a-fee6cb2dcdcf': {
      id: '21650058-3849-457f-9a8a-fee6cb2dcdcf',
      value: [
        {
          id: '7fa90e32-bbfb-4dc3-b93c-7b415159942c',
          type: 'heading-three',
          children: [
            {
              id: '71d35c1a-fb7a-4955-bd54-259bc3fdeb84',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#filtering-by-source-control-changes',
                target: '',
                rel: '',
                title: 'Filtering by source control changes',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Filtering by source control changes',
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
        order: 47,
        depth: 0,
      },
    },
    '118360a6-bbf4-44f9-bc3f-7d4c58f83756': {
      id: '118360a6-bbf4-44f9-bc3f-7d4c58f83756',
      value: [
        {
          id: '08ffa993-0936-4263-b820-44593f5a1b17',
          type: 'paragraph',
          children: [
            {
              text: 'Using filters to run tasks based on changes in source control is a great way to run only the tasks for packages that are affected by your changes.',
            },
            {
              text: ' ',
            },
            {
              bold: true,
              text: 'Source control filters must be wrapped in []',
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 48,
        depth: 0,
      },
    },
    '82e3c0a9-1bda-4375-880c-c564baee585a': {
      id: '82e3c0a9-1bda-4375-880c-c564baee585a',
      value: [
        {
          id: 'ece48f04-a325-42dc-9148-d034b301e014',
          type: 'bulleted-list',
          children: [
            {
              text: 'Comparing to the previous commit: turbo build --filter=[HEAD^1]',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 49,
        depth: 0,
      },
    },
    '8cfcce0d-f830-4273-b5f1-570dcda5389e': {
      id: '8cfcce0d-f830-4273-b5f1-570dcda5389e',
      value: [
        {
          id: '4e9e62a6-f632-4fe5-a581-52edb5c456f4',
          type: 'bulleted-list',
          children: [
            {
              text: 'Comparing to the main branch: turbo build --filter=[main...my-feature]',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 50,
        depth: 0,
      },
    },
    'fc0f983d-f697-4398-931a-58a088b13330': {
      id: 'fc0f983d-f697-4398-931a-58a088b13330',
      value: [
        {
          id: '13a597bd-f24a-43b5-b729-8f782c6f4f61',
          type: 'bulleted-list',
          children: [
            {
              text: 'Comparing specific commits using SHAs: turbo build --filter=[a1b2c3d...e4f5g6h]',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 51,
        depth: 0,
      },
    },
    'c6165f9b-48c1-4bf4-81e4-406c0528db82': {
      id: 'c6165f9b-48c1-4bf4-81e4-406c0528db82',
      value: [
        {
          id: '99a5d8d4-535c-4fdc-9cc0-3b26bfb3a849',
          type: 'bulleted-list',
          children: [
            {
              text: 'Comparing specific commits using branch names: turbo build --filter=[your-feature...my-feature]',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 52,
        depth: 0,
      },
    },
    '0db8982a-7545-4772-b625-de73d4ab035d': {
      id: '0db8982a-7545-4772-b625-de73d4ab035d',
      value: [
        {
          id: 'd568de9d-1f59-4dbe-915d-8a088bb0fa74',
          type: 'paragraph',
          children: [
            {
              text: "In general, you can rely on caching to keep your repository fast. When you're using",
            },
            {
              text: ' ',
            },
            {
              id: 'db34d100-2bfe-4f2a-aefc-7baee4cf698a',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/core-concepts/remote-caching',
                target: '',
                rel: '',
                title: 'Remote Caching',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Remote Caching',
                },
              ],
            },
            {
              text: ', you can count on hitting cache for unchanged packages.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 53,
        depth: 0,
      },
    },
    '6d52936d-50d6-400d-8fa3-1fb87a60532c': {
      id: '6d52936d-50d6-400d-8fa3-1fb87a60532c',
      value: [
        {
          id: 'e066de0c-1bd3-41de-8c15-ab23040d49ed',
          type: 'heading-three',
          children: [
            {
              id: 'b663f7c6-efcf-4515-b7de-54a977ac8084',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#combining-filters',
                target: '',
                rel: '',
                title: 'Combining filters',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Combining filters',
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
        order: 54,
        depth: 0,
      },
    },
    '115770fa-abf8-4651-bb68-9a0a767ce0d5': {
      id: '115770fa-abf8-4651-bb68-9a0a767ce0d5',
      value: [
        {
          id: '6b60bec4-7a61-43c3-80b9-7099413176cc',
          type: 'paragraph',
          children: [
            {
              text: 'For even more specificity, you can combine filters to further refine the entrypoints into your',
            },
            {
              text: ' ',
            },
            {
              id: '593b5d92-f935-419a-bf9e-ae0956917f3c',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/core-concepts/package-and-task-graph#task-graph',
                target: '',
                rel: '',
                title: 'Task Graph',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Task Graph',
                },
              ],
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 55,
        depth: 0,
      },
    },
    'cd6dc1e7-6da4-4e10-b509-d3a514b483fa': {
      id: 'cd6dc1e7-6da4-4e10-b509-d3a514b483fa',
      value: [
        {
          children: [
            {
              text: 'turbo build --filter=...ui --filter={./packages/*} --filter=[HEAD^1]',
            },
          ],
          type: 'code',
          id: '1f0a0ef8-6fc8-4248-a0dd-03f41349cf4e',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 56,
        depth: 0,
      },
    },
    '1fb56120-4371-455c-aa67-0f286ecf9233': {
      id: '1fb56120-4371-455c-aa67-0f286ecf9233',
      value: [
        {
          id: '78089041-731f-457b-9fcf-16844afc1962',
          type: 'paragraph',
          children: [
            {
              text: 'Multiple filters are combined as a',
            },
            {
              text: ' ',
            },
            {
              bold: true,
              text: 'union',
            },
            {
              text: ', meaning that the',
            },
            {
              text: ' ',
            },
            {
              id: '8c076ed0-b1f2-4af7-9461-52b2c24deed0',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/core-concepts/package-and-task-graph#task-graph',
                target: '',
                rel: '',
                title: 'Task Graph',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Task Graph',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'will include tasks that match any of the filters. For more information on advanced usage of filters, see',
            },
            {
              text: ' ',
            },
            {
              id: '8c9eb610-1ec6-4eca-bba8-93b8c4a572cf',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/reference/run#--filter-string',
                target: '',
                rel: '',
                title: 'the --filter API reference',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'the --filter API reference',
                },
              ],
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 57,
        depth: 0,
      },
    },
    'c5cdf01e-c5ad-4981-be19-37250e43c347': {
      id: 'c5cdf01e-c5ad-4981-be19-37250e43c347',
      value: [
        {
          id: 'e05abec4-3523-459a-aa3d-777768b8f6ea',
          type: 'heading-two',
          children: [
            {
              id: '54cdb5ba-1b04-4983-b0d2-031541df5a21',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/running-tasks#next-steps',
                target: '',
                rel: '',
                title: 'Next steps',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Next steps',
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
        order: 58,
        depth: 0,
      },
    },
    '898b7a8f-056a-4673-ae19-54bdb6504d63': {
      id: '898b7a8f-056a-4673-ae19-54bdb6504d63',
      value: [
        {
          id: 'bb3e82cf-2c3b-4fb9-8762-433e1174d7fd',
          type: 'paragraph',
          children: [
            {
              text: "When you start running tasks in your repository, you might start noticing that your tasks get faster. Next, you'll explore",
            },
            {
              text: ' ',
            },
            {
              id: '99d9e0b6-b4f7-44ee-9d0d-8f642e2d8b83',
              type: 'link',
              props: {
                url: 'https://turbo.build/repo/docs/crafting-your-repository/caching',
                target: '',
                rel: '',
                title: 'caching',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'caching',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'and how',
            },
            {
              text: ' ',
            },
            {
              code: true,
              text: 'turbo',
            },
            {
              text: ' ',
            },
            {
              text: 'makes it so you never do the same work twice.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 59,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

  return (
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
        style={{ width: 750 }}
        value={value}
      />
    </div>
  );
};

export default BasicExample;
