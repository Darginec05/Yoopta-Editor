import { PluginElementRenderProps } from '@yoopta/editor';

// https://ui.shadcn.com/docs/components/typography#blockquote
export function TypographyBlockquote(props: PluginElementRenderProps) {
  return (
    <blockquote className="mt-6 !border-l-2 pl-6 italic" {...props.attributes}>
      {props.children}
    </blockquote>
  );
}
