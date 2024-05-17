import { YooptaPlugin } from '@yoopta/editor';
import { AccordionElementKeys, AccordionListItemProps } from '../types';
import { AccordionList } from '../renders/AccordionList';
import { AccordionListItem } from '../renders/AccordionListItem';
import { AccordionItemHeading } from '../renders/AccordionItemHeading';
import { AccordionItemContent } from '../renders/AccordionItemContent';
import { Editor, Transforms } from 'slate';

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
            const headingElementEntry = editor.blocks.Accordion.getElementEntry(
              currentBlock.id,
              'accordion-list-item-heading',
              { atPath: slate.selection },
            );

            console.log('headingElementEntry', headingElementEntry);

            const string = Editor.string(slate, slate.selection);
            console.log('string', string);
            if (string.trim().length === 0) {
              event.preventDefault();
              console.log('slate.selection.anchor.path', slate.selection.anchor.path);
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
            { at: 'next', focus: true, split: true },
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
