import React, { ReactNode, useContext, useMemo } from 'react';

type MediaResponse = { url: string; options?: any };

type NodeActions = {
  onCopy?: (_elementId: string) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};

type MediaProps = {
  imageProps?: {
    onChange: (_s: File) => Promise<MediaResponse>;
    optimistic?: boolean;
    loader?: ReactNode;
    accept?: string | undefined;
    multiple?: boolean;
  };
  videoProps?: {
    onChange: (_s: File) => Promise<MediaResponse>;
    optimistic?: boolean;
    loader?: ReactNode;
    accept?: string | undefined;
    multiple?: boolean;
  };
};

type LibOptions = {
  wrapCls?: string;
  contentCls?: string;
  shouldStoreInLocalStorage?: boolean | { name: string };
  autoFocus?: boolean;
  placeholder?: string;
  media?: MediaProps;
  nodeSettings?: NodeActions;
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
