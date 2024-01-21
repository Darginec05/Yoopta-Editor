import React, { createContext, useState, useMemo, useContext, useRef } from 'react';

type SelectionContextProps = {
  selection: number[] | null;
  setSelection: (path: number[] | null) => void;
};

export const SelectionContext = createContext<SelectionContextProps>({
  selection: null,
  setSelection: () => {},
});

export const SelectionProvider: React.FC = ({ children }) => {
  // const selection = useRef<number[] | null>(null);
  const [selection, updateSelection] = useState<number[] | null>(null);

  const setSelection = (path: number[] | null) => {
    console.log('set selection', path);

    // selection.current = path;
    updateSelection(path);
  };

  // const value = useMemo(() => ({ selection: selection.current, setSelection }), [selection.current]);
  const value = useMemo(() => ({ selection, setSelection }), [selection]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};

export const useYooptaSelection = () => useContext(SelectionContext);
