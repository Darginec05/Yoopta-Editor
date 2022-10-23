import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { TextLeaf } from '../../components/Editor/TextLeaf';
import { RenderElement } from '../../components/Editor/RenderElement/RenderElement';
import { DEFAULT_STATE } from '../../components/Editor/utils';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import s from '../../components/Editor/Editor.module.scss';

const Content = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    const content = localStorage.getItem('content');
    setValue(content ? JSON.parse(content) : DEFAULT_STATE);
  }, []);

  useScrollToElement();

  const renderChildren = (child) => {
    const childId = v4();

    // console.log(child);

    // eslint-disable-next-line no-use-before-define
    if (child.type) return renderElement(child);

    return (
      <TextLeaf
        key={childId}
        leaf={child}
        attributes={{
          'data-slate-leaf': true,
        }}
      >
        {child.text}
      </TextLeaf>
    );
  };

  const renderElement = ({ id, type, children, ...rest }) => {
    console.log(children);
    
    return (
    <RenderElement
      element={{ type, ...rest }}
      attributes={{ 'data-slate-node': 'element', ref: null }}
      key={id}
      isEdit={false}
    >
      {children.map(renderChildren)}
    </RenderElement>
  )};

  return (
    <main className={s.editorContainer}>
      <div className={s.editorContent}>
        <div style={{ padding: '0 64px' }}>{value?.map(renderElement)}</div>
      </div>
    </main>
  );
};

export default Content;
