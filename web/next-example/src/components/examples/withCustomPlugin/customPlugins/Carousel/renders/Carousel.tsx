import { Carousel as CarouselRoot, CarouselContent, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Elements, PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { PlusCircle } from 'lucide-react';

const Carousel = ({ children, element, blockId, attributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  
  const onAddCarouselItem = () => {
    Elements.createElement(editor, blockId, { type: 'carousel-item' }, { path: 'next', focus: true, split: false });
  };

  return (
    <CarouselRoot {...attributes}>
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious contentEditable={false} />
      <CarouselNext contentEditable={false} />
      <button type="button" onClick={onAddCarouselItem}>
        <PlusCircle />
      </button>
    </CarouselRoot>
  );
};

export { Carousel };
