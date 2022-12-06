import React, { useContext, useMemo } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const ScrollContext = React.createContext({ enableScroll: () => {}, disableScroll: () => {} });

const ScrollProvider = ({ children, scrollElementSelector }) => {
  const getTargetElement = () => document.querySelector(scrollElementSelector) || document.body;

  const disableScroll = () => disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true });
  const enableScroll = () => enableBodyScroll(getTargetElement());

  const value = useMemo(() => ({ enableScroll, disableScroll }), [scrollElementSelector]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

const useScrollContext = () => useContext(ScrollContext);

export { ScrollProvider, useScrollContext };
