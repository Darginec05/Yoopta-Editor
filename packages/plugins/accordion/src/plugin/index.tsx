import { YooptaPlugin } from '@yoopta/editor';
import { AccordionElementKeys, AccordionListItemProps } from '../types';
import { AccordionList } from '../renders/AccordionList';
import { AccordionListItem } from '../renders/AccordionListItem';
import { AccordionItemHeading } from '../renders/AccordionItemHeading';
import { AccordionItemContent } from '../renders/AccordionItemContent';
import { Path, Transforms } from 'slate';

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
      props: { isExpanded: false },
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
          if (slate.selection) {
            const accordionListItemEntry = editor.blocks.Accordion.getElementEntry(
              currentBlock.id,
              'accordion-list-item',
              {
                atPath: slate.selection,
              },
            );

            const childPath = accordionListItemEntry?.[1] || slate.selection.anchor.path;

            const isHeadingEmpty = editor.blocks.Accordion.isElementEmpty(currentBlock.id, {
              type: 'accordion-list-item-heading',
              path: childPath,
            });

            const isContentEmpty = editor.blocks.Accordion.isElementEmpty(currentBlock.id, {
              type: 'accordion-list-item-content',
              path: childPath,
            });

            if (isHeadingEmpty && isContentEmpty) {
              event.preventDefault();
              if (accordionListItemEntry) {
                const [, listItemPath] = accordionListItemEntry;

                editor.blocks.Accordion.deleteElement(currentBlock.id, {
                  type: 'accordion-list-item',
                  path: listItemPath,
                });
              }
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

          editor.blocks.Accordion.createElement(
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
    },
  },
});

export { Accordion };
