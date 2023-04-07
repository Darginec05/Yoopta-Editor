import { YoptaPlugin, YoptaPluginType } from '@yopta/editor';
import { CSSProperties, MouseEvent, ReactNode } from 'react';

export type ActionMenuComponentItem = {
  plugin: YoptaPlugin;
  icon?: ReactNode;
  label?: string;
  searchString?: string;
};

export type ActionMenuRenderItem = Omit<YoptaPluginType, 'childPlugin' | 'isChild'> &
  Omit<ActionMenuComponentItem, 'plugin'>;

export type ActionMenuRenderRootProps = {
  role: string;
  'aria-modal': boolean;
  ref: any;
  style: CSSProperties;
};

export type ActionMenuRenderListProps = {
  ref: any;
};

export type ActionMenuRenderItemProps = {
  onMouseDown: (e: MouseEvent) => void;
  index: number;
  focusableElement: number;
  menuItem: ActionMenuRenderItem;
};

export type ActionRenderItemProps = {
  items: ActionMenuRenderItem[];
  getRootProps: () => ActionMenuRenderRootProps;
  getListProps: () => ActionMenuRenderListProps;
  getItemsProps: (menuItem: ActionMenuRenderItem, index: number) => ActionMenuRenderItemProps;
};
