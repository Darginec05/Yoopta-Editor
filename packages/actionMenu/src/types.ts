import { YooptaPlugin, YooptaPluginType } from '@yoopta/editor';

export type ActionMenuItem<T extends Record<string, unknown>> = {
  plugin: YooptaPlugin<any, any>;
  searchString?: string;
} & T;

export type ActionMenuRenderItem = Pick<YooptaPluginType, 'type' | 'createElement' | 'defineElement' | 'options'> &
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
  getRootProps: () => ActionMenuRenderRootProps;
  getItemProps: (type) => ActionMenuRenderItemProps;
  className?: string;
};
