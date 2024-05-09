import { YooptaPlugin } from '@yoopta/editor';
import { AccordionElementKeys, AccordionListItemProps } from '../types';
import { AccordionList } from '../renders/AccordionList';
import { AccordionItem } from '../renders/AccordionItem';
import { AccordionItemHeading } from '../renders/AccordionItemHeading';
import { AccordionItemContent } from '../renders/AccordionItemContent';
import { Editor } from 'slate';

const Accordion = new YooptaPlugin<AccordionElementKeys, AccordionListItemProps>({
  type: 'Accordion',
  elements: {
    'accordion-list': {
      asRoot: true,
      render: AccordionList,
      children: ['accordion-list-item'],
    },
    'accordion-list-item': {
      render: AccordionItem,
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
          event.preventDefault();

          const element = editor.blocks.Accordion.getElement(currentBlock.id, 'accordion-list-item');
          console.log('element', element);

          const string = Editor.string(slate, slate.selection);
          console.log('string', string);
        }

        if (hotkeys.isSelect(event)) {
          event.preventDefault();
        }

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          editor.blocks.Accordion.createElement(
            currentBlock.id,
            'accordion-list-item',
            { isExpanded: true },
            { at: 'next', focus: true },
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
