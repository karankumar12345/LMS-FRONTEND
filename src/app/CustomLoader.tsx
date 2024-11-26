"use client";

import { useLoadUserQuery } from "../../redux/features/apislice";
import Loading from "./Loading";

const CustomLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, error } = useLoadUserQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  return <>{children}</>;
};

export default CustomLoader;
