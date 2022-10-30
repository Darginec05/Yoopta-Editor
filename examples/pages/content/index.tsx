import { YoptaRenderer } from 'yopta-editor/dist/YoptaRenderer';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    id: 'f21104c7-57e2-4a82-8647-7b0fc1516aa6',
    type: 'heading-two',
    children: [
      {
        text: 'CHEST & HIP ROLLS',
      },
    ],
    isVoid: false,
  },
  {
    id: '6cbf3bec-b865-44db-85d6-a5c6303f1b72',
    type: 'paragraph',
    children: [
      {
        text: 'WELCOME TO THE FIRST CHAPTER OF OUR JOURNEY!',
      },
    ],
  },
  {
    id: '80e7eaca-9d6e-4a7f-843e-917fe325034e',
    type: 'paragraph',
    children: [
      {
        text: 'ALL THE VIDEOS ARE INVERTED FOR YOUR COMFORT TRAINING.',
      },
    ],
  },
  {
    id: 'b70cd440-a328-4afe-a011-74f421f54302',
    type: 'paragraph',
    children: [
      {
        text: 'In the first video, you will learn how to do ',
      },
      {
        text: 'different',
        code: true,
      },
      {
        text: " chest rolls. Don't forget to do warmup & back stretch first. The warmup video you can find on my Instagram page ",
      },
      {
        text: '@alinakosmoss',
        bold: true,
      },
      {
        text: '.',
      },
    ],
  },
  {
    id: '358c4c78-f51f-4a2b-8092-6e91e611bc2c',
    type: 'video',
    children: [
      {
        text: '/vid',
      },
    ],
    isVoid: false,
  },
  {
    id: '658665c2-773b-45f3-bef7-219bd077867c',
    type: 'paragraph',
    children: [
      {
        text: 'I am so glad, that you decided to start it with me. I appreciate it so much!',
      },
    ],
  },
  {
    id: '5038dcca-6f2a-47bf-8f43-d204b7fdaee7',
    type: 'paragraph',
    children: [
      {
        text: 'Ok, here are some main points from this video:',
      },
    ],
  },
  {
    id: '911513af-51b9-4ed0-b7f6-5688e5ae9a44',
    type: 'bulleted-list',
    children: [
      {
        id: '62b4017b-410f-496e-bd7c-32c4e0f1e1d4',
        type: 'list-item',
        children: [
          {
            text: 'do a breath in when you open your chest and put your shoulder blades together at the same time. And do a breath out when you roll back ',
          },
        ],
        isVoid: false,
      },
      {
        id: '62b4017b-410f-496e-bd7c-32c4e0f1e1d4',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'help yourself with arms',
          },
        ],
      },
      {
        id: '62b4017b-410f-496e-bd7c-32c4e0f1e1d4',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'keep your shoulder ',
          },
          {
            id: '3257f46e-8a94-44a5-a164-8b6087b72353',
            type: 'link',
            url: 'https://link.com',
            children: [
              {
                text: 'always',
              },
            ],
          },
          {
            text: ' down',
          },
        ],
      },
      {
        id: '62b4017b-410f-496e-bd7c-32c4e0f1e1d4',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'isolate your lower body',
          },
        ],
      },
      {
        id: '62b4017b-410f-496e-bd7c-32c4e0f1e1d4',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'always start from the points to help yourself to understand direction, then “join” these points with a line.',
          },
        ],
      },
    ],
  },
  {
    id: 'e853dbf8-f674-465f-bca1-89a4d4644e8a',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Now we can try it with music :)',
      },
    ],
  },
  {
    id: '8d59dca5-85fa-41b1-8de1-9c1dd874f419',
    type: 'video',
    children: [
      {
        text: '/vi',
      },
    ],
    isVoid: false,
  },
  {
    id: 'b844a9d0-beb9-4b62-9422-f54869f13e95',
    type: 'paragraph',
    children: [
      {
        text: "Ok, great job! In the next video, I will teach you how to do hip rolls. This exercise love all my students! Hope, you will like it too. LET'S GO!",
      },
    ],
    isVoid: false,
  },
  {
    id: 'cc4ef616-258d-4ea5-ad6f-b8c1ae3fac7b',
    type: 'video',
    children: [
      {
        text: '/vi',
      },
    ],
    isVoid: false,
  },
  {
    id: 'e80c322d-9535-4b19-80bb-c9da4145b1c6',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Ok, here are some main points from this video:',
      },
    ],
  },
  {
    id: '7745e9ce-7732-45e0-9941-c1e113a591d5',
    type: 'bulleted-list',
    children: [
      {
        id: '2f02944b-d9c2-497e-8f27-8c73652d7261',
        type: 'list-item',
        children: [
          {
            text: 'Do all the rolls on soft knees',
          },
        ],
        isVoid: false,
      },
      {
        id: '2f02944b-d9c2-497e-8f27-8c73652d7261',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'start with the points to understand direction, then “join” these points with a line.',
          },
        ],
      },
      {
        id: '2f02944b-d9c2-497e-8f27-8c73652d7261',
        type: 'list-item',
        isVoid: false,
        children: [
          {
            text: 'isolate your upper body',
          },
        ],
      },
    ],
  },
  {
    id: '434c8b8a-1241-4fdd-8248-60540382860f',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: "Let's try it with music!",
      },
    ],
  },
  {
    id: '65998dbe-f7bd-4edd-bb70-3c6e14ef60d9',
    type: 'video',
    children: [
      {
        text: '/vi',
      },
    ],
    isVoid: false,
  },
  {
    id: '5e164efe-2581-4a49-b01d-98c81c8d758c',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Great job! Before we start to learn body rolls, I will ask you to do homework.',
      },
    ],
  },
  {
    id: 'ecab0088-730b-4b83-9bc9-a02e6b42c42c',
    type: 'paragraph',
    children: [
      {
        text: 'Train and film how yourself doing chest & hip rolls. You can send me this video and I will check it out.',
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
