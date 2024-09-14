import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import {
  AccordionListElement,
  AccordionItemElement,
  AccordionListItemProps,
  AccordionListItemHeadingElement,
  AccordionListItemContentElement,
} from '../types';

type AccordionElementOptions = {
  items?: number;
  props: AccordionListItemProps;
};

type InsertAccordionOptions = AccordionElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type AccordionCommands = {
  buildAccordionElements: (editor: YooEditor, options?: Partial<AccordionElementOptions>) => AccordionListElement;
  insertAccordion: (editor: YooEditor, options?: Partial<InsertAccordionOptions>) => void;
  deleteAccordion: (editor: YooEditor, blockId: string) => void;
};

export const AccordionCommands: AccordionCommands = {
  buildAccordionElements: (editor: YooEditor, options = {}) => {
    // take props from block.elements
    const { props = { isExpanded: false }, items = 1 } = options;

    console.log('buildAccordionElements', props, items);

    const accordionList: AccordionListElement = { id: generateId(), type: 'accordion-list', children: [] };

    for (let i = 0; i < items; i++) {
      const headingListItem: AccordionListItemHeadingElement = {
        id: generateId(),
        type: 'accordion-list-item-heading',
        children: [{ text: `` }],
      };

      const contentListItem: AccordionListItemContentElement = {
        id: generateId(),
        type: 'accordion-list-item-content',
        children: [{ text: `` }],
      };

      const accordionListItem: AccordionItemElement = {
        id: generateId(),
        type: 'accordion-list-item',
        children: [headingListItem, contentListItem],
        props,
      };

      accordionList.children.push(accordionListItem);
    }

    return accordionList;
  },
  insertAccordion: (editor: YooEditor, options = {}) => {
    const { at, focus, props, items } = options;
    const accordionList = AccordionCommands.buildAccordionElements(editor, { props, items });
    Blocks.insertBlock(editor, buildBlockData({ value: [accordionList], type: 'Accordion' }), { focus, at });
  },
  deleteAccordion: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
