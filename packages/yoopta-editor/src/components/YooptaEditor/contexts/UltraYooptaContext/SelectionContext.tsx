import React, { createContext, useState, useMemo } from 'react';

type SelectionContextProps = {
  selectionPath: number[] | null;
  setSelection: (path: number[] | null) => void;
};

export const SelectionContext = createContext<SelectionContextProps>({
  selectionPath: null,
  setSelection: () => {},
});

export const SelectionProvider: React.FC = ({ children }) => {
  const [selectionPath, setSelection] = useState(null);

  const value = useMemo(() => ({ selectionPath, setSelection }), [selectionPath]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};
