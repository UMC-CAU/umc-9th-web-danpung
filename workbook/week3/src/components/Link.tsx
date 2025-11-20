//@ts-ignore
import { MouseEvent, ReactNode } from "react";

type LinkProps = {
  to: string;
  children: ReactNode;
};

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname === to) return;

    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  );
};
