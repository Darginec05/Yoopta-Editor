import YooptaEditor, { createYooptaEditor, Tools, YooEditor } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image from '@yoopta/image';
import { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';
import Callout from '@yoopta/callout';
import Lists from '@yoopta/lists';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
// import Table from '@yoopta/table';
import Embed from '@yoopta/embed';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

import Code from '@yoopta/code';
// import Mention from '@yoopta/mention';

const plugins = [
  Code,
  // Mention,
  Paragraph,
  Image.extend({
    // renders: {
    //   image: ({ attributes, children, element, blockId }) => {
    //     return (
    //       <div>
    //         <img
    //           draggable={false}
    //           data-element-type={element.type}
    //           className="yoo-h-mt-6 yoo-h-scroll-m-20"
    //           {...attributes}
    //         />
    //         {children}
    //       </div>
    //     );
    //   },
    // },
    options: {
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file);

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Headings.HeadingOne.extend({
    renders: {
      'heading-one': ({ attributes, children, element, blockId }) => {
        return (
          <h1
            id={element.id}
            draggable={false}
            data-element-type={element.type}
            className="yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-5xl"
            {...attributes}
          >
            {children}
          </h1>
        );

        // return defaultRenderer({ attributes, children, element, blockId });
      },
    },
  }),
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList,
  Lists.NumberedList,
  Lists.TodoList,
  // Table,
  Embed,
  Video.extend({
    options: {
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Link,
];

const MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];

const TOOLS: Tools = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const value = {
  IzTviZdDzHGBl2Z77o9UN: {
    id: 'IzTviZdDzHGBl2Z77o9UN',
    value: [
      {
        id: '8BCMvxMBLVjs_5Mxb5Y51',
        type: 'paragraph',
        children: [
          {
            text: 'Next.js offers far more than standard server-side rendering capabilities. Software engineers can ',
          },
          {
            type: 'link',
            children: [
              {
                text: 'configure their web apps in many ways to optimize',
              },
            ],
            props: {
              target: '_blank',
              rel: 'noreferrer',
              nodeType: 'inline',
              url: 'https://www.notion.so/Features-ea1f66006b3949b997024818fde05f3d',
              title: 'configure their web apps in many ways to optimize',
            },
          },
          {
            text: ' Next.js performance. In fact, Next.js developers routinely employ different caching strategies, varied pre-rendering techniques, and dynamic components to optimize and customize Next.js rendering to meet specific requirements.',
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
  w3uTOa9PH89TG7xKlypi6: {
    id: 'w3uTOa9PH89TG7xKlypi6',
    value: [
      {
        id: 'f05KwYCeCD-twkyS_aDFE',
        type: 'paragraph',
        children: [
          {
            text: 'When your goal is developing a multipage scalable web app with tens of thousands of pages, it is all the more important to maintain a good balance between Next.js page load speed and optimal server load. Choosing the right rendering techniques is crucial in building a performant web app that won’t waste hardware resources and generate additional costs.',
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
  CTu9i4C29WUbZi2Oq2kc1: {
    id: 'CTu9i4C29WUbZi2Oq2kc1',
    value: [
      {
        id: '1QoxvXQv5CGE2tsCtfZqs',
        type: 'heading-two',
        children: [
          {
            text: 'Next.js Pre-rendering Techniques',
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
  BeJTeEx9w1kzbwP3fob2Q: {
    id: 'BeJTeEx9w1kzbwP3fob2Q',
    value: [
      {
        id: 'QdfLICb3qxQr78CXwbdjA',
        type: 'paragraph',
        children: [
          {
            text: 'Next.js pre-renders every page by default, but performance and efficiency can be further improved using different Next.js',
          },
          {
            text: ' ',
          },
          {
            text: 'rendering types',
          },
          {
            text: ' ',
          },
          {
            text: 'and approaches to',
          },
          {
            text: ' ',
          },
          {
            text: 'pre-rendering and rendering',
          },
          {
            text: '. In addition to traditional',
          },
          {
            text: ' ',
          },
          {
            text: 'client-side rendering',
          },
          {
            text: ' ',
          },
          {
            text: '(CSR), Next.js offers developers a choice between two basic forms of pre-rendering:',
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
  ml9aQfH7NbolPZ_G9wWm3: {
    id: 'ml9aQfH7NbolPZ_G9wWm3',
    value: [
      {
        id: 'xJ3D_71xmY1APZyMnnp6b',
        type: 'bulleted-list',
        children: [
          {
            text: 'Server-side rendering (SSR) deals with rendering webpages at runtime when the request is called. This technique increases server load but is essential if the page has dynamic content and needs social visibility.',
          },
          {
            text: 'Static site generation (SSG) mainly deals with rendering webpages at build time. Next.js offers additional options for static generation with or without data, as well as automatic static optimization, which determines whether or not a page can be pre-rendered.',
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
  EVs_mevw9Mb5t56xvstbx: {
    id: 'EVs_mevw9Mb5t56xvstbx',
    value: [
      {
        id: '5ZnBQaErwpmuqX9GwT1BJ',
        type: 'paragraph',
        children: [
          {
            text: 'Pre-rendering is useful for pages that need social attention (Open Graph protocol) and good SEO (meta tags) but contain dynamic content based on the route endpoint. For example, an X (formerly Twitter) user page with a',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: '/@twitter_name',
          },
          {
            text: ' ',
          },
          {
            text: 'endpoint has page-specific metadata. Hence, pre-rendering all pages in this route is a good option.',
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
  U2agxRHMtTpWKlJJk1Zyf: {
    id: 'U2agxRHMtTpWKlJJk1Zyf',
    value: [
      {
        id: 'sHlRF0q9FxJI62ot9P5w4',
        type: 'paragraph',
        children: [
          {
            text: 'Metadata is not the only reason to choose SSR over CSR—rendering the HTML on the server can also lead to significant improvements in',
          },
          {
            text: ' ',
          },
          {
            text: 'first input delay',
          },
          {
            text: ' ',
          },
          {
            text: '(FID), the Core Web Vitals metric that measures the time from a user’s first interaction to the time when the browser is actually able to process a response. When rendering heavy (data-intensive) components on the client side, FID becomes more noticeable to users, especially those with slower internet connections.',
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
  Xm4n02YLqCdPIpBEtipun: {
    id: 'Xm4n02YLqCdPIpBEtipun',
    value: [
      {
        id: 'tQfiyIEAwkG3cXfpX-pqq',
        type: 'paragraph',
        children: [
          {
            text: 'If Next.js performance optimization is the top priority, one must not overpopulate the DOM tree on the server side, which inflates the HTML document. If the content belongs to a list at the bottom of the page and is not immediately visible in the first load, client-side rendering is a better option for that particular component.',
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
  t6p0wKFWRPwFYRaFQbSH2: {
    id: 't6p0wKFWRPwFYRaFQbSH2',
    value: [
      {
        id: 'fmtiAaQUylgoAzvMOzexl',
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
      order: 8,
      depth: 0,
    },
  },
  jMqJoeNZKnWHe80dVlwwy: {
    id: 'jMqJoeNZKnWHe80dVlwwy',
    value: [
      {
        id: 'AWhp8cFCZH5GgDUsdxB0z',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FNext-js-Improving-Page-Speed-of-a-Server-Side-React-App_Internal10__1_-d833dc1eeee3e54203059db582d7c2ba.png',
          alt: 'A pre-rendering sample table with page type, metadata, and content for examples, including Amazon, Facebook, Toptal, and YouTube.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
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
  '8o1PBhDv8_LfkQFT7Romy': {
    id: '8o1PBhDv8_LfkQFT7Romy',
    value: [
      {
        id: 'QqWrAknrqs79jMVO_6otN',
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
  cC7qM3DOpKTbvtmqiVfJ4: {
    id: 'cC7qM3DOpKTbvtmqiVfJ4',
    value: [
      {
        id: 'UmaXFNongdP52UMkr0p_N',
        type: 'paragraph',
        children: [
          {
            text: 'Pre-rendering can be further divided into multiple optimal methods by determining factors such as',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'variability, bulk size, and frequency of updates and requests',
          },
          {
            text: '. We must pick the appropriate strategies while keeping in mind the server load; we don’t want to adversely affect the user experience or incur unnecessary hosting costs.',
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
  X7J6gTwf4Rv7vEyfFgIie: {
    id: 'X7J6gTwf4Rv7vEyfFgIie',
    value: [
      {
        id: '9cBKr2FQBKyRzjZiqewN4',
        type: 'heading-three',
        children: [
          {
            text: 'Determining the Factors for Next.js Performance Optimization',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  moKWUNSav9w09d4bUz3ga: {
    id: 'moKWUNSav9w09d4bUz3ga',
    value: [
      {
        id: 'qVtyqh95xTElh8thzBPxT',
        type: 'paragraph',
        children: [
          {
            text: 'Just as traditional server-side rendering imposes a high load on the server at runtime, pure static generation will place a high load at build time. We must make careful decisions to configure the rendering technique depending on the nature of the webpage and route.',
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
  '5M_lwFxQPNfPx3RhmGENK': {
    id: '5M_lwFxQPNfPx3RhmGENK',
    value: [
      {
        id: 'n_vE0j2QwM3R1u82HcH8e',
        type: 'paragraph',
        children: [
          {
            text: 'When dealing with Next.js optimization, the options provided are abundant and we have to determine the following criteria for each route endpoint:',
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
  'D9yLq9Jfc6Ds-WfDlmrO3': {
    id: 'D9yLq9Jfc6Ds-WfDlmrO3',
    value: [
      {
        id: '1HvBHoOArPchI48WSOwwh',
        type: 'bulleted-list',
        children: [
          {
            bold: true,
            text: 'Variability:',
          },
          {
            text: ' ',
          },
          {
            text: 'The content of the webpage, either',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'time dependent',
          },
          {
            text: ' ',
          },
          {
            text: '(changes every minute),',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'action dependent',
          },
          {
            text: ' ',
          },
          {
            text: '(changes when a user creates/updates a document), or',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'stale',
          },
          {
            text: ' ',
          },
          {
            text: '(doesn’t change until a new build).',
          },
          {
            bold: true,
            text: 'Bulk size: ',
          },
          {
            text: 'The estimate of the maximum number of pages in that route endpoint (e.g., 30 genres in a streaming app).',
          },
          {
            bold: true,
            text: 'Frequency of updates:',
          },
          {
            text: ' ',
          },
          {
            text: 'The estimated rate of content updates (e.g., 10 updates per month), whether time dependent or action dependent.',
          },
          {
            bold: true,
            text: 'Frequency of requests: ',
          },
          {
            text: 'The estimated rate of user/client requests to a webpage (e.g., 100 requests per day, 10 requests per second).',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 15,
      depth: 0,
    },
  },
  kRD6iiji9YJWsFmOWLItO: {
    id: 'kRD6iiji9YJWsFmOWLItO',
    value: [
      {
        id: 'UVi7kn90ry_GINwHBL2nF',
        type: 'heading-three',
        children: [
          {
            text: 'Low Bulk Size and Time-dependent Variability',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 16,
      depth: 0,
    },
  },
  HIlybeuwu4LaQN_iuWVFs: {
    id: 'HIlybeuwu4LaQN_iuWVFs',
    value: [
      {
        id: 'TbmeuW3e40x_Y5L3kTque',
        type: 'paragraph',
        children: [
          {
            text: 'Incremental static regeneration (ISR) revalidates the webpage at a specified interval. This is the best option for standard build pages in a website, where the data is expected to be refreshed at a certain interval. For example, there is a',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'genres/genre_id',
          },
          {
            text: ' ',
          },
          {
            text: 'route point in an over-the-top media app like Netflix, and each genre page needs to be regenerated with fresh content on a daily basis. As the bulk size of genres is small (about 200), it is a better option to choose ISR, which revalidates the page given the condition that the pre-built/cached page is more than one day old.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 17,
      depth: 0,
    },
  },
  jfYfKophK91pGQteH7tSd: {
    id: 'jfYfKophK91pGQteH7tSd',
    value: [
      {
        id: 'I7I_OZL5IGdMAE18K6Cn6',
        type: 'paragraph',
        children: [
          {
            text: 'Here is an example of an ISR implementation:',
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
  'm-Fx589ij5xTir3R2MgxB': {
    id: 'm-Fx589ij5xTir3R2MgxB',
    value: [
      {
        children: [
          {
            text: 'export async function getStaticProps() {\n  const posts = await fetch(url-endpoint).then((data)=>data.json());\n  \n  /* revalidate at most every 10 secs */\n  return { props: { posts }, revalidate: 10, }\n}\n\nexport async function getStaticPaths() {\n\n  const posts = await fetch(url-endpoint).then((data)=>data.json());\n  const paths = posts.map((post) => (\nparams: { id: post.id },\n  }));\n\n  return { paths, fallback: false }\n}\n',
          },
        ],
        type: 'code',
        id: 'EnQhasxqUi4164zkuWMHc',
        props: {
          language: 'JavaScript',
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
  dhaO_sMTAOLKDdDSOmnve: {
    id: 'dhaO_sMTAOLKDdDSOmnve',
    value: [
      {
        id: 'yQpFvG9maxwu2Rw6Ca9qV',
        type: 'paragraph',
        children: [
          {
            text: 'In this example, Next.js will revalidate all these pages every 10 seconds at most. The key here is',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'at most',
          },
          {
            text: ', as the page does not regenerate every 10 seconds, but only when the request comes in. Here’s a step-by-step walkthrough of how it works:',
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
  '-23hQacNjJmUnQRs-SwpG': {
    id: '-23hQacNjJmUnQRs-SwpG',
    value: [
      {
        id: 'Mi-O2H5ZkGoYsEZ_e3xZ-',
        type: 'bulleted-list',
        children: [
          {
            text: 'A user requests an ISR page route.',
          },
          {
            text: 'Next.js sends the cached (stale) page.',
          },
          {
            text: 'Next.js tries to check if the stale page has aged more than 10 seconds.',
          },
          {
            text: 'If so, Next.js regenerates the new page.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 21,
      depth: 0,
    },
  },
  RGrn_a0uOM5WwgcmOdpSV: {
    id: 'RGrn_a0uOM5WwgcmOdpSV',
    value: [
      {
        id: '4DUNi0-4_0lYwRAk3fvcr',
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
      order: 22,
      depth: 0,
    },
  },
  sfODlSExOxo98p4cQm5eI: {
    id: 'sfODlSExOxo98p4cQm5eI',
    value: [
      {
        id: 'hKmIyEUY7geVqsvzT6I8U',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FUntitled-14f1606ebf7ce54d43b21452decf4a99.png',
          alt: 'An ISR sample table, organized by page type, bulk size, and variability, with examples including YouTube, IMDB, and eBay.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 23,
      depth: 0,
    },
  },
  'pzIg-PMPyRR70KTNMUqNI': {
    id: 'pzIg-PMPyRR70KTNMUqNI',
    value: [
      {
        id: '9t0CgLpVeiYA7QR9K8HZv',
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
      order: 24,
      depth: 0,
    },
  },
  gISMqsnTfH1a0qUV1A7ge: {
    id: 'gISMqsnTfH1a0qUV1A7ge',
    value: [
      {
        id: 'RIETN0Bmb3mmPpwwt7kn3',
        type: 'heading-three',
        children: [
          {
            text: 'High Bulk Size and Time-dependent Variability',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 25,
      depth: 0,
    },
  },
  n_zK1DXu1iJSS4NH1zfWx: {
    id: 'n_zK1DXu1iJSS4NH1zfWx',
    value: [
      {
        id: 'Pt7niseb1VQIEzlUM2BO0',
        type: 'paragraph',
        children: [
          {
            text: 'Most server-side applications fall into this category. We term them public pages as these routes can be cached for a period of time because their content is not user dependent, and the data does not need to be up to date at all times. In these cases, the bulk size is usually too high (~2 million), and generating millions of pages at build time is not a viable solution.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 26,
      depth: 0,
    },
  },
  v49LRBAMxXX5JtBbGr2_1: {
    id: 'v49LRBAMxXX5JtBbGr2_1',
    value: [
      {
        id: 'B0QGFKpx8XPHCOAKZweFd',
        type: 'paragraph',
        children: [
          {
            bold: true,
            text: 'SSR and Caching:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 27,
      depth: 0,
    },
  },
  'Z_-pD4F92vkCC6-XuDrX_': {
    id: 'Z_-pD4F92vkCC6-XuDrX_',
    value: [
      {
        id: '_0Dm_BL47fZj50P3kTPub',
        type: 'paragraph',
        children: [
          {
            text: 'The better option is always to do server-side rendering, i.e., to generate the webpage at runtime',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'when requested',
          },
          {
            text: ' ',
          },
          {
            text: 'on the server and',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'cache the page',
          },
          {
            text: ' ',
          },
          {
            text: 'for an entire day, hour, or minute, so that any later request will get a cached page. This ensures the app does not need to build millions of pages at build time, nor repetitively build the same page at runtime.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 28,
      depth: 0,
    },
  },
  'c8e-0DQSEfMotp5-Ehtj9': {
    id: 'c8e-0DQSEfMotp5-Ehtj9',
    value: [
      {
        id: '7f6WvMKtHM0k2QtjybW1L',
        type: 'paragraph',
        children: [
          {
            text: 'Let’s see a basic example of an SSR and caching implementation:',
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
  aBA8Jlo9Is4LrVM2QSitj: {
    id: 'aBA8Jlo9Is4LrVM2QSitj',
    value: [
      {
        children: [
          {
            text: "export async function getServerSideProps({ req, res }) {\n  /* setting a cache of 10 secs */\n  res.setHeader( 'Cache-Control','public, s-maxage=10')\n  const data = fetch(url-endpoint).then((res) => res.json());\n  return {\n    props: { data },\n  }\n}\n",
          },
        ],
        type: 'code',
        id: 'IzSlpC4PhApgcDwYEeFgj',
        props: {
          language: 'JavaScript',
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
  pInsBzZg739NN_fZM7Qbi: {
    id: 'pInsBzZg739NN_fZM7Qbi',
    value: [
      {
        id: 'dfKX8IQi6T6bDG5qt38fq',
        type: 'paragraph',
        children: [
          {
            text: 'You may examine the',
          },
          {
            text: ' ',
          },
          {
            text: 'Next.js caching documentation',
          },
          {
            text: ' ',
          },
          {
            text: 'if you would like to learn more about cache headers.',
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
  'Nkurc8S-HaMOzF4yAIBj5': {
    id: 'Nkurc8S-HaMOzF4yAIBj5',
    value: [
      {
        id: 'i1CRzHxYQ_WnrqdrIZtL3',
        type: 'paragraph',
        children: [
          {
            bold: true,
            text: 'ISR and Fallback:',
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
  '7mBLGcQmr6LI-Wqb-sp3w': {
    id: '7mBLGcQmr6LI-Wqb-sp3w',
    value: [
      {
        id: 's89MS0gkXg4cDrLGDIaPR',
        type: 'paragraph',
        children: [
          {
            text: 'Though generating millions of pages at build time is not an ideal solution, sometimes we do need them generated in the build folder for further configuration or',
          },
          {
            text: ' ',
          },
          {
            text: 'custom rollbacks',
          },
          {
            text: '. In this case, we can optionally bypass page generation at the build step, rendering on-demand only for the very first request or any succeeding request that crosses the stale age (revalidate interval) of the generated webpage.',
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
  'X0g1lI-jOqQ44MYjg6UvW': {
    id: 'X0g1lI-jOqQ44MYjg6UvW',
    value: [
      {
        id: 'wItH4moCGKWsd2_g2a9Ks',
        type: 'paragraph',
        children: [
          {
            text: 'We start by adding',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: "{fallback: 'blocking'}",
          },
          {
            text: ' ',
          },
          {
            text: 'to the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'getStaticPaths',
          },
          {
            text: ', and when the build starts, we switch off the API (or prevent access to it) so that it will not generate any path routes. This effectively bypasses the phase of needlessly building millions of pages at build time, instead generating them on demand at runtime and keeping results in a build folder (',
          },
          {
            code: true,
            text: '_next/static',
          },
          {
            text: ') for succeeding requests and builds.',
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
  uRRYvlYxVKrYFBiVTc0rh: {
    id: 'uRRYvlYxVKrYFBiVTc0rh',
    value: [
      {
        id: 'ovgNA1mYt8ikM92P-wZ7m',
        type: 'paragraph',
        children: [
          {
            text: 'Here is an example of restricting static generations at the build phase:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 35,
      depth: 0,
    },
  },
  kge7KROIWDvPBgq5VVUpg: {
    id: 'kge7KROIWDvPBgq5VVUpg',
    value: [
      {
        children: [
          {
            text: "export async function getStaticPaths() {\n  // fallback: 'blocking' will try to server-render \n  // all pages on demand if the page doesn’t exist already.\n  if (process.env.SKIP_BUILD_STATIC_GENERATION) {\n\treturn {paths: [], fallback: 'blocking'};\n  }\n}\n",
          },
        ],
        type: 'code',
        id: 'pNR96iGyss8yqUFxVaPdu',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 36,
      depth: 0,
    },
  },
  '8p2h0pQhkqk5RVTp9ZTeS': {
    id: '8p2h0pQhkqk5RVTp9ZTeS',
    value: [
      {
        id: 'ca7rDShwaoMBaeV9eA5is',
        type: 'paragraph',
        children: [
          {
            text: 'Now we want the generated page to go into the cache for a period of time and revalidate later on when it crosses the cache period. We can use the same approach as in our ISR example:',
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
  CXZOhUYZCEONohQdnN8xP: {
    id: 'CXZOhUYZCEONohQdnN8xP',
    value: [
      {
        children: [
          {
            text: 'export async function getStaticProps() {\n  const posts = await fetch(<url-endpoint>).then((data)=>data.json());\n\n  // Revalidates every 10 secs.\n  return { props: { posts }, revalidate: 10, }\n}\n',
          },
        ],
        type: 'code',
        id: '6fIPfhMSpiBMEQ3d5Os4o',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 38,
      depth: 0,
    },
  },
  Mya7SwjYu7nMbVpLDi2fs: {
    id: 'Mya7SwjYu7nMbVpLDi2fs',
    value: [
      {
        id: 'iaDcejMMiromk14wCorWR',
        type: 'paragraph',
        children: [
          {
            text: 'If there’s a new request after 10 seconds, the page will be revalidated (or invalidated if the page is not built already), effectively working the same way as SSR and caching, but generating the webpage in a build output folder (',
          },
          {
            code: true,
            text: '/_next/static',
          },
          {
            text: ').',
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
  xUDsm2LxDyLLGVo1NXGxs: {
    id: 'xUDsm2LxDyLLGVo1NXGxs',
    value: [
      {
        id: '8S584XnIPaoCDIEzZQM9u',
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
      order: 40,
      depth: 0,
    },
  },
  HU8lnCFhixHCahI2JorIl: {
    id: 'HU8lnCFhixHCahI2JorIl',
    value: [
      {
        id: 'biYOlcgJNSQ41kp4vC0wH',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FUntitled-f870a34d2c19c011f3cfcf53b017a309.png',
          alt: 'Sample cases of SSR plus caching and ISR plus fallback by page type, bulk size, and variability, including IMDB, YouTube, and Toptal.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 41,
      depth: 0,
    },
  },
  '70KFAG9YOZlhcJhf6Nyba': {
    id: '70KFAG9YOZlhcJhf6Nyba',
    value: [
      {
        id: 'nq1rWwp-ELn4R327KDDUm',
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
      order: 42,
      depth: 0,
    },
  },
  _Din99wYRly45ZgZ84ole: {
    id: '_Din99wYRly45ZgZ84ole',
    value: [
      {
        id: 'V_YGJLaMwucxu6_mXJ2lF',
        type: 'paragraph',
        children: [
          {
            text: 'In most cases, SSR with caching is the better option. The downside of ISR and fallback is that the page may initially show stale data. A page won’t be regenerated until a user visits it (to trigger the revalidation), and then the same user (or another user) visits the same page to see the most up-to-date version of it. This does have the unavoidable consequence of User A seeing stale data while User B sees accurate data. For some apps, this is insignificant, but for others, it’s unacceptable.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 43,
      depth: 0,
    },
  },
  QvQCnW2ft6OdBu1Tmm53l: {
    id: 'QvQCnW2ft6OdBu1Tmm53l',
    value: [
      {
        id: 'mt0oTArAEo5IUaQm6IOJO',
        type: 'heading-three',
        children: [
          {
            text: 'Content-dependent Variability',
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
  cBSdShwxAo6rdrrh3jYYZ: {
    id: 'cBSdShwxAo6rdrrh3jYYZ',
    value: [
      {
        id: 'yN2AviHdvm2GZQ-tiVhn3',
        type: 'paragraph',
        children: [
          {
            text: 'On-demand revalidation (ODR) revalidates the webpage at runtime via a webhook. This is quite useful for Next.js speed optimization in cases in which the page needs to be more truthful to content, e.g., if we are building a blog with a headless CMS that provides webhooks for when the content is created or updated. We can call the respective API endpoint to revalidate a webpage. The same is true for REST APIs in the back end—when we update or create a document, we can call a request to revalidate the webpage.',
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
  zRmMWTnKZpA6SO4fvUXOm: {
    id: 'zRmMWTnKZpA6SO4fvUXOm',
    value: [
      {
        id: 'regJawlTnMEtkaGENMRRq',
        type: 'paragraph',
        children: [
          {
            text: 'Let’s see an example of ODR in action:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 46,
      depth: 0,
    },
  },
  '3q3XOlPTC0Z75qzArKkkN': {
    id: '3q3XOlPTC0Z75qzArKkkN',
    value: [
      {
        children: [
          {
            text: "// Calling this URL will revalidate an article.\n// https://<your-site.com>/api/revalidate?revalidate_path=<article_id>&secret=<token>\n\n// pages/api/revalidate.js\n\nexport default async function handler(req, res) {\n  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {\n    return res.status(401).json({ message: 'Invalid token' })\n  }\n\n  try {\n    await res.revalidate('https://<your-site.com>/'+req.query.revalidate_path)\n    return res.json({ revalidated: true })\n  } catch (err) {\n    return res.status(500).send('Error revalidating')\n  }\n}\n",
          },
        ],
        type: 'code',
        id: 'fSBt1eiYcQfjVJ17X6xVl',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 47,
      depth: 0,
    },
  },
  'FTR7G-5IxqiqPDNnxK7-a': {
    id: 'FTR7G-5IxqiqPDNnxK7-a',
    value: [
      {
        id: 'VaoqzUp2DNZg6myTO9e_5',
        type: 'paragraph',
        children: [
          {
            text: 'If we have a very large bulk size (~2 million), we might want to skip page generation on the build phase by passing an empty array of paths:',
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
  rsavPtg260LBqtGyBEZ1h: {
    id: 'rsavPtg260LBqtGyBEZ1h',
    value: [
      {
        children: [
          {
            text: "export async function getStaticPaths() {\n  const posts = await fetch(url-endpoints).then((res) => res.json());\n\n  // Will try to server-render all pages on demand if the path doesn’t exist.\n  return {paths: [], fallback: 'blocking'};\n}\n",
          },
        ],
        type: 'code',
        id: 'LLjFVPE2GhT_sflZsZsi6',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 49,
      depth: 0,
    },
  },
  emNJ9KcMS8OXydMYnEGkK: {
    id: 'emNJ9KcMS8OXydMYnEGkK',
    value: [
      {
        id: 'qAZG-yla-0MNN-IhPHaI5',
        type: 'paragraph',
        children: [
          {
            text: 'This prevents the downside described in ISR. Instead, both User A and User B will see accurate data on revalidation, and the resulting regeneration happens in the background and not on request time.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 50,
      depth: 0,
    },
  },
  _gC8xbnsW2PWv2HkCYvP3: {
    id: '_gC8xbnsW2PWv2HkCYvP3',
    value: [
      {
        id: 'PCnZY6E1T72b3-FnmfSCg',
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
      order: 51,
      depth: 0,
    },
  },
  'EZoUd-FSWDEtEEKT3Hr9f': {
    id: 'EZoUd-FSWDEtEEKT3Hr9f',
    value: [
      {
        id: 'XmQ7tzLl6D8mg28ClqjQy',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FNext-js-Improving-Page-Speed-of-a-Server-Side-React-App_Internal12__1_-0ea1f810ee876b0d4632b1cf77f1f98d.png',
          alt: 'Examples of on-demand static revalidation cases depending on page type, variability, update frequency, and request frequency, including Toptal, Vimeo, and YouTube.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 52,
      depth: 0,
    },
  },
  oyWdx5yXKz3wBTsScDl2a: {
    id: 'oyWdx5yXKz3wBTsScDl2a',
    value: [
      {
        id: 'A3zLkG7aZUe49FgJq2CkC',
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
      order: 53,
      depth: 0,
    },
  },
  mhPXaAD_f27egEM4O58SS: {
    id: 'mhPXaAD_f27egEM4O58SS',
    value: [
      {
        id: 'gzMEoIhppOmTAi6p07UBl',
        type: 'paragraph',
        children: [
          {
            text: 'There are scenarios when a content-dependent variability can be force switched to a time-dependent variability, i.e., if the bulk size and update or request frequency are too high.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 54,
      depth: 0,
    },
  },
  VVurNek7f8g24Se38Eilm: {
    id: 'VVurNek7f8g24Se38Eilm',
    value: [
      {
        id: 'TLGfCzBiUpNUSXm5GW8zr',
        type: 'paragraph',
        children: [
          {
            text: 'Let’s use an IMDB movie details page as an example. Although new reviews may be added or the score may be changed, there is no need to reflect the details within seconds; even if it is an hour late, it doesn’t affect the functionality of the app. However, the server load can be minimized greatly by shifting to ISR, as you do not want to update the movie details page every time a user adds a review. Technically, as long as the update frequency is higher than the request frequency, it can be force switched.',
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
  v03HBRLydMGQecP06I1AN: {
    id: 'v03HBRLydMGQecP06I1AN',
    value: [
      {
        id: 'JFGBJfYRP2bC4LKsF_ATd',
        type: 'paragraph',
        children: [
          {
            text: 'With the launch of',
          },
          {
            text: ' ',
          },
          {
            text: 'React',
          },
          {
            text: ' ',
          },
          {
            text: 'server components in React 18,',
          },
          {
            text: ' ',
          },
          {
            text: 'Layouts RFC',
          },
          {
            text: ' ',
          },
          {
            text: 'is one of the most awaited feature updates in the Next.js platform that will enable support for single-page applications, nested layouts, and a new routing system. Layouts RFC supports improved data fetching, including parallel fetching, which allows Next.js to start rendering before data fetching is complete. With sequential data fetching, content-dependent rendering would be possible only after the previous fetch was completed.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 56,
      depth: 0,
    },
  },
  d4Fe6qAO7AfZVHj17Spyc: {
    id: 'd4Fe6qAO7AfZVHj17Spyc',
    value: [
      {
        id: 'te_LnwKDLNHAEc8DQ0M0X',
        type: 'heading-two',
        children: [
          {
            text: 'Next.js Hybrid Approaches With CSR',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 57,
      depth: 0,
    },
  },
  vQVkeIhAq_XKlmmj7bToL: {
    id: 'vQVkeIhAq_XKlmmj7bToL',
    value: [
      {
        id: 'vcsvLStBBCR3vLgvlF-aV',
        type: 'paragraph',
        children: [
          {
            text: 'In Next.js, client-side rendering always happens after pre-rendering. It is often treated as an add-on rendering type that is quite useful in those cases in which we need to reduce server load, or if the page has components that can be',
          },
          {
            text: ' ',
          },
          {
            text: 'lazy loaded',
          },
          {
            text: '. The hybrid approach of pre-rendering and CSR is advantageous in many scenarios.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 58,
      depth: 0,
    },
  },
  O6spEAqPqb4kuWc2V2Fxi: {
    id: 'O6spEAqPqb4kuWc2V2Fxi',
    value: [
      {
        id: 'skgV2nAZWWnP7ImQYAvWG',
        type: 'paragraph',
        children: [
          {
            text: 'If the content is dynamic and does not require',
          },
          {
            text: ' ',
          },
          {
            text: 'Open Graph',
          },
          {
            text: ' ',
          },
          {
            text: 'integration, we should choose client-side rendering. For example, we can select SSG/SSR to pre-render an empty layout at build time and populate the DOM after the component loads.',
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
  'YX2ae1DtqcNRaNk-N8IBJ': {
    id: 'YX2ae1DtqcNRaNk-N8IBJ',
    value: [
      {
        id: 'ko0JHuYAmUi4EbynlPjGS',
        type: 'paragraph',
        children: [
          {
            text: 'In cases like these, the metadata is typically not affected. For example, the Facebook home feed updates every 60 seconds (i.e., variable content). Still, the page metadata remains constant (e.g., the page title, home feed), hence not affecting the Open Graph protocol and',
          },
          {
            text: ' ',
          },
          {
            text: 'SEO visibility',
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
      order: 60,
      depth: 0,
    },
  },
  'Rf67j-HLtypxZBWO1KFwf': {
    id: 'Rf67j-HLtypxZBWO1KFwf',
    value: [
      {
        id: 'Q5YbE5yaTcRFP3KdL-CHO',
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
      order: 61,
      depth: 0,
    },
  },
  xaf2QMYUmahG5HXSxWNHn: {
    id: 'xaf2QMYUmahG5HXSxWNHn',
    value: [
      {
        id: 'G1qxuK0X5T9p-g0NMJ7bE',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FUntitled-1cef6b174707e01ec9aa48e92f44a7e2.png',
          alt: 'Examples of client-side rendering featuring page type, metadata, content, including Facebook, YouTube, Amazon, and Netflix.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 62,
      depth: 0,
    },
  },
  M4lAyVDuwY_qwKjFQmsE4: {
    id: 'M4lAyVDuwY_qwKjFQmsE4',
    value: [
      {
        id: 'UcEAdNgHmFVu9EqnnHnv-',
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
      order: 63,
      depth: 0,
    },
  },
  pLKgUk_zGxgYzr2T52Z42: {
    id: 'pLKgUk_zGxgYzr2T52Z42',
    value: [
      {
        id: '3Pmt1t8t2_bmQTthBmTGQ',
        type: 'heading-three',
        children: [
          {
            text: 'Dynamic Components',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 64,
      depth: 0,
    },
  },
  '2_c3PhNfQz9j3owHqJ9SQ': {
    id: '2_c3PhNfQz9j3owHqJ9SQ',
    value: [
      {
        id: 'zSOIDmvDz6vpBjaR6oVJN',
        type: 'paragraph',
        children: [
          {
            text: 'Client-side rendering is appropriate for content not visible in the window frame on the first load, or components hidden by default until an action (e.g., login modals, alerts, dialogues). You can display these components either by loading that content after the render (if the component for rendering is already in jsbundle) or by lazy loading the component itself',
          },
          {
            text: ' ',
          },
          {
            text: 'through',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'next/dynamic',
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
      order: 65,
      depth: 0,
    },
  },
  nGuPFH52bvqTIsOuK50bE: {
    id: 'nGuPFH52bvqTIsOuK50bE',
    value: [
      {
        id: 'im1YFB3LJpWMraqfLmpGJ',
        type: 'paragraph',
        children: [
          {
            text: 'Usually, a website render starts with plain HTML, followed by the hydration of the page and client-side rendering techniques such as content fetching on component loads or dynamic components.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 66,
      depth: 0,
    },
  },
  yZf0jVfltVZTFQO2y7gHI: {
    id: 'yZf0jVfltVZTFQO2y7gHI',
    value: [
      {
        id: 'vPaKXVZBxovJp2lAY1UE0',
        type: 'paragraph',
        children: [
          {
            bold: true,
            text: 'Hydration ',
          },
          {
            text: 'is a process in which React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This often makes the user feel as if the page is loading a bit slower, like in an empty X profile layout in which the profile content is loading progressively. Sometimes it is better to eliminate such scenarios by pre-rendering, especially if the content is already available at the time of pre-render.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 67,
      depth: 0,
    },
  },
  'phQCn-5p7VlvbZjarKxSa': {
    id: 'phQCn-5p7VlvbZjarKxSa',
    value: [
      {
        id: '9sS8lMoHGpNixADek1AV3',
        type: 'paragraph',
        children: [
          {
            text: 'The',
          },
          {
            text: ' ',
          },
          {
            bold: true,
            text: 'suspense phase',
          },
          {
            text: ' ',
          },
          {
            text: 'represents the interval period for dynamic component loading and rendering. In Next.js, we are provided with an option to render a placeholder or fallback component during this phase.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 68,
      depth: 0,
    },
  },
  QI6Y5pfTNcXWrLmzkNVHj: {
    id: 'QI6Y5pfTNcXWrLmzkNVHj',
    value: [
      {
        id: 'dC17RUezrD7lqA6tLUMpl',
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
      order: 69,
      depth: 0,
    },
  },
  '3d3Rw8OKjam26P9DfSAvk': {
    id: '3d3Rw8OKjam26P9DfSAvk',
    value: [
      {
        id: '6eG1RZX_aNOICpk48Axua',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          src: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fpublic-files%2FUntitled-8cd1d999a091dae0a313cdb311d00aaf.png',
          alt: 'A page after hydration on the left, followed by the suspense phase and dynamic component download, culminating in a rendered component on the right.',
          srcSet: '',
          sizes: {
            width: 650,
            height: 500,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 70,
      depth: 0,
    },
  },
  xq9fT_f9sE4YAXgY2dg7V: {
    id: 'xq9fT_f9sE4YAXgY2dg7V',
    value: [
      {
        id: 'Otzkx2nPiJOQOTQtpP3QA',
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
      order: 71,
      depth: 0,
    },
  },
  lK00sRTrwvyj7wyVY0_dt: {
    id: 'lK00sRTrwvyj7wyVY0_dt',
    value: [
      {
        id: 'NZSlGxWjEOemObjBZ1Vbv',
        type: 'paragraph',
        children: [
          {
            text: 'An example of importing a dynamic component in Next.js:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 72,
      depth: 0,
    },
  },
  TIx7X04AXH1adKlSzvpBt: {
    id: 'TIx7X04AXH1adKlSzvpBt',
    value: [
      {
        children: [
          {
            text: "/* loads the component on client side */\nconst DynamicModal = dynamic(() => import('../components/modal'), {\n  ssr: false,\n})\n",
          },
        ],
        type: 'code',
        id: 'aOU3UUM10E1xlLpqTDXic',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 73,
      depth: 0,
    },
  },
  M3Wdroh9PI_zM5OUyadP0: {
    id: 'M3Wdroh9PI_zM5OUyadP0',
    value: [
      {
        id: 'IxwJOX8UjMIryNx7a-xNv',
        type: 'paragraph',
        children: [
          {
            text: 'You can render a fallback component while the dynamic component is loading:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 74,
      depth: 0,
    },
  },
  '19c8n0YVB0NlpxXu2FanG': {
    id: '19c8n0YVB0NlpxXu2FanG',
    value: [
      {
        children: [
          {
            text: "/* prevents hydrations until suspense */\nconst DynamicModal = dynamic(() => import('../components/modal'), {\n  suspense: true,\n})\nexport default function Home() {\n  return (\n    <Suspense fallback={`Loading...`}>\n      <DynamicModal />\n    </Suspense>\n  )\n",
          },
        ],
        type: 'code',
        id: 's6eJ6P2uYngOb9mQJSJuh',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 75,
      depth: 0,
    },
  },
  vT0hMDf1EkeZH86eXcUHE: {
    id: 'vT0hMDf1EkeZH86eXcUHE',
    value: [
      {
        id: 'GQcJdx5jNkbXBIMbExmpX',
        type: 'paragraph',
        children: [
          {
            text: 'Note that',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'next/dynamic',
          },
          {
            text: ' ',
          },
          {
            text: 'comes with a',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Suspense',
          },
          {
            text: ' ',
          },
          {
            text: 'callback to show a loader or empty layout until the component loads, so the header component will not be included in the page’s initial JavaScript bundle (reducing the initial load time). The page will render the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Suspense',
          },
          {
            text: ' ',
          },
          {
            text: 'fallback component first, followed by the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Modal',
          },
          {
            text: ' ',
          },
          {
            text: 'component when the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Suspense',
          },
          {
            text: ' ',
          },
          {
            text: 'boundary is resolved.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 76,
      depth: 0,
    },
  },
  '6icY2mnUFgR2c-4I7OuWB': {
    id: '6icY2mnUFgR2c-4I7OuWB',
    value: [
      {
        id: '5R8mxkCbz-dsf41tJhk08',
        type: 'heading-two',
        children: [
          {
            text: 'Next.js Caching: Tips and Techniques',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 77,
      depth: 0,
    },
  },
  DFNkanKJKFkqLAfaR9fI_: {
    id: 'DFNkanKJKFkqLAfaR9fI_',
    value: [
      {
        id: 'H9G9K8bUETSjxsh-2IO3w',
        type: 'paragraph',
        children: [
          {
            text: 'If you need to improve page performance and reduce server load at the same time,',
          },
          {
            text: ' ',
          },
          {
            text: 'caching',
          },
          {
            text: ' ',
          },
          {
            text: 'is the most useful tool in your arsenal. In SSR and caching, we’ve discussed how caching can effectively improve availability and performance for route points with a large bulk size. Usually, all Next.js assets (pages, scripts, images, videos) have cache configurations that we can add to and tweak to adjust to our requirements. Before we examine this, let’s briefly cover the core concepts of caching. The caching for a webpage must go through three different checkpoints when a user opens any website in a web browser:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 78,
      depth: 0,
    },
  },
  mZSU1KzUBZsZ7KAFTEPB_: {
    id: 'mZSU1KzUBZsZ7KAFTEPB_',
    value: [
      {
        id: '9uX31A6MYCoa_KC3sufoT',
        type: 'bulleted-list',
        children: [
          {
            text: 'The browser cache is the first checkpoint for all HTTP requests. If there’s a cache hit it will be served directly from the browser cache store, while a cache miss will pass on to the next checkpoint.',
          },
          {
            text: 'The content delivery network (CDN) cache is the second checkpoint. It is a cache store distributed to different proxy servers across the globe. This is also called caching on the edge.',
          },
          {
            text: 'The origin server is the third checkpoint, where the request is served and revalidated if the cache store pushes a revalidate request (i.e., the page in the cache has become stale).',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 79,
      depth: 0,
    },
  },
  KVLWh9qqkF_s80a7wGYUD: {
    id: 'KVLWh9qqkF_s80a7wGYUD',
    value: [
      {
        id: 'e8FNevHM0icTOXsnGheAw',
        type: 'paragraph',
        children: [
          {
            text: 'Caching headers are added to all immutable assets originating from',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: '/_next/static',
          },
          {
            text: ', such as CSS, JavaScript, images, and so on:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 80,
      depth: 0,
    },
  },
  '6yOfY0eWPHBeb4gv73oEr': {
    id: '6yOfY0eWPHBeb4gv73oEr',
    value: [
      {
        children: [
          {
            text: 'Cache-Control: public, maxage=31536000, immutable\n',
          },
        ],
        type: 'code',
        id: 'e38ySVxMfFc1hxJ3WHY1E',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 81,
      depth: 0,
    },
  },
  cOj2ET0T5Qbd4FpISDNg7: {
    id: 'cOj2ET0T5Qbd4FpISDNg7',
    value: [
      {
        id: 'XMr9quHKAZoa-ythnXPyv',
        type: 'paragraph',
        children: [
          {
            text: 'The caching header for Next.js server-side rendering is configured by the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Cache-Control',
          },
          {
            text: ' ',
          },
          {
            text: 'header in',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'getServerSideProps',
          },
          {
            text: ':',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 82,
      depth: 0,
    },
  },
  nQ0gB6PDrdaHhBr_aRIP2: {
    id: 'nQ0gB6PDrdaHhBr_aRIP2',
    value: [
      {
        children: [
          {
            text: "res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59');\n",
          },
        ],
        type: 'code',
        id: 'kswX6OVAcre583nyIehSc',
        props: {
          language: 'JavaScript',
          theme: 'VSCode',
          nodeType: 'void',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 83,
      depth: 0,
    },
  },
  'sul8a4KIFcvUy1ND-s7s0': {
    id: 'sul8a4KIFcvUy1ND-s7s0',
    value: [
      {
        id: 'Uz7ehS8_kyVH4eJIqv2Wp',
        type: 'paragraph',
        children: [
          {
            text: 'However, for statically generated pages (SSGs), the caching header is autogenerated by the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'revalidate',
          },
          {
            text: ' ',
          },
          {
            text: 'option in',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'getStaticProps',
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
      order: 84,
      depth: 0,
    },
  },
  '1_SbDmqrF2Ae34dO8_0iF': {
    id: '1_SbDmqrF2Ae34dO8_0iF',
    value: [
      {
        id: 'MGHhgqBaGEmA2vq0k-4fs',
        type: 'heading-three',
        children: [
          {
            text: 'Understanding and Configuring a Cache Header',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 85,
      depth: 0,
    },
  },
  'ei-d4NmUHzYyRhiycguCF': {
    id: 'ei-d4NmUHzYyRhiycguCF',
    value: [
      {
        id: 'HWLrNF0BZfzj2DM6ayopa',
        type: 'paragraph',
        children: [
          {
            text: 'Writing a cache header is straightforward, provided you learn how to configure it properly. Let’s examine what each tag means.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 86,
      depth: 0,
    },
  },
  XgaLXR5pYhgx_d1chVTpm: {
    id: 'XgaLXR5pYhgx_d1chVTpm',
    value: [
      {
        id: '-N6cOng7qrATQHYkT4d5w',
        type: 'paragraph',
        children: [
          {
            bold: true,
            text: 'Public vs. Private',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 87,
      depth: 0,
    },
  },
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10" ref={rootRef}>
      <div className="flex mb-10">
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
          }}
        >
          Highlight text
        </button>
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.blocks.Image.create();
          }}
        >
          Add Image
        </button>
        <button className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md" onClick={onSubmit}>
          Get editor data
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setReadOnly((p) => !p)}>
          Switch readOnly mode
        </button>
      </div>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rootRef}
        marks={MARKS}
        autoFocus
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        // value={value}
      />
    </div>
  );
};

export default BasicExample;
