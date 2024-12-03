import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { ButtonElementSize, ButtonElementVariant } from '../plugins/Button/types';

export const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  transition: 'all 0.2s',
  borderWidth: 0,
  '&:focusVisible': {
    outline: 'none',
    ring: '1',
  },
};

export const defaultSizeStyles = {
  ...baseStyles,
  height: '2.25rem',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
};

export const smallSizeStyles = {
  ...baseStyles,
  height: '2rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.75rem',
};

export const largeSizeStyles = {
  ...baseStyles,
  height: '2.5rem',
  padding: '1rem 1.5rem',
  fontSize: '1rem',
};

export const defaultVariantStyles = {
  ...baseStyles,
  backgroundColor: '#3B82F6',
  color: '#fff',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: '#3B82F6',
  },
};

export const destructiveVariantStyles = {
  ...baseStyles,
  backgroundColor: '#EF4444',
  color: '#fff',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: '#EF4444',
  },
};

export const outlineVariantStyles = {
  ...baseStyles,
  border: '1px solid #D1D5DB',
  backgroundColor: '#F9FAFB',
  color: '#111827',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: '#F9FAFB',
    color: '#3B82F6',
  },
};

export const secondaryVariantStyles = {
  ...baseStyles,
  backgroundColor: '#6B7280',
  color: '#fff',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: '#6B7280',
  },
};

export const ghostVariantStyles = {
  ...baseStyles,
  '&:hover': {
    backgroundColor: '#3B82F6',
    color: '#fff',
  },
};

export const VARIANT_STYLES_MAP = {
  default: defaultVariantStyles,
  destructive: destructiveVariantStyles,
  outline: outlineVariantStyles,
  secondary: secondaryVariantStyles,
  ghost: ghostVariantStyles,
};

export const SIZE_STYLES_MAP = {
  default: defaultSizeStyles,
  sm: smallSizeStyles,
  lg: largeSizeStyles,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant: ButtonElementVariant;
  size: ButtonElementSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const variantStyle = VARIANT_STYLES_MAP[variant || 'default'];
    const sizeStyle = SIZE_STYLES_MAP[size || 'default'];
    const style = { ...variantStyle, ...sizeStyle };
    return <Comp style={style} ref={ref} data-variant={variant} data-size={size} {...props} />;
  },
);

Button.displayName = 'Button';

export { Button };
