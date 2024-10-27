import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-screen-2xl mx-auto px-4 w-full">{children}</div>;
};

export default Container;
