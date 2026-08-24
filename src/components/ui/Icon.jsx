import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon = ({
  name,
  size = 'lg',
  className,
  strokeWidth = 2,
  ...props
}) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react.`);
    return null;
  }

  const actualSize = typeof size === 'string' ? sizeMap[size] || 24 : size;

  return (
    <LucideIcon
      size={actualSize}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
};

export default Icon;
