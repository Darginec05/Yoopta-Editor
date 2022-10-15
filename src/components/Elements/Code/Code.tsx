// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/themes/atom-dark.css';

import { memo } from 'react';
import { ElementProps } from '../../Editor/types';
import s from './Code.module.scss';

const Code = memo<ElementProps>(({ attributes, children }) => {
  // console.log(children);
  // console.log(element);

  // const getTokens = () => {
  //   const tokens = Prism.tokenize(element.children[0].text, Prism.languages.javascript);

  //   return tokens.map((token, i) => {
  //     if (typeof token === 'string') {
  //       return (
  //         <span data-slate-leaf key={i} id={`lol-${i}`}>
  //           <span data-slate-string>{token}</span>
  //         </span>
  //       );
  //     }

  //     return (
  //       <span data-slate-leaf className={`token ${token.type}`} key={i}>
  //         <span data-slate-string>{token.content}</span>
  //       </span>
  //     );
  //   });
  // };

  // getTokens();

  return (
    <code className={s.code} {...attributes}>
      <pre>{children}</pre>
    </code>
  );
});

Code.displayName = 'Code';

export { Code };
