import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => {
  return <main className="flex-[1_0_auto]">{children}</main>;
};

export default Main;
