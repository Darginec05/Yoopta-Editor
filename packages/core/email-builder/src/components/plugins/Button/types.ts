import { SlateElement } from '@yoopta/editor';

export type ButtonElementVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

export type ButtonElementProps = {
  href: string;
  color: string;
  backgroundColor: string;
  variant: ButtonElementVariant;
};

export type ButtonElement = SlateElement<'button', ButtonElementProps>;

export type ButtonPluginMap = {
  button: ButtonElement;
};
