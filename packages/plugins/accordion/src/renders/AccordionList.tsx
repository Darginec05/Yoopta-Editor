import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect } from 'react';
import { ReactEditor } from 'slate-react';

export const AccordionList = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId } = props;

  return (
    <ul {...attributes} className="yoopta-accordion-list">
      {children}
    </ul>
  );
};
