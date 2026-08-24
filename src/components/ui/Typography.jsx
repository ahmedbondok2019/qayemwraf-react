import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const typographyVariants = cva("text-text", {
  variants: {
    variant: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      "body-large": "text-body-large",
      body: "text-body",
      small: "text-small",
      caption: "text-caption",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-text",
      muted: "text-text-muted",
      primary: "text-primary",
      danger: "text-danger",
      white: "text-white",
    }
  },
  defaultVariants: {
    variant: "body",
  },
});

export const Typography = ({
  as,
  variant = "body",
  weight,
  align,
  color,
  className,
  children,
  ...props
}) => {
  const Component = as || (
    variant === 'display' || variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    'p'
  );

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, align, color, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
