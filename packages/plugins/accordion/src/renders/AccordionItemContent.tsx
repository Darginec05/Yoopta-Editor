import { findSlateBySelectionPath, PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { useEffect, useState } from 'react';
import { Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { getBlockElement } from '../elements/getElement';
import { getBlockElementEntry } from '../elements/getElementEntry';

export const AccordionItemContent = (props: PluginElementRenderProps) => {
  const { element, attributes, children, blockId, path } = props;
  const editor = useYooptaEditor();

  const nodeEl = getBlockElement(editor, blockId, 'accordion-list-item', { atPath: path.slice(0, 2) });
  const isExpanded = nodeEl?.props?.isExpanded;

  return (
    <p
      {...attributes}
      className="yoopta-accordion-list-item-content"
      style={{ display: isExpanded ? 'block' : 'none' }}
    >
      {children}
    </p>
  );
};
