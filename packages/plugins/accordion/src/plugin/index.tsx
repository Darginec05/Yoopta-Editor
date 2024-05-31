import { Blocks, Elements, YooptaPlugin } from '@yoopta/editor';
import { AccordionElementKeys, AccordionListItemProps } from '../types';
import { AccordionList } from '../renders/AccordionList';
import { AccordionListItem } from '../renders/AccordionListItem';
import { AccordionItemHeading } from '../renders/AccordionItemHeading';
import { AccordionItemContent } from '../renders/AccordionItemContent';
import { Path, Transforms } from 'slate';
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

          const listItems = Elements.getElementChildren(editor, currentBlock.id, { type: 'accordion-list' });
          const accordionListItemEntry = Elements.getElementEntry(editor, currentBlock.id, {
            path: slate.selection,
            type: 'accordion-list-item',
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

          const currentElement = Elements.getElement(editor, currentBlock.id);
          const listItemEntry = Elements.getElementEntry(editor, currentBlock.id, { type: 'accordion-list-item' });

          if (currentElement?.type === ACCORDION_ELEMENTS.AccordionListItemHeading && listItemEntry) {
            const [listItem, listItemPath] = listItemEntry;

            Elements.updateElement(
              editor,
              currentBlock.id,
              {
                type: ACCORDION_ELEMENTS.AccordionListItem,
                props: {
                  isExpanded: !listItem?.props.isExpanded,
                },
              },
              { path: listItemPath },
            );

            return;
          }

          Elements.createElement(
            editor,
            currentBlock.id,
            { type: 'accordion-list-item', props: { isExpanded: true } },
            { path: 'next', focus: true, split: false },
          );
        }

        // if (hotkeys.isArrowDown(event)) {
        //   const listItemEntry = Elements.getElementEntry(editor, currentBlock.id, 'accordion-list-item');

        //   if (listItemEntry) {
        //     const [, listItemPath] = listItemEntry;
        //     const nextListItemEntry = Elements.getElementEntry(editor, currentBlock.id, 'accordion-list-item', {
        //       atPath: Path.next(listItemPath),
        //     });

        //     if (nextListItemEntry) {
        //       event.preventDefault();
        //       const [, nextListItemPath] = nextListItemEntry;
        //       // [0, 1, 0, 0] - path to next heading leaf
        //       const headingPath = nextListItemPath.concat(0).concat(0);
        //       console.log('headingPath', headingPath);
        //       console.log('nextListItemPath', nextListItemPath);

        //       Transforms.select(slate, { path: headingPath, offset: 0 });
        //       return;
        //     }
        //   }
        // }

        // if (hotkeys.isArrowUp(event)) {
        //   const listItemEntry = Elements.getElementEntry(editor, currentBlock.id, 'accordion-list-item');

        //   if (listItemEntry) {
        //     const [, listItemPath] = listItemEntry;

        //     if (!Path.hasPrevious(listItemPath)) return;
        //     const prevListItemEntry = Elements.getElementEntry(editor, currentBlock.id, 'accordion-list-item', {
        //       atPath: Path.previous(listItemPath),
        //     });

        //     if (prevListItemEntry) {
        //       event.preventDefault();
        //       const [, prevListItemPath] = prevListItemEntry;
        //       // [0, current - 1, 0, 0] - path to prev heading leaf
        //       const headingPath = prevListItemPath.concat(0).concat(0);

        //       Transforms.select(slate, { path: headingPath, offset: 0 });
        //       return;
        //     }
        //   }
        // }
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
