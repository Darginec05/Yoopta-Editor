const CodeLeaf = ({ leaf, attributes, children }) => {
  if (!leaf.token) return null;

  return (
    <span {...attributes} className={`token ${leaf.token_type}`}>
      {children}
    </span>
  );
};

export { CodeLeaf };
