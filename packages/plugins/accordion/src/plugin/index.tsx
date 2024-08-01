import {
  Blocks,
  Elements,
  YooptaPlugin,
  SlateEditor,
  generateId,
  buildBlockElementsStructure,
  SlateElement,
} from '@yoopta/editor';
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

          const listItems = Elements.getElementChildren(editor, currentBlock.id, { type: 'accordion-list' });
          const accordionListItemEntry = Elements.getElementEntry(editor, currentBlock.id, {
            path: slate.selection,
            type: 'accordion-list-item',
          });

          const listItemChildPath = accordionListItemEntry?.[1] || slate.selection.anchor.path;
          const currentElement = Elements.getElement(editor, currentBlock.id);

          const isHeadingEmpty = Elements.isElementEmpty(editor, currentBlock.id, {
            type: 'accordion-list-item-heading',
            path: listItemChildPath,
          });

          const isContentEmpty = Elements.isElementEmpty(editor, currentBlock.id, {
            type: 'accordion-list-item-content',
            path: listItemChildPath,
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
      };
    },
  },
  options: {
    display: {
      title: 'Accordion',
      description: 'Create collapses',
      icon: <ListCollapse size={24} />,
    },
    shortcuts: ['accordion'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['DETAILS'],
        parse: (el, editor) => {
          if (el.nodeName === 'DETAILS') {
            const summary = el.querySelector('summary');
            const p = el.querySelector('p');
            const elementsStructure = buildBlockElementsStructure(editor, 'Accordion', {
              [ACCORDION_ELEMENTS.AccordionListItemHeading]: summary?.textContent || '',
              [ACCORDION_ELEMENTS.AccordionListItemContent]: p?.textContent || '',
            });

            return elementsStructure;
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<div>${element.children
          .map((listItem) => {
            return `<details data-meta-align="${align}" data-meta-depth="${depth}">${listItem.children
              .map((item) => {
                if (item.type === 'accordion-list-item-heading') {
                  return `<summary>${item.children.map((item) => item.text).join('')}</summary>`;
                }
                return `<p>${item.children.map((item) => item.text).join('')}</p>`;
              })
              .join('')}</details>`;
          })
          .join('')}</div>`;
      },
    },
  },
});

export { Accordion };
