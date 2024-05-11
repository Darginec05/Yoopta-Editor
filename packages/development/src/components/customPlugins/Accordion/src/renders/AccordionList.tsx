import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect } from 'react';

export const AccordionList = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId } = props;

  return (
    <ul {...attributes} className="p-0 m-0 my-2">
      {children}
    </ul>
  );
};
