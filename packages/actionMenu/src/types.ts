import { YoptaPlugin, YoptaPluginType } from '@yopta/editor';

export type ActionMenuItem<T extends Record<string, unknown>> = {
  plugin: YoptaPlugin<any, any>;
  searchString?: string;
} & T;

export type ActionMenuRenderItem = Pick<YoptaPluginType, 'type' | 'createElement' | 'defineElement'> &
  Omit<ActionMenuItem<Record<string, unknown>>, 'plugin'>;

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

export type ActionMenuRenderProps = {
  items: ActionMenuRenderItem[];
  isNotFound: boolean;
  groups: Groups;
  plugins: ActionMenuRenderPlugin;
  getRootProps: () => ActionMenuRenderRootProps;
  getItemProps: (type) => ActionMenuRenderItemProps;
};
