import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    size: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold",
      h6: "text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    size: "h6",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ size, className, ...props }, ref) => {
    const Tag: keyof JSX.IntrinsicElements = size || "h6";

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ size, className }))}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";

export { headingVariants, Heading };
