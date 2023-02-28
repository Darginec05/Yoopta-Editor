const CodeLineRender = ({ attributes, children }) => {
  return (
    <div {...attributes} style={{ position: 'relative' }}>
      {children}
    </div>
  );
};

export { CodeLineRender };
