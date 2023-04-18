import { cx, RenderElementProps } from '@yopta/editor';
import { useEffect } from 'react';
import { ChatGTPElement } from '../types';
import s from './ChatGPT.module.scss';

// Установка параметров запроса
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
const OPENAI_API_KEY = 'nothing';
// const prompt = 'Write me code in JavaScript bubble sort and explain';
const prompt = 'Write me blog about Web page perfomance';

const ChatGPTEditor = ({ attributes, children, element }: RenderElementProps<ChatGTPElement>) => {
  useEffect(() => {
    // fetch(OPENAI_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + OPENAI_API_KEY,
    //   },
    //   body: JSON.stringify({
    //     model: 'text-davinci-003',
    //     prompt,
    //     // messages: [{ role: 'user', content: prompt }],
    //     temperature: 0.7,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  }, []);

  return (
    <div className={s.root} key={element.id} contentEditable={false} draggable={false}>
      <div className={cx(s.selectImg, { [s.selected]: false })} />
      <input />
      {children}
    </div>
  );
};

ChatGPTEditor.displayName = 'ChatGPTEditor';

export { ChatGPTEditor };

// //Bubble Sort
// function bubbleSort(arr) {
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         let temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         swapped = true;
//       }
//     }
//   } while (swapped);
//   return arr;
// }

// let arr = [5, 2, 8, 1, 4];
// bubbleSort(arr);
// // [1, 2, 4, 5, 8]

// With the increasingly competitive digital landscape, it is essential for businesses to pay close attention to their web page performance. Slow loading speeds, poor design, and other technical issues can lead to frustrated customers, reduced conversions, and decreased traffic. Fortunately, there are several ways to improve web page performance and ensure a seamless user experience.
// First and foremost, businesses should ensure that their websites are optimized for both mobile and desktop devices. This means that all design elements, text, images, and videos should be properly sized and formatted for each device. Additionally, businesses should optimize their websites for speed by minimizing the number of requests, compressing and caching files, minifying code, and reducing the size of images.
// Another way to improve web page performance is to focus on user experience. This includes making sure that navigation is intuitive and that pages load quickly. Additionally, businesses should make sure that the content is relevant and engaging to keep visitors on the page. Additionally, businesses should make sure that their pages are properly indexed for search engines so that potential customers can easily find them.
// Finally, businesses should track their web page performance to identify areas for improvement. This can be done with tools such as Google Analytics, which allows businesses to track page speed, user engagement,
