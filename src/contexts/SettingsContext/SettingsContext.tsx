import React, { ReactNode, useContext, useMemo } from 'react';

type StorageSettings = boolean | {
  name: string;
}

type LibOptions = {
  wrapCls?: string
  contentCls?: string,
  shouldStoreInLocalStorage?: StorageSettings,
};

type Props = { children: ReactNode; options: LibOptions };

const DEFAULT_OPTIONS: LibOptions = {
  wrapCls: undefined,
  contentCls: undefined,
  shouldStoreInLocalStorage: false,
};

const SettingsContext = React.createContext({ options: DEFAULT_OPTIONS });

const SettingsProvider = ({ children, options }: Props) => {
  const value = useMemo(() => ({ options }), [options]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, LibOptions, useSettings };
