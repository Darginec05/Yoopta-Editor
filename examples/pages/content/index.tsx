import { YoptaRenderer } from 'yopta-editor';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    id: 'c1fda192-7ee3-404e-8c6b-82c92e263d75',
    type: 'paragraph',
    children: [
      {
        text: 'Which means it must have a ',
      },
      {
        text: 'text',
        code: true,
      },
      {
        text: ' property with a string of content.But ',
      },
      {
        text: 'any',
        bold: true,
      },
      {
        text: ' other custom properties are also allowed, and completely up to you. This lets you tailor your data to your specific domain and use case, adding whatever formatting logic you\'d like, without Slate getting in the way.This interface-based approach separates Slate from most other rich text editors which require you to work with their hand-rolled "model" classes and makes it much easier to reason about. It also means that it avoids startup time penalties related to "initializing" the data model.',
      },
    ],
  },
  {
    id: '4891990e-5157-44ed-aac1-6c4ea36c344b',
    type: 'paragraph',
    children: [
      {
        text: 'Slate works with pure JSON objects. All it requires is that those JSON objects conform to certain interfaces. For example, a text node in Slate must obey the ',
      },
      {
        text: 'Text',
        code: true,
        italic: true,
      },
      {
        text: ' interface:',
      },
    ],
  },
  {
    id: '18dc6700-b9e3-4f2c-9ac6-b4601d654d6f',
    type: 'code',
    children: [
      {
        text: "const paragraph = {  type: 'paragraph',  children: [...],};\nconst link = {  type: 'link',  url: 'https://example.com', children: [...]",
      },
    ],
    isVoid: false,
  },
  {
    id: 'bbe33caa-e1ad-4b69-a0d3-feb21090f3f4',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Slate works with pure JSON objects. All it requires is that those JSON objects conform to certain interfaces. For example, a text node in Slate must obey the Text interface:',
      },
    ],
  },
  {
    id: '73cecc3e-c3ef-4120-b10d-0a95d7c94a06',
    type: 'image',
    isVoid: true,
    children: [
      {
        text: '',
      },
    ],
    src: 'https://res.cloudinary.com/ench-app/image/upload/v1672604156/DALL_E_2022-12-30_22.57.50_bxk5ij.png',
    options: {
      width: 1024,
      height: 1024,
      format: 'png',
      name: 'DALL_E_2022-12-30_22.57.50_bxk5ij',
      id: 'f1811aaf0fb693e958cbdd32b85976ab',
      secure_url: 'https://res.cloudinary.com/ench-app/image/upload/v1672604156/DALL_E_2022-12-30_22.57.50_bxk5ij.png',
    },
  },
  {
    type: 'paragraph',
    id: 'fc192fac-2083-4263-9692-0b1553fe4271',
    children: [
      {
        text: 'With ',
      },
      {
        text: '23 million unique visitors per month',
        bold: true,
      },
      {
        text: ',  is the French leader in e-commerce, and as a result, we continuously strive to achieve the best possible performance. The reason is very simple: better performance usually means a better user experience and therefore a higher user retention rate.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'f2ff3a83-bc52-47f4-b8c8-08184b324514',
    children: [
      {
        text: 'In this article we will see how the implementation of progressive hydration strategies helped us to ',
      },
      {
        text: 'reduce ',
        bold: true,
      },
      {
        text: 'the ',
      },
      {
        type: 'link',
        url: 'https://web.dev/fid/',
        id: '210a3536-3af1-4897-98f0-9bbbaa025429',
        children: [
          {
            text: 'First Input Delay',
          },
        ],
      },
      {
        text: ' on our mobile site ',
      },
      {
        text: 'by more than 50%',
        bold: true,
      },
      {
        text: ', allowing us to reach the “FAST” goal on all three indicators.',
      },
    ],
  },
  {
    type: 'heading-one',
    id: '2a1fbdd4-a79f-4f03-8841-0ca99c8dfa8b',
    children: [
      {
        text: 'Hydration and its impact on the FID',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'a7edb32f-246c-413e-bdbc-e12ea986b80a',
    children: [
      {
        text: 'With a strong SEO focus and highly cacheable content, server-side rendering is an obvious choice for an e-commerce website like Cdiscount.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'ca0f5dd4-d94d-4d45-9ff5-1b2ed816aacb',
    children: [
      {
        text: 'Despite server rendering allowing users to view our website quickly in their browsers, the JavaScript bundles must still be loaded, processed, and executed for them to interact with it. In this process, called ',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            text: 'hydr',
            bold: true,
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            bold: true,
            text: '',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            bold: true,
            text: 'a',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            bold: true,
            text: 't',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            bold: true,
            text: 'ion',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: 'ace82fc3-485b-4a51-b280-1bb96045c76d',
        children: [
          {
            bold: true,
            text: '',
          },
        ],
      },
      {
        text: ', React checks the nodes in the current DOM and hydrates them with the corresponding JavaScript by creating what is called the ',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/faq-internals.html',
        id: 'b37d38a6-cb55-4118-b5d9-5d454bd82237',
        children: [
          {
            text: 'Virtual',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/faq-internals.html',
        id: 'b37d38a6-cb55-4118-b5d9-5d454bd82237',
        children: [
          {
            text: 'D',
          },
        ],
      },
      {
        text: '',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/faq-internals.html',
        id: 'b37d38a6-cb55-4118-b5d9-5d454bd82237',
        children: [
          {
            text: 'OM',
          },
        ],
      },
      {
        text: '.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '869a3bf4-0fdd-4941-b40d-e2eea6cbc022',
    children: [
      {
        text: 'The whole page is hydrated all at once, meaning the user must wait until the bottom of the page is hydrated before they can interact with the top of the page. This can be frustrating for the user, as the UI can appear frozen.',
      },
    ],
  },
  {
    type: 'code',
    id: '784c066c-6d83-43fa-ba1c-a9953897ec55',
    children: [
      {
        text: 'public class Main {\n  int x = 5;\n\n  public static void main(String[] args) {\n    Main myObj1 = new Main();  // Object 1\n    Main myObj2 = new Main();  // Obdject 2\n    System.out.println(myObj2.x);\n    const kek = await kekos()();\n  }\n}',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'cc4814a2-0f7a-44b5-9cf4-c6c94940fc7e',
    children: [
      {
        text: 'So how exactly does hydraddddddaddaddtion impact FID? ',
        bold: true,
      },
    ],
    isVoid: false,
  },
  {
    type: 'paragraph',
    id: '8d8ca5ac-2b67-47ac-8b24-6884999f6248',
    children: [
      {
        text: 'Long first input delays are typically caused when a user tries to interact with the page while the main thread is busy and unable to respond right away. On a server-side rendered page, the hydration process can take up a lot of space on the main thread.',
      },
    ],
    isVoid: false,
  },
  {
    type: 'paragraph',
    id: '7e1abb1e-357c-4d33-8e76-d83c16532df0',
    children: [
      {
        text: 'Long first input delays are typically caused when a user tries to interact with the page while the main thread is busy and unable to respond right away. On a server-side rendered page, the hydration process can take up a lot of space on the main thread.',
      },
    ],
    isVoid: false,
  },
  {
    id: '8846d6ae-28a0-42d9-97d7-f6d8ed01d7f4',
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        id: 'a8abdf2c-f136-4a9e-9c77-fa2c52a721f0',
        children: [
          {
            text: 'dasdadaLong first input delaysasda are typically caused when a user tries to interact with the page while the main thread is busy and unable to respond right away. On a server-side rendered pagem,m,mm,m,m, the hydration process can take up a lot of space on the main thread.',
          },
        ],
        isVoid: false,
      },
      {
        type: 'list-item',
        id: 'be9fa7b1-e2f5-4b3c-993c-613c21a4429c',
        children: [
          {
            text: 'dasdalk,m,llm,mk]',
          },
        ],
        isVoid: false,
      },
      {
        type: 'list-item',
        id: '19036a76-e211-4550-a37d-ad8c479f58ed',
        children: [
          {
            text: 'dasdalk,m,llm,mk]asdada',
          },
        ],
        isVoid: false,
      },
    ],
  },
  {
    type: 'paragraph',
    id: '1f2756f7-2090-410d-9eef-059377414f5e',
    children: [
      {
        text: 'asdasasddkljkjljlkasdsadlk,m,llm,mk]',
        bold: true,
      },
    ],
    isVoid: false,
  },
  {
    type: 'paragraph',
    id: 'fdd2382b-0973-4e15-9a8f-1bb36dd27e3b',
    children: [
      {
        text: 'kljkjljlasdsadaklk,m,llmasdasdasd,adasdmk]',
        bold: true,
      },
    ],
    isVoid: false,
  },
  {
    type: 'paragraph',
    id: '98b13b98-6672-4f0c-bf03-4982c82f802a',
    children: [
      {
        text: 'kljkjljlasdsadaklk,m,llmasdasdasd,adasdmk]',
        bold: true,
      },
    ],
    isVoid: false,
  },
];

const ContentPage = () => {
  return (
    <div className={s.main}>
      <YoptaRenderer data={exampleData} wrapCls={s.editorWrapper} />
    </div>
  );
};

export default ContentPage;
