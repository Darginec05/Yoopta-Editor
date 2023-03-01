const CodeLineRender = () => {
  return function CodeLineRender({ attributes, children }) {
    return <div {...attributes}>{children}</div>;
  };
};

export { CodeLineRender };
