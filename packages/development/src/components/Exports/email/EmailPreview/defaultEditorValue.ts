import { YooptaContentValue } from '@yoopta/editor';

export const EMAIL_EDITOR_DEFAULT_VALUE = {
  '24ca5328-2eb6-44ad-983d-f01203559072': {
    id: '24ca5328-2eb6-44ad-983d-f01203559072',
    type: 'Paragraph',
    value: [
      {
        id: '7959ae84-ba07-4cc0-95b8-f222a6534372',
        type: 'paragraph',
        children: [
          {
            text: '👋 ',
          },
          {
            text: 'We’ve returned with the Medium Newsletter',
            bold: true,
          },
          {
            text: ' ',
            bold: true,
          },
          {
            text: 'Issue #187: analyzing tech layoffs and observing without absorbing',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            text: 'By',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            id: '618e48b3-0f8d-4d65-8f0b-83904c3439aa',
            type: 'link',
            props: {
              url: 'https://medium.com/u/7428661d5cfd?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Harris Sockel',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                text: 'Harris Sockel',
              },
            ],
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 0,
    },
  },
  '2035f616-2f25-4f65-852a-3cf346ec2415': {
    id: '2035f616-2f25-4f65-852a-3cf346ec2415',
    type: 'Paragraph',
    value: [
      {
        id: '55593ace-ab32-42e8-ac9f-7f11b39f479b',
        type: 'paragraph',
        children: [
          {
            text: '“I awoke about 2 a.m. the night of the storm to the sound of small explosions in the street,” writes Asheville resident ',
          },
          {
            id: '0a7aeaa5-17de-4e72-b0e8-1e75d8e64194',
            type: 'link',
            props: {
              url: 'https://medium.com/u/2c55fbba6368?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Doug Brown',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'Doug Brown',
              },
            ],
          },
          {
            text: ' in a',
          },
          {
            id: '0c0a82ef-0d3d-46e5-8b9a-ff3ac29768fc',
            type: 'link',
            props: {
              url: 'https://medium.com/the-narrative-arc/my-hurricane-helene-strength-training-program-2896fbec15ad?sk=v2%2Fbfe9a41d-a077-4c1f-8b38-519263f1f047',
              target: '_blank',
              rel: 'noopener',
              title: ' story',
              nodeType: 'inline',
            },
            children: [
              {
                text: ' story',
              },
            ],
          },
          {
            text: ' about life after Hurricane Helene. “My room kept lighting up in odd colors. I looked out the window and saw sparks flying in all directions in iridescent blues and greens. It would have been beautiful if it were not terrifying.”',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 1,
    },
  },
  'acb0b470-6064-41b6-a95a-ce91c70806f2': {
    id: 'acb0b470-6064-41b6-a95a-ce91c70806f2',
    type: 'Code',
    value: [
      {
        children: [
          {
            text: " const nextParentPathIndex = parentPath[0] + 1;\n    const nextBlockSlateValue = slate.children[nextParentPathIndex] as SlateElement;\n\n    Transforms.removeNodes(slate, {\n      at: [nextParentPathIndex],\n      match: (n) => Element.isElement(n),\n      mode: 'highest',\n    });\n\n    operations.push({\n      type: 'split_block',\n      prevProperties: blockToSplit,\n      properties: nextNewBlock,\n      slate: newSlate,\n    });\n}",
          },
        ],
        type: 'code',
        id: 'd2b7ca0a-5538-4d0e-b50e-6b434e0e2f22',
        props: {
          language: 'javascript',
          theme: 'GithubDark',
          nodeType: 'void',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 2,
    },
  },
  'a6b7d51e-5231-4165-a44f-08d7c8a4a62a': {
    id: 'a6b7d51e-5231-4165-a44f-08d7c8a4a62a',
    type: 'Paragraph',
    value: [
      {
        id: '79227637-6a89-46f6-ab8d-9d94ec5f0e08',
        type: 'paragraph',
        children: [
          {
            text: 'Almost ',
          },
          {
            id: 'b885931f-3b2a-47cd-966a-942a1ca29fd2',
            type: 'link',
            props: {
              url: 'https://www.axios.com/local/raleigh/2024/10/15/nearly-100-people-still-unaccounted-for-in-north-carolina-following-helene',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: '100 people are missing',
              nodeType: 'inline',
            },
            children: [
              {
                text: '100 people are missing',
              },
            ],
          },
          {
            text: ' in North Carolina. Entire towns, ',
          },
          {
            id: '8d59c733-c6a9-4171-9921-ef0ddfcdf901',
            type: 'link',
            props: {
              url: 'https://www.npr.org/sections/the-picture-show/2024/10/02/g-s1-25941/north-carolina-marshall-hot-springs-helene-cleanup',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: 'like Marshall',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'like Marshall',
              },
            ],
          },
          {
            text: ', were underwater. Brown and his neighbors still don’t have running water, and when the water does come back they’ll need to boil it. For now, they’re lining up with buckets every few days:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 3,
    },
  },
  '1158a4c4-7437-439b-9a76-c6c82a76d61a': {
    id: '1158a4c4-7437-439b-9a76-c6c82a76d61a',
    type: 'Blockquote',
    value: [
      {
        id: 'cefb3465-6240-4877-997c-5d758609a00b',
        type: 'blockquote',
        children: [
          {
            text: 'I wash myself with a washcloth and splash rubbing alcohol in my armpits, and dream of the day when I can take a shower again. Asheville is kind of a hippie town, but as my friend Molly puts it, “We’re all hippies now.”',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 4,
    },
  },
  '8a227277-81c7-4f22-99e5-5bf52544856e': {
    id: '8a227277-81c7-4f22-99e5-5bf52544856e',
    type: 'Paragraph',
    value: [
      {
        id: '954e6ca7-a65b-4d95-a9b3-d0b2963cbb3c',
        type: 'paragraph',
        children: [
          {
            text: 'Brown’s story is more human than anything I’ve read about this disaster so far. It makes me feel like I’m there. It’s also an inspiring tribute to humans’ ability to simply keep going when faced with ambiguity, change, and hardship. “Our grief is real,” Brown writes. “But so is our strength.”',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 5,
    },
  },
  'e669cabe-0fd8-4621-a89b-e896e93c1110': {
    id: 'e669cabe-0fd8-4621-a89b-e896e93c1110',
    type: 'Image',
    value: [
      {
        id: '8009b857-2764-44f1-bdca-806231f95231',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1729177867/Screenshot_2024-10-16_at_20.19.51_px95za.png',
          alt: 'undefined',
          srcSet: '',
          fit: 'contain',
          sizes: {
            width: 360,
            height: 360,
          },
        },
      },
    ],
    meta: {
      align: 'center',
      depth: 0,
      order: 6,
    },
  },
  '93c2366b-ce44-4835-ad54-15a4b075d37f': {
    id: '93c2366b-ce44-4835-ad54-15a4b075d37f',
    type: 'HeadingOne',
    value: [
      {
        id: '39d207d2-557e-4488-9d56-e2fd75e20f2d',
        type: 'heading-one',
        children: [
          {
            text: 'One more story: analyzing tech layoffs',
            bold: true,
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 7,
    },
  },
  'fe7b5ee2-4d4d-4d60-9e7e-ce79092bf4c0': {
    id: 'fe7b5ee2-4d4d-4d60-9e7e-ce79092bf4c0',
    type: 'Paragraph',
    value: [
      {
        id: '8e217431-08e8-4e4e-b9d0-54e4a7ef3619',
        type: 'paragraph',
        children: [
          {
            text: 'Tech’s been in the midst of ',
          },
          {
            id: '2677d94b-7900-47fc-a5fc-e90bb59e47d7',
            type: 'link',
            props: {
              url: 'https://www.forbes.com/sites/emilsayegh/2024/08/19/the-great-tech-reset-unpacking-the-layoff-surge-of-2024/',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: 'a recession',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'a recession',
              },
            ],
          },
          {
            text: ' since the pandemic: According to ',
          },
          {
            id: '446613f7-b426-4d23-b5bd-a0434e2e4628',
            type: 'link',
            props: {
              url: 'https://layoffs.fyi/',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: 'layoffs.fyi',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'layoffs.fyi',
              },
            ],
          },
          {
            text: ', 470 tech companies laid off 141,000 employees in 2024. Those numbers are a bit better than what we saw in 2023 (264K layoffs total), so maybe we’re heading toward brighter days… but it’s unclear.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 8,
    },
  },
  '91716cee-9e34-460d-b8f0-7dc109fcac1c': {
    id: '91716cee-9e34-460d-b8f0-7dc109fcac1c',
    type: 'Paragraph',
    value: [
      {
        id: '7106506c-bdfe-4afa-ac90-553732a24128',
        type: 'paragraph',
        children: [
          {
            text: 'Analytics and experimentation director ',
          },
          {
            id: 'eeda09e5-2d93-4e21-b3fb-27d8e91456bb',
            type: 'link',
            props: {
              url: 'https://medium.com/u/9f03ad274fc9?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Bhavik Patel',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'Bhavik Patel',
              },
            ],
          },
          {
            text: ' ',
          },
          {
            id: '497c0a9d-a328-40b6-92ac-f5740f44eaab',
            type: 'link',
            props: {
              url: 'https://productcoalition.com/analysing-tech-layoffs-c67d7de2d630?sk=v2%2F4b54f1dc-d0bf-4893-97a4-0cb1af48da51',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: 'analyzed a dataset of 2,800 layoffs',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'analyzed a dataset of 2,800 layoffs',
              },
            ],
          },
          {
            text: ' and tried to — as objectively as possible — figure out which roles have been impacted most. He found that product and design roles are more likely to be impacted than roles in engineering or data analytics:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 9,
    },
  },
  '11744f63-f9ac-44c3-bf2e-d68b4d661753': {
    id: '11744f63-f9ac-44c3-bf2e-d68b4d661753',
    type: 'HeadingOne',
    value: [
      {
        id: '5a19326d-a0f7-486e-932e-b7d3588d32aa',
        type: 'heading-one',
        children: [
          {
            text: 'Your daily dose of practical wisdom',
            bold: true,
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 10,
    },
  },
  'a11648d2-586e-4394-a072-64fcd1ce1916': {
    id: 'a11648d2-586e-4394-a072-64fcd1ce1916',
    type: 'Paragraph',
    value: [
      {
        id: '1258be9a-129f-4745-866d-0572ae5a7179',
        type: 'paragraph',
        children: [
          {
            text: 'Observe but ',
          },
          {
            id: '58e7cb0a-214f-4d9a-8c81-d58e9f1e7945',
            type: 'link',
            props: {
              url: 'https://medium.com/@lynwrites_/the-art-of-observing-and-not-absorbing-f1b1e8e0edea',
              target: '_blank',
              rel: 'noopener',
              title: 'don’t absorb',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'don’t absorb',
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
    meta: {
      align: 'left',
      depth: 0,
      order: 11,
    },
  },
  'd84074b9-e25c-48d2-87d8-61ebd46d27ca': {
    id: 'd84074b9-e25c-48d2-87d8-61ebd46d27ca',
    type: 'Paragraph',
    value: [
      {
        id: '0db5f432-bd07-4c15-be5e-6cbf8d3cf157',
        type: 'paragraph',
        children: [
          {
            text: 'Deepen your understanding every day with the Medium Newsletter.',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            id: '55ebf340-9074-4017-8235-2d4617bb47f6',
            type: 'link',
            props: {
              url: 'https://medium.com/blog/newsletters/medium-daily-edition',
              target: '_blank',
              rel: 'noopener',
              title: 'Sign up here',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                text: 'Sign up here',
              },
            ],
          },
          {
            text: '.',
            italic: true,
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 12,
    },
  },
  'cb6780cf-48a1-4f50-a1cd-b0b2317a54f9': {
    id: 'cb6780cf-48a1-4f50-a1cd-b0b2317a54f9',
    type: 'Paragraph',
    value: [
      {
        id: '3f5a0773-9e61-42e8-a81f-eb763d1d70d6',
        type: 'paragraph',
        children: [
          {
            text: 'Edited and produced by',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            id: '39942d80-fbaf-40ad-9fd2-2be86bf7375c',
            type: 'link',
            props: {
              url: 'https://medium.com/u/11ba4fd53be0?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Scott Lamb',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                text: 'Scott Lamb',
              },
            ],
          },
          {
            text: ' ',
            italic: true,
          },
          {
            text: '&',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            id: '3aa385c5-c76a-4c66-a5f0-d144cd6b843c',
            type: 'link',
            props: {
              url: 'https://medium.com/u/3c6a3fa3a112?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Carly Rose Gillis',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                text: 'Carly Rose Gillis',
              },
            ],
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 13,
    },
  },
  '946018af-a1e4-4505-9171-46fab9f6ae08': {
    id: '946018af-a1e4-4505-9171-46fab9f6ae08',
    type: 'Paragraph',
    value: [
      {
        id: '97d83905-90a3-4575-bbe0-80c8af4be9e4',
        type: 'paragraph',
        children: [
          {
            text: 'Questions, feedback, or story suggestions? Email us:',
            italic: true,
          },
          {
            text: ' ',
            italic: true,
          },
          {
            id: '1ee25004-0040-42ac-99c2-f222ae770f12',
            type: 'link',
            props: {
              url: 'mailto:tips@medium.com',
              target: '_blank',
              rel: 'noopener ugc nofollow',
              title: 'tips@medium.com',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                text: 'tips@medium.com',
              },
            ],
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 14,
    },
  },
  'b7ebbf45-931e-483f-81b3-091d0f8fe9a9': {
    id: 'b7ebbf45-931e-483f-81b3-091d0f8fe9a9',
    type: 'Paragraph',
    value: [
      {
        id: '196e510e-9720-42c0-a81f-ed03f8a304aa',
        type: 'paragraph',
        children: [
          {
            text: 'Read without limits or ads, fund great writers, and join a community that believes in human storytelling with',
            bold: true,
            italic: true,
          },
          {
            text: ' ',
            bold: true,
            italic: true,
          },
          {
            id: '63c266fe-71a3-4915-9609-b71116ff233e',
            type: 'link',
            props: {
              url: 'https://medium.com/membership',
              target: '_blank',
              rel: 'noopener',
              title: 'membership',
              nodeType: 'inline',
            },
            children: [
              {
                italic: true,
                bold: true,
                text: 'membership',
              },
            ],
          },
          {
            text: '.',
            bold: true,
            italic: true,
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 15,
    },
  },
} as YooptaContentValue;
