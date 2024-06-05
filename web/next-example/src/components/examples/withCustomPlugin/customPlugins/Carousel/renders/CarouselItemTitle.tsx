import { PluginElementRenderProps } from '@yoopta/editor';

const CarouselItemTitle = (props: PluginElementRenderProps) => {
  return (
    <h4 {...props.attributes} className="w-full font-semibold leading-none tracking-tight my-[8px]">
      {props.children}
    </h4>
  );
};

export { CarouselItemTitle };
