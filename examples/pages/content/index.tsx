import { YoptaRenderer } from 'yopta-editor';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    type: 'paragraph',
    id: 'fbd6a0f9-17a4-4837-9661-0bfb3888470c',
    children: [
      {
        text: 'With ',
      },
      {
        text: '23 million unique visitors per month',
        bold: true,
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'https://www.cdiscount.com/',
        id: 'a49a16e6-9d3e-4e64-8367-44126fdce04d',
        children: [
          {
            text: 'Cdiscount',
          },
        ],
      },
      {
        text: ' is the French leader in e-commerce, and as a result, we continuously strive to achieve the best possible performance. The reason is very simple: better performance usually means a better user experience and therefore a higher user retention rate.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '6ebbed78-bf08-4513-b809-9ddd800e0335',
    children: [
      {
        text: 'Google announced in May 2020 that it will prioritize sites based on ',
      },
      {
        type: 'link',
        url: 'https://web.dev/vitals/',
        id: '3a9c3ca4-146f-473f-9f64-7618eb9c5745',
        children: [
          {
            text: 'Core Web Vitals (LCP, FID, and CLS)',
          },
        ],
      },
      {
        text: '. As a result, performance is no longer just about user experience, but also about SEO ranking.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'c215d39a-48b0-4e10-acb0-0e428a0e054e',
    children: [
      {
        text: 'In this article we will see how the implementation of progressive hydration strategies helped us to',
      },
      {
        text: ' reduce ',
        bold: true,
      },
      {
        text: 'the ',
      },
      {
        type: 'link',
        url: 'https://web.dev/fid/',
        id: 'ed630e8a-4f58-4751-9c2b-b1818024d806',
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
    id: '8590ada6-4579-4e7b-8ba7-ac25d89fe040',
    children: [
      {
        text: 'Hydration and its impact on the FID',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '87304480-d494-4077-bf6a-558cd77f4a72',
    children: [
      {
        text: 'With a strong SEO focus and highly cacheable content, server-side rendering is an obvious choice for an e-commerce website like Cdiscount.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '66c87530-a012-490f-b213-8a00d33e84ff',
    children: [
      {
        text: 'Despite server rendering allowing users to view our website quickly in their browsers, the JavaScript bundles must still be loaded, processed, and executed for them to interact with it. In this process, called ',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/react-dom.html#hydrate',
        id: '22e04d8d-27d5-40e2-9ced-c3caca2392f4',
        children: [
          {
            text: 'hydration',
            bold: true,
          },
        ],
      },
      {
        text: ', React checks the nodes in the current DOM and hydrates them with the corresponding JavaScript by creating what is called the ',
      },
      {
        type: 'link',
        url: 'https://reactjs.org/docs/faq-internals.html',
        id: 'd941d7eb-025d-4a28-ae67-4650827f0619',
        children: [
          {
            text: 'Virtual DOM',
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
    id: 'e155444a-b25e-4c96-8a38-d6ba46e6320e',
    children: [
      {
        text: 'The whole page is hydrated all at once, meaning the user must wait until the bottom of the page is hydrated before they can interact with the top of the page. This can be frustrating for the user, as the UI can appear frozen.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'b9931417-dabb-469a-91dd-d849586d1ad6',
    children: [
      {
        text: 'So how exactly does hydration impact FID? ',
        bold: true,
      },
      {
        text: 'Long first input delays are typically caused when a user tries to interact with the page while the main thread is busy and unable to respond right away. On a server-side rendered page, the hydration process can take up a lot of space on the main thread.',
      },
    ],
  },
  {
    id: 'f49824c5-9825-415e-86b7-9f0f5042e7fc',
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
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
