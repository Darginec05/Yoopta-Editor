import { ReactNode } from 'react';

export type UltraPluginProps = {
  id: string;
  value: any[];
  onChange: (id: string, value: any[]) => void;
  renderElement?: (props) => ReactNode;
};

export type UltraPlugin = {
  type: string;
  render: (props: UltraPluginProps) => ReactNode;
};
