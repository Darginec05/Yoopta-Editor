import React, { ReactNode, useContext, useMemo } from 'react';
import { Accept } from 'react-dropzone';

type MediaResponse = { url: string; options?: any };

type MediaProps = {
  imageProps?: {
    onChange: (_s: File) => Promise<MediaResponse>;
    optimistic?: boolean;
    loader?: ReactNode;
    accept?: Accept | undefined;
    multiple?: boolean;
  };
  videoProps?: {
    onChange: (_s: File) => Promise<MediaResponse>;
    optimistic?: boolean;
    loader?: ReactNode;
    accept?: Accept | undefined;
    multiple?: boolean;
  };
};

type LibOptions = {
  wrapCls?: string;
  contentCls?: string;
  shouldStoreInLocalStorage?: boolean | { name: string };
  media?: MediaProps;
};

type Props = { children: ReactNode; options: LibOptions };

const DEFAULT_OPTIONS: LibOptions = {
  wrapCls: undefined,
  contentCls: undefined,
  shouldStoreInLocalStorage: false,
  media: undefined,
};

const SettingsContext = React.createContext({ options: DEFAULT_OPTIONS });

const SettingsProvider = ({ children, options }: Props) => {
  const value = useMemo(() => ({ options }), [options]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, LibOptions, useSettings };
