import { Blocks, Elements, YooptaPlugin } from '@yoopta/editor';
import { AccordionElementKeys, AccordionListItemProps } from '../types';
import { AccordionList } from '../renders/AccordionList';
import { AccordionListItem } from '../renders/AccordionListItem';
import { AccordionItemHeading } from '../renders/AccordionItemHeading';
import { AccordionItemContent } from '../renders/AccordionItemContent';
import { Transforms } from 'slate';
import { ListCollapse } from 'lucide-react';

const ACCORDION_ELEMENTS = {
  AccordionList: 'accordion-list',
  AccordionListItem: 'accordion-list-item',
  AccordionListItemHeading: 'accordion-list-item-heading',
  AccordionListItemContent: 'accordion-list-item-content',
};

const Accordion = new YooptaPlugin<AccordionElementKeys, AccordionListItemProps>({
  type: 'Accordion',
  elements: {
    'accordion-list': {
      asRoot: true,
      render: AccordionList,
      children: ['accordion-list-item'],
    },
    'accordion-list-item': {
      render: AccordionListItem,
      children: ['accordion-list-item-heading', 'accordion-list-item-content'],
      props: { isExpanded: true },
    },
    'accordion-list-item-heading': {
      render: AccordionItemHeading,
    },
    'accordion-list-item-content': {
      render: AccordionItemContent,
    },
  },
  events: {
    onKeyDown(editor, slate, { hotkeys, currentBlock }) {
      return (event) => {
        if (hotkeys.isBackspace(event)) {
          if (!slate.selection) return;

          const listItems = Elements.getElementChildren(editor, currentBlock.id, 'accordion-list');

          const accordionListItemEntry = Elements.getElementEntry(editor, currentBlock.id, 'accordion-list-item', {
            atPath: slate.selection,
          });

          const childPath = accordionListItemEntry?.[1] || slate.selection.anchor.path;
          const currentElement = Elements.getElement(editor, currentBlock.id);

          const isHeadingEmpty = Elements.isElementEmpty(editor, currentBlock.id, {
            type: 'accordion-list-item-heading',
            path: childPath,
          });

          const isContentEmpty = Elements.isElementEmpty(editor, currentBlock.id, {
            type: 'accordion-list-item-content',
            path: childPath,
          });

          console.log('listItems', listItems);

          if (isContentEmpty && currentElement?.type === ACCORDION_ELEMENTS.AccordionListItemContent) {
            event.preventDefault();
            return;
          }

          if (isHeadingEmpty && currentElement?.type === ACCORDION_ELEMENTS.AccordionListItemHeading) {
            event.preventDefault();

            if (listItems?.length === 1) {
              Blocks.deleteBlock(editor, { blockId: currentBlock.id });
              return;
            }

            if (accordionListItemEntry) {
              const [, listItemPath] = accordionListItemEntry;

              Elements.deleteElement(editor, currentBlock.id, {
                type: 'accordion-list-item',
                path: listItemPath,
              });
            }
          }
        }

        if (hotkeys.isSelect(event)) {
          event.preventDefault();

          if (slate.selection) {
            Transforms.select(slate, slate.selection.anchor.path.slice(0, -1));
          }

          return;
        }

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Elements.createElement(
            editor,
            currentBlock.id,
            'accordion-list-item',
            { isExpanded: true },
            { at: 'next', focus: true, split: false },
          );
        }
      };
    },
  },
  options: {
    display: {
      title: 'Accordion',
      description: 'Create collapses',
      icon: <ListCollapse size={24} />,
    },
  },
});

export { Accordion };
