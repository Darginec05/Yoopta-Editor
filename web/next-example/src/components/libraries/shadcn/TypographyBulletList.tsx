import { PluginElementRenderProps } from '@yoopta/editor';

export const TypographyBulletList = (props: PluginElementRenderProps) => {
  return (
    <div className="my-6 ml-6 list-disc [&>li]:mt-2" {...props.attributes}>
      {props.children}
    </div>
  );
};
