import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';

export const AccordionItemContent = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId } = props;

  return (
    <p {...attributes} className="text-white px-5 py-4">
      {children}
    </p>
  );
};
