"use client";

import { useEffect, useState } from "react";
import {  usePathname } from "next/navigation";
import Loading from "./Loading";
import { useLoadUserQuery } from "../../redux/features/apislice";

const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const { isLoading: isUserLoading } = useLoadUserQuery({});

  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChangeStart = () => setIsRouteLoading(true);
    const handleRouteChangeComplete = () => setIsRouteLoading(false);

    // Simulate route change monitoring
    handleRouteChangeStart();
    const timeout = setTimeout(() => handleRouteChangeComplete(), 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (isUserLoading || isRouteLoading) return <Loading />;
  return <>{children}</>;
};

export default RouterWrapper;
