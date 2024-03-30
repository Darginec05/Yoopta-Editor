import { YooEditor, YooptaBlock } from '@yoopta/editor';
import { ReactElement, ReactNode } from 'react';

export type ActionMenuRenderProps = {
  actions: ActionMenuToolItem[] | string[];
  editor: YooEditor;
  onMouseEnter?: (e: React.MouseEvent) => void;
  selectedAction: ActionMenuToolItem;
  onClose: () => void;
  empty: boolean;
  mode?: 'toggle' | 'create';
  view?: 'small' | 'default';
};

export type ActionMenuToolItem = {
  type: string;
  title: string;
  description?: string;
  icon?: string | ReactNode | ReactElement;
};

export type ActionMenuToolProps = {
  trigger?: string;
  actions?: YooptaBlock[];
  render?: (props: any) => JSX.Element;
  items?: ActionMenuToolItem[];
};
