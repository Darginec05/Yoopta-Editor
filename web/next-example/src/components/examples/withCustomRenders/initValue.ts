export const WITH_CUSTOM_RENDERS_INIT_VALUE = {
  '8840f6ee-6bec-4a8c-868a-dc1ad79ad3f6': {
    id: '8840f6ee-6bec-4a8c-868a-dc1ad79ad3f6',
    value: [
      {
        id: '1384e6a5-4304-491c-ae4c-3e478aa54640',
        type: 'heading-one',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'With custom renders ',
          },
        ],
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  '198da104-1f25-4979-a998-516654aae652': {
    id: '198da104-1f25-4979-a998-516654aae652',
    value: [
      {
        id: 'b8eadaa3-79e9-49d5-a299-0de5bf633523',
        type: 'callout',
        props: {
          theme: 'info',
        },
        children: [
          {
            text: 'This example will show you how to add custom renders to plugins',
          },
        ],
      },
    ],
    type: 'Callout',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  'e678c3de-07b9-4890-b671-e6342fe7d459': {
    id: 'e678c3de-07b9-4890-b671-e6342fe7d459',
    value: [
      {
        id: '0e22b356-6e3a-45a9-aa2d-f72825b7bf45',
        type: 'heading-three',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Example with ',
          },
          {
            type: 'link',
            children: [
              {
                text: 'next/image',
              },
            ],
            props: {
              title: 'next/image',
              url: 'https://nextjs.org/docs/pages/api-reference/components/image',
              target: '_blank',
              rel: 'noreferrer',
              nodeType: 'inline',
            },
          },
          {
            text: ' ',
          },
        ],
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  'cf52d9ee-de0e-4c7a-9455-311f56c3fc04': {
    id: 'cf52d9ee-de0e-4c7a-9455-311f56c3fc04',
    value: [
      {
        id: '80d15f45-9ea0-487c-b71b-56a7f6a48969',
        type: 'callout',
        props: {
          theme: 'default',
        },
        children: [
          {
            text: 'By default, the ',
          },
          {
            text: '@yoopta/image',
            bold: true,
          },
          {
            text: ' plugin provides its own image rendering. \nBut what if you want to change the default rendering with powerful components like ',
          },
          {
            text: 'next/image',
            bold: true,
          },
          {
            text: ", which provide top-level optimization and rendering with different layout. So, it's easy-peasy. ",
          },
        ],
      },
    ],
    type: 'Callout',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'b30bd6f2-8672-471b-bfcd-3d63c9b598fd': {
    id: 'b30bd6f2-8672-471b-bfcd-3d63c9b598fd',
    value: [
      {
        id: 'a9ccfe02-bf2d-4083-81fc-e8348ba885fd',
        type: 'paragraph',
        children: [
          {
            text: '',
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
  '8e7c7983-938b-415b-835b-b03016e38910': {
    id: '8e7c7983-938b-415b-835b-b03016e38910',
    value: [
      {
        id: '162f040c-9afe-4b2c-ab44-00060414dba0',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
        children: [
          {
            text: "import Image from '@yoopta/image';\nimport NextImage from 'next/image';\nimport { PluginElementRenderProps } from '@yoopta/editor'\n\n// list of yoopta plugins\nconst plugins = [\n  // ...other plugins\n  Image.extend({\n    renders: {\n      image: (props: PluginElementRenderProps) => {\n        const { children, element, attributes } = props;\n        \n        return (\n          // [NOTE] passing attributes is required\n          <div {...attributes}>\n            <NextImage\n              src={element.props.src}\n              alt={element.props.alt}\n              width={element.props.sizes.width}\n              height={element.props.sizes.height}\n            />\n            {/* [NOTE] passing children is required */}\n            {children}\n          </div>\n        );\n      }\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 6,
      depth: 0,
    },
  },
  '7842cecc-8d39-46dd-ab8e-d908e60b263f': {
    id: '7842cecc-8d39-46dd-ab8e-d908e60b263f',
    value: [
      {
        id: '6c95c182-9e8e-4833-a983-1b90396df67b',
        type: 'paragraph',
        children: [
          {
            text: "Let's take it step by step 👇",
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
  'a3387678-a5df-400d-a8c0-b12e837c6160': {
    id: 'a3387678-a5df-400d-a8c0-b12e837c6160',
    value: [
      {
        id: 'fbf2e657-1cd9-4c39-8a1a-8c34a8971760',
        type: 'callout',
        props: {
          theme: 'info',
        },
        children: [
          {
            text: 'Please also note that you need to set up ',
          },
          {
            type: 'link',
            children: [
              {
                text: 'domains',
              },
            ],
            props: {
              title: 'domains',
              url: 'https://nextjs.org/docs/pages/building-your-application/optimizing/images#domains',
              target: '_blank',
              rel: 'noreferrer',
              nodeType: 'inline',
            },
          },
          {
            text: ' using next/image',
          },
        ],
      },
    ],
    type: 'Callout',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  '18372b34-45a6-4b88-b6ff-e0574ba6c3dc': {
    id: '18372b34-45a6-4b88-b6ff-e0574ba6c3dc',
    value: [
      {
        id: '46b2b576-e96f-4632-af78-2ae1adeabfad',
        type: 'paragraph',
        children: [
          {
            text: 'And yeap, image below is rendered by ',
          },
          {
            text: 'next/image',
            bold: true,
          },
          {
            text: ' component',
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
  'b2f7062c-7715-4c57-a721-9b30abc04c2a': {
    id: 'b2f7062c-7715-4c57-a721-9b30abc04c2a',
    value: [
      {
        id: '8a02cda6-fb73-4096-aabc-7e1f46a6f43b',
        type: 'image',
        props: {
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1720360714/e608ab26-d8fd-44b6-8859-b35abc4b5558_oifyp1_dfv72b.webp',
          alt: 'cloudinary',
          srcSet: null,
          fit: 'fill',
          sizes: {
            width: 542,
            height: 542,
          },
          nodeType: 'void',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
    type: 'Image',
    meta: {
      order: 10,
      depth: 0,
    },
  },
  '2b1de1e2-a109-4801-961e-7e7ff7a214c4': {
    id: '2b1de1e2-a109-4801-961e-7e7ff7a214c4',
    value: [
      {
        id: 'e3e0d95d-55e2-477b-bbc1-bedb0f1ec9ef',
        type: 'callout',
        props: {
          theme: 'warning',
        },
        children: [
          {
            text: 'NOTE! Passing ',
          },
          {
            text: 'attributes',
            bold: true,
          },
          {
            text: ' and ',
          },
          {
            text: 'children',
            bold: true,
          },
          {
            text: ' from the props are required',
          },
        ],
      },
    ],
    type: 'Callout',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '18e4f3ad-6dd0-4a32-862d-31a2c1ba4a2c': {
    id: '18e4f3ad-6dd0-4a32-862d-31a2c1ba4a2c',
    value: [
      {
        id: '0c066a0a-177a-4a67-bd5b-c8cc30eb5f7b',
        type: 'paragraph',
        children: [
          {
            text: '',
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
  'db39fa8c-2b31-4b1d-bbdb-66816c344be7': {
    id: 'db39fa8c-2b31-4b1d-bbdb-66816c344be7',
    value: [
      {
        id: '6381d433-480d-4502-adfd-a01b1a710c77',
        type: 'heading-three',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Example with ',
          },
          {
            type: 'link',
            children: [
              {
                text: 'next/link',
              },
            ],
            props: {
              url: 'https://nextjs.org/docs/pages/api-reference/components/link',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            text: '',
          },
        ],
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  '5d8ab781-4c74-4282-8715-bf0bdb6e5403': {
    id: '5d8ab781-4c74-4282-8715-bf0bdb6e5403',
    value: [
      {
        id: '3f6f672a-b053-4997-bd30-fd5b24012cd3',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
        children: [
          {
            text: "import Link from '@yoopta/link';\nimport NextLink from 'next/link';\nimport { PluginElementRenderProps } from '@yoopta/editor'\n\n// list of yoopta plugins\nconst plugins = [\n  // ...other plugins\n  Link.extend({\n    renders: {\n      link: ({ attributes, children, element }) => {\n        // [NOTE] passing attributes is required\n        return (\n          <NextLink\n            {...attributes}\n            data-key={element.id}\n            className=\"text-blue-500 hover:underline\"\n            href={element.props.url}\n            target={element.props.target}\n            rel={element.props.rel}\n          >\n            {/* [NOTE] passing children is required */}\n            {children}\n          </NextLink>\n        );\n      },\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 13,
      depth: 0,
    },
  },
  'e982bc6b-d140-4376-a047-6655316c2ceb': {
    id: 'e982bc6b-d140-4376-a047-6655316c2ceb',
    value: [
      {
        id: '83e556fa-06b1-43ac-b9a5-e47ddb8ed9b7',
        type: 'paragraph',
        children: [
          {
            text: '',
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
  '7c708171-938e-4d94-8325-b918936b9fe8': {
    id: '7c708171-938e-4d94-8325-b918936b9fe8',
    value: [
      {
        id: '15bdc8a0-27a7-4df4-a90e-38a89592a76d',
        type: 'heading-three',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Example with ',
          },
          {
            type: 'link',
            children: [
              {
                text: '@mui/material',
              },
            ],
            props: {
              url: 'https://mui.com/material-ui/getting-started/',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            text: '',
          },
        ],
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 15,
      depth: 0,
    },
  },
  '8b8ff20a-634c-4b0c-9887-2021dacf8497': {
    id: '8b8ff20a-634c-4b0c-9887-2021dacf8497',
    value: [
      {
        id: 'ba5357f2-3ee6-407e-b49d-7fb191b220a9',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
        children: [
          {
            text: "import Link from '@yoopta/link';\nimport Typography from '@mui/material/Typography';\nimport { PluginElementRenderProps } from '@yoopta/editor'\n\n// list of yoopta plugins\nconst plugins = [\n  // ...other plugins\n  HeadingTwo.extend({\n    renders: {\n      'heading-two': ({ attributes, children }) => {\n        return (\n          // [NOTE] passing attributes is required\n          <Typography variant=\"h2\" {...attributes}>\n            {/* [NOTE] passing children is required */}\n            {children}\n          </Typography>\n        );\n      },\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 16,
      depth: 0,
    },
  },
  'e1de7ba6-42c6-449e-85dc-d9be79be327d': {
    id: 'e1de7ba6-42c6-449e-85dc-d9be79be327d',
    value: [
      {
        id: 'c4bae2f3-8f72-4f0c-bc76-bfc14b8286bc',
        type: 'heading-two',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: "Oh, I'm heading 2 rendered by Material MUI",
          },
        ],
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 17,
      depth: 0,
    },
  },
};
