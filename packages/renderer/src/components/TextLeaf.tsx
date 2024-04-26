const TextLeaf = ({ children, attributes }) => {
  const attrs = {
    ...attributes,
  };

  return <span {...attrs}>{children}</span>;
};

export { TextLeaf };
