export const WITH_CUSTOM_ELEMENTS_PROPS_INIT_VALUE = {
  '39848dfd-ffae-4429-abaf-a4aa26505cfc': {
    id: '39848dfd-ffae-4429-abaf-a4aa26505cfc',
    value: [
      {
        id: '435dbed9-a925-4d76-bdbb-627c5d3a3570',
        type: 'heading-one',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'With custom element props',
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
  '2957cad9-ad2e-4b2d-886b-62b0cbe0cb01': {
    id: '2957cad9-ad2e-4b2d-886b-62b0cbe0cb01',
    value: [
      {
        id: '457aca1e-2bfc-4be0-929c-4d4a03b10e65',
        type: 'callout',
        props: {
          theme: 'info',
        },
        children: [
          {
            text: 'This example will show how to rewrite default element props',
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
  '896d35ef-3c9f-47e4-8840-29fb0a1e7da1': {
    id: '896d35ef-3c9f-47e4-8840-29fb0a1e7da1',
    value: [
      {
        id: '6f7ef798-a977-4ac2-9618-6660050282d4',
        type: 'paragraph',
        children: [
          {
            text: 'Every plugin/block has one or several elements. And every element can include some props. ',
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
  '4bde418e-2d32-4ef8-af83-d3fc6127c261': {
    id: '4bde418e-2d32-4ef8-af83-d3fc6127c261',
    value: [
      {
        id: 'edccccc3-f6c8-4d3d-8adb-f235fa209b4a',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: "// For example Image plugin has one element => \"image\"\nconst Image = new YooptaPlugin({\n  type: 'Image',\n  elements: {\n    image: {\n      render: ImageRender,\n      props: {\n        src: null,\n        alt: null,\n        srcSet: null,\n        bgColor: null,\n        fit: 'contain',\n        sizes: { width: 650, height: 500 },\n        nodeType: 'void',\n      },\n    },\n  },\n}",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  '614bd7be-f939-40e7-9e1d-2dc5165ee041': {
    id: '614bd7be-f939-40e7-9e1d-2dc5165ee041',
    value: [
      {
        id: '92c8c967-d800-4f2c-8653-4d6037440b04',
        type: 'paragraph',
        children: [
          {
            text: 'As you can see this ',
          },
          {
            text: 'image',
            bold: true,
            underline: true,
          },
          {
            text: ' element has some default props',
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
  '684ee42c-0050-4920-bf68-1b90a3d7b74f': {
    id: '684ee42c-0050-4920-bf68-1b90a3d7b74f',
    value: [
      {
        id: 'ed95e253-beff-49c0-ae61-17fc40ab7c03',
        type: 'paragraph',
        children: [
          {
            text: 'And let\'s imagine that we want to override the property for the "',
          },
          {
            text: 'fit',
            bold: true,
          },
          {
            text: '" field.',
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
  'aa3d0834-ef15-4710-beaa-6064d103e9f4': {
    id: 'aa3d0834-ef15-4710-beaa-6064d103e9f4',
    value: [
      {
        id: '15c89d84-e3b3-49ad-be85-63f68d0b715b',
        type: 'paragraph',
        children: [
          {
            text: "And here's how we can do it: ",
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
  'ced1f80f-8d0c-44d7-a1cc-ada870fa788c': {
    id: 'ced1f80f-8d0c-44d7-a1cc-ada870fa788c',
    value: [
      {
        id: '4dcbecde-4184-46d4-8e11-de93113144f3',
        type: 'paragraph',
        children: [
          {
            text: 'So, every next ',
          },
          {
            text: 'image',
            bold: true,
            underline: true,
          },
          {
            text: ' will be created with ',
          },
          {
            text: "fit: 'cover'",
            code: true,
            bold: true,
          },
          {
            bold: true,
            text: '  ',
          },
          {
            text: 'prop',
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
  '2650f143-f6ac-474e-bdf3-7022302f57a5': {
    id: '2650f143-f6ac-474e-bdf3-7022302f57a5',
    value: [
      {
        id: 'f00f2900-bac0-430b-a727-f4e8137fe879',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: "import Image, { ImageElementProps } from '@yoopta/image'\n\nconst plugins = [\n  // other plugins\n  Image.extend({\n    elementProps: {\n      image: (props: ImageElementProps) => ({\n        ...props,\n        fit: 'cover',\n      }),\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  'b0197cf6-781f-4e43-97f2-83fab2fbb712': {
    id: 'b0197cf6-781f-4e43-97f2-83fab2fbb712',
    value: [
      {
        id: '84923b77-2060-4ee4-a6e3-d559b891da5a',
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
      order: 10,
      depth: 0,
    },
  },
  '95456adc-de75-44c4-852c-409af3e4044e': {
    id: '95456adc-de75-44c4-852c-409af3e4044e',
    type: 'HeadingThree',
    meta: {
      order: 3,
      depth: 0,
    },
    value: [
      {
        id: '6f7ef798-a977-4ac2-9618-6660050282d4',
        type: 'heading-three',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Example with Image plugin:',
          },
        ],
      },
    ],
  },
  '806c1914-1462-488a-8174-8eafd38f705c': {
    id: '806c1914-1462-488a-8174-8eafd38f705c',
    type: 'HeadingThree',
    meta: {
      order: 11,
      depth: 0,
    },
    value: [
      {
        id: '0ce06ec0-b83d-4cd3-8cc2-3c15d67eace0',
        type: 'heading-three',
        children: [
          {
            text: 'Example with Link plugin:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '522c9763-b3ec-4e18-988a-ac2b77c58b37': {
    id: '522c9763-b3ec-4e18-988a-ac2b77c58b37',
    value: [
      {
        id: 'a3b96001-d40b-444f-a728-1fac7da36e21',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: "import Link, { LinkElementProps } from '@yoopta/link'\n\nconst plugins = [\n  // other plugins\n  Link.extend({\n    elementProps: {\n      link: (props: LinkElementProps) => ({\n        ...props,\n        target: '_blank',\n      }),\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  '87ec3b69-bcf5-4006-b2a0-07ff2cca2ef2': {
    id: '87ec3b69-bcf5-4006-b2a0-07ff2cca2ef2',
    value: [
      {
        id: '4e67ce3a-5b7b-4063-a141-9b148e884295',
        type: 'paragraph',
        children: [
          {
            text: 'Every next ',
          },
          {
            text: 'link',
            bold: true,
            underline: true,
          },
          {
            text: ' will be opened in new tab',
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
  '0317b5a2-3de0-45ae-a54e-fdda3f64f296': {
    id: '0317b5a2-3de0-45ae-a54e-fdda3f64f296',
    type: 'HeadingThree',
    meta: {
      order: 15,
      depth: 0,
    },
    value: [
      {
        id: '0ce06ec0-b83d-4cd3-8cc2-3c15d67eace0',
        type: 'heading-three',
        children: [
          {
            text: 'Example with Code plugin:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '4eea207b-696c-446a-be29-2b75dfa21e55': {
    id: '4eea207b-696c-446a-be29-2b75dfa21e55',
    value: [
      {
        id: '6b7cb844-2a91-41ed-86a9-8266fd185d17',
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
  '938b13f0-c053-4df1-80b1-405564babb27': {
    id: '938b13f0-c053-4df1-80b1-405564babb27',
    value: [
      {
        id: 'f2327a6d-60fe-4809-a077-99ce0c5b5ad9',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: 'import Code, { CodeElementProps } from \'@yoopta/code\'\n\nconst plugins = [\n  // other plugins\n  Code.extend({\n    elementProps: {\n      code: (props: CodeElementProps) => ({\n        ...props,\n        // "javascript" | "css" | "php" | "python" | "markdown" | "vue" | "json" | "sql" | "angular" | "rust" | "xml" | "yaml" | "java" | "html" | "cpp"\n        language: \'javascript\',\n        // "BasicLight" | "BasicDark" | "GithubDark" | "Sublime" | "Okaidia" | "Monokai" | "MaterialDark" | "MaterialLight" | "GithubDark" | "GithubLight" | "Dracula" | "Copilot"\n        theme: \'GithubDark\',\n      }),\n    },\n  })\n]',
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
};
