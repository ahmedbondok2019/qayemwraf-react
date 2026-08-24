import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base Interactive States (Hover, Focus, Pressed, Disabled)
  // Incorporates the Medical Design Language specifications
  "group inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground border border-transparent hover:bg-primary-hover hover:-translate-y-[1px] hover:shadow-raised",
        secondary: "bg-surface text-primary border border-primary hover:bg-primary-light hover:-translate-y-[1px]",
        ghost: "bg-transparent text-text hover:bg-surface-2 hover:text-primary",
        danger: "bg-danger text-white border border-transparent hover:opacity-90 hover:-translate-y-[1px] hover:shadow-raised focus-visible:ring-danger",
      },
      size: {
        // Core Medical Size: Height 48px, Padding 28px horizontally
        default: "h-12 px-7 rounded-[14px] text-base font-semibold",
        sm: "h-10 px-5 rounded-[12px] text-sm font-medium",
        lg: "h-14 px-8 rounded-[16px] text-lg font-semibold",
        icon: "h-12 w-12 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant || "primary"}
      data-size={size || "default"}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
