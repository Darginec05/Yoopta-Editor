import { YoptaRenderer } from 'yopta-editor';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    id: 'c26b1ada-d7ec-40a7-b763-e0b9bdd74aba',
    type: 'heading-one',
    children: [
      {
        text: 'Largest Contentful Paint (LCP)',
      },
    ],
    isVoid: false,
  },
  {
    id: '153488ef-2216-4421-bffc-37f1c7ce21d7',
    type: 'callout',
    children: [
      {
        text: "Largest Contentful Paint (LCP) is an important, user-centric metric for measuring perceived load speed because it marks the point in the page load timeline when the page's main content has likely loaded—a fast LCP helps reassure the user that the page is useful.",
      },
    ],
    isVoid: false,
  },
  {
    id: 'c4ab0772-2057-41b5-b959-ddfe738312eb',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: '8a575985-d847-49aa-a912-87752f12e243',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "Historically, it's been a challenge for web developers to measure how quickly the main content of a web page loads and is visible to users.",
      },
    ],
  },
  {
    id: '46fe4c3d-6938-46f6-9b5e-27514169164e',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "Older metrics like load or DOMContentLoaded are not good because they don't necessarily correspond to what the user sees on their screen. And newer, user-centric performance metrics like First Contentful Paint (FCP) only capture the very beginning of the loading experience. If a page shows a splash screen or displays a loading indicator, this moment is not very relevant to the user.",
      },
    ],
  },
  {
    id: '39abe317-814b-4672-9738-34c78b56a315',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: 'd44720cf-8799-45b6-a557-419f30afe627',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "In the past we've recommended performance metrics like First Meaningful Paint (FMP) and Speed Index (SI) (both available in Lighthouse) to help capture more of the loading experience after the initial paint, but these metrics are complex, hard to explain, and often wrong—meaning they still do not identify when the main content of the page has loaded.",
      },
    ],
  },
  {
    id: '1a6577c2-2b50-4a94-8b87-4f1e8fa72680',
    type: 'callout',
    isVoid: false,
    children: [
      {
        text: 'To learn more about the research and methodology behind this recommendation, see: Defining the Core Web Vitals metrics thresholds',
      },
    ],
  },
  {
    id: 'eb7e7f80-cf9e-43d2-a806-703bb00f73a5',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "Sometimes simpler is better. Based on discussions in the W3C Web Performance Working Group and research done at Google, we've found that a more accurate way to measure when the main content of a page is loaded is to look at when the largest element was rendered.",
      },
    ],
  },
  {
    id: '60fe9685-cb18-4ca1-8895-d94de39e0c12',
    type: 'heading-two',
    isVoid: false,
    children: [
      {
        text: 'What is LCP?',
      },
    ],
  },
  {
    id: '9eebfdc1-0433-4d0b-b0c8-ed51af2dbf00',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'The Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.',
      },
    ],
  },
  {
    id: '1137d9f0-2cdf-484a-afa8-aeca3914a965',
    type: 'heading-three',
    isVoid: false,
    children: [
      {
        text: 'What is a good LCP score?',
      },
    ],
  },
  {
    id: '1d90d30c-262a-4b25-90e0-6c4e929f77fa',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "To provide a good user experience, sites should strive to have Largest Contentful Paint of 2.5 seconds or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
      },
    ],
  },
  {
    id: '76ff6a02-2fbe-47ba-9818-a834f6a37b32',
    type: 'image',
    isVoid: true,
    children: [
      {
        text: '',
      },
    ],
    src: 'https://res.cloudinary.com/ench-app/image/upload/v1669657143/elqsdYqQEefWJbUM2qMO_epivsr.svg',
    options: {
      width: 768,
      height: 192,
      format: 'svg',
      name: 'elqsdYqQEefWJbUM2qMO_epivsr',
      id: 'ea74090ad48af9cc54773d04fe0192e2',
      secure_url: 'https://res.cloudinary.com/ench-app/image/upload/v1669657143/elqsdYqQEefWJbUM2qMO_epivsr.svg',
    },
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
