import { cva } from "class-variance-authority";
import React, { createElement } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-sans tracking-tight", {
  variants: {
    type: {
      h1: "text-3xl md:text-5xl font-extralight tracking-tighter",
      h2: "text-2xl md:text-4xl font-extralight tracking-tighter",
      h3: "text-xl md:text-3xl font-extralight tracking-tighter",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-medium",
      h6: "text-base font-normal",
      hero: "text-4xl md:text-[4rem] font-extralight tracking-[-0.04em] leading-[0.85]",
    },
  },
  defaultVariants: {
    type: "h1",
  },
});

type HeadingProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "hero";
} & React.HTMLProps<HTMLHeadingElement>;

function Heading({ type = "h1", className, ...props }: HeadingProps) {
  const Tag = type === "hero" ? "h1" : type;
  return createElement(Tag, {
    className: cn(headingVariants({ type, className })),
    ...props,
  });
}

export default Heading;
