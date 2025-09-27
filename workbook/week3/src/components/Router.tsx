import { useState, useEffect } from "react";

type RouteProps = {
  path: string;
  component: React.ComponentType;
};

export const Router = ({ routes }: { routes: RouteProps[] }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const Current = routes.find((route) => route.path === currentPath)?.component;
  return Current ? <Current /> : <h1>404 Not Found</h1>;
};
