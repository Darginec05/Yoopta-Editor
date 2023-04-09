import { YoptaPlugin, YoptaPluginType } from '@yopta/editor';
import { CSSProperties, MouseEvent, ReactNode } from 'react';

export type ActionMenuComponentItem = {
  plugin: YoptaPlugin<any, any>;
  searchString?: string;
} & Record<string, unknown>;

export type ActionMenuRenderItem = Pick<YoptaPluginType, 'type' | 'createElement' | 'getElement'> &
  Omit<ActionMenuComponentItem, 'plugin'>;

export type ActionMenuRenderRootProps = {
  ref: any;
};

export type ActionMenuRenderItemProps = {
  onClick: () => void;
  'aria-selected': boolean;
  'data-action-menu-item': boolean;
  'data-element-type': string;
};

type ActionMenuRenderPluginMethods = {
  toggle: () => void;
};

export type ActionMenuRenderPlugin = Record<string, { methods: ActionMenuRenderPluginMethods }>;

export type Groups = {
  texts: ActionMenuRenderItem[];
  voids: ActionMenuRenderItem[];
  inlines: ActionMenuRenderItem[];
};

export type ActionRenderItemProps = {
  items: ActionMenuRenderItem[];
  isNotFound: boolean;
  groups: Groups;
  plugins: ActionMenuRenderPlugin;
  getRootProps: () => ActionMenuRenderRootProps;
  getItemProps: (type) => ActionMenuRenderItemProps;
};
