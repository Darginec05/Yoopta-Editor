import { createContext, FC, ReactNode, useContext } from "react";

const ToolbarContext = createContext();

type Props = {
  children: ReactNode;
}

export const ToolbarProvider: FC<Props> = ({ children }) => {
  return (
    <ToolbarContext.Provider value={{  }}>
      {children}
    </ToolbarContext.Provider>
  )
}

export const useToolbar = () => useContext(ToolbarContext);