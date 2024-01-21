import { createContext } from 'react';

const ChangeValueContext = createContext(() => {});
const PluginsValueContext = createContext({});

const Provider = ({ children }) => {
  return (
    <PluginsValueContext.Provider value={{}}>
      <ChangeValueContext.Provider value={() => {}}>{children}</ChangeValueContext.Provider>
    </PluginsValueContext.Provider>
  );
};
