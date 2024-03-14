import { SlateElement } from '@yoopta/editor';

export type CalloutPluginElementKeys = 'callout';

export type CalloutType = 'default' | 'success' | 'warning' | 'error' | 'nostyles';
export type CalloutElementProps = { type: CalloutType };
export type CalloutElement = SlateElement<'callout', CalloutElementProps>;
