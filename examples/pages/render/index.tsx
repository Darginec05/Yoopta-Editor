import { YoptaRenderer } from 'yopta-editor';

import s from './styles.module.scss';
import 'yopta-editor/dist/index.css';

const data = [
  {
    id: '663607d6-80c8-4d96-811a-1d7ad2aadcdd',
    type: 'heading-one',
    children: [
      {
        text: '<YoptaRenderer /> - component just for render',
      },
    ],
    isVoid: false,
  },
  {
    id: 'f903cce8-8b70-441a-a81b-57181fbd2a7b',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Use this component for just displaying your data',
      },
    ],
  },
];

const JustRenderExample = () => {
  return (
    <div className={s.container}>
      <YoptaRenderer data={data} className={s.editor} />
    </div>
  );
};

export default JustRenderExample;
