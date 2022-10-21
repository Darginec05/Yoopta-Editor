import React, { useContext, useMemo } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const ScrollContext = React.createContext({ enableScroll: () => {}, disableScroll: () => {} });

const ScrollProvider = ({ children }) => {
  const disableScroll = () => {
    disableBodyScroll(document.querySelector('body')!, { reserveScrollBarGap: true });
  };
  const enableScroll = () => enableBodyScroll(document.querySelector('body')!);

  const value = useMemo(() => ({ enableScroll, disableScroll }), []);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

const useScrollContext = () => useContext(ScrollContext);

export { ScrollProvider, useScrollContext };
