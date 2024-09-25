import { PluginElementRenderProps } from '@yoopta/editor';

// https://ui.shadcn.com/docs/components/typography
export function Table(props: PluginElementRenderProps) {
  return (
    <p className="leading-7 mt-6" {...props.attributes}>
      {props.children}
    </p>
  );
}

export function TableRow(props: PluginElementRenderProps) {
  return (
    <p className="leading-7 mt-6" {...props.attributes}>
      {props.children}
    </p>
  );
}

export function TableDataCell(props: PluginElementRenderProps) {
  return (
    <p className="leading-7 mt-6" {...props.attributes}>
      {props.children}
    </p>
  );
}
