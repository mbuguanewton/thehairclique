import { cva } from "class-variance-authority";
import React, { createElement, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const textVariants = cva("tracking-normal font-sans", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      error: "text-destructive",
      success: "text-green-600",
      warning: "text-amber-600",
      "brand-primary": "text-primary",
      "brand-secondary": "text-accent",
      "brand-light": "text-background",
    },
    as: {
      p: "text-base font-light leading-relaxed",
      span: "text-base font-light",
      pre: "text-sm font-normal font-mono whitespace-pre-wrap px-4 py-2 bg-muted rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    as: "p",
  },
});

type TextProps = {
  as?: "p" | "span" | "pre";
  variant?:
    | "default"
    | "muted"
    | "error"
    | "success"
    | "warning"
    | "brand-primary"
    | "brand-secondary"
    | "brand-light";
} & React.HTMLProps<HTMLParagraphElement>;

function Text(props: TextProps, ref: React.Ref<HTMLParagraphElement>) {
  const { as = "p", variant, className, children, ...rest } = props;
  return createElement(
    as,
    {
      ref,
      className: cn(textVariants({ variant, as }), className),
      ...rest,
    },
    children,
  );
}

export default forwardRef(Text);
