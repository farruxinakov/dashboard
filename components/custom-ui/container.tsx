import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto w-full max-w-screen-2xl px-4">{children}</div>;
};

export default Container;
