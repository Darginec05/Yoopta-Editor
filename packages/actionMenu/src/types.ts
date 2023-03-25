import { YoptaComponent, YoptaComponentType } from '@yopta/editor';
import { ReactNode } from 'react';

export type ActionMenuComponentItem = {
  component: YoptaComponent;
  icon?: ReactNode;
  label?: string;
  searchString?: string;
};

export type ActionMenuRenderItem = Omit<YoptaComponentType, 'childComponent' | 'isChild'> &
  Omit<ActionMenuComponentItem, 'component'>;

export type ActionRenderItemProps = { items: ActionMenuRenderItem[]; rootProps: any; listProps: any; itemProps: any };
