import React, { ReactNode } from "react";
import { store } from "../../redux/store";
import { Provider as ReduxProvider } from "react-redux"; // Rename to avoid conflict

interface Props {
  children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default AppProvider;
