import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';

export const AccordionItemContent = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId } = props;

  return (
    <p {...attributes} className="yoo-accordion-text-white yoo-accordion-px-5 yoo-accordion-py-4">
      {children}
    </p>
  );
};
