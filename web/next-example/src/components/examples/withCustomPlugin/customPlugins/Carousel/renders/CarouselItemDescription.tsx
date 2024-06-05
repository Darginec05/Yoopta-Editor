import { PluginElementRenderProps } from '@yoopta/editor';

const CarouselItemDescription = (props: PluginElementRenderProps) => {
  return (
    <p {...props.attributes} className="w-full text-sm text-muted-foreground mb-[6px]">
      {props.children}
    </p>
  );
};

export { CarouselItemDescription };
