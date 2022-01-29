import { v4 } from 'uuid';
import { useState } from 'react';
import { TextLeaf } from '../../components/Editor/TextLeaf';
import { Element } from '../../components/Editor/Element';
import { DEFAULT_STATE } from '../../components/Editor/utils';

const Content = ({ value: serverData }) => {
  const [value] = useState(() => {
    if (typeof window === 'undefined') return [];

    const content = localStorage.getItem('content');
    return content ? JSON.parse(content) : serverData;
  });

  const renderChildren = (child) => {
    const childId = v4();

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

  const renderElement = ({ type, children, ...rest }) => (
    <Element element={{ type, ...rest }} attributes={{}} key={v4()}>
      {children.map(renderChildren)}
    </Element>
  );

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div style={{ maxWidth: 680, padding: '1rem 0 2rem 0', margin: '0 64px' }}>{value.map(renderElement)}</div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      value: JSON.parse(DEFAULT_STATE),
    },
  };
}

export default Content;
