import { PluginElementRenderProps } from '@yoopta/editor';

// https://ui.shadcn.com/docs/components/typography#p
export function TypographyP(props: PluginElementRenderProps) {
  return (
    <p className="leading-7 mt-6" {...props.attributes}>
      {props.children}
    </p>
  );
}
