import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect } from 'react';

export const AccordionList = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId } = props;

  return (
    <ul {...attributes} className="yoo-accordion-p-0 yoo-accordion-m-0 yoo-accordion-my-2">
      {children}
    </ul>
  );
};
