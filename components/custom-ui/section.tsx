import { PropsWithChildren } from "react";

import Container from "@/components/custom-ui/container";

const Section = ({ children }: PropsWithChildren) => {
  return (
    <section className="py-12">
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
