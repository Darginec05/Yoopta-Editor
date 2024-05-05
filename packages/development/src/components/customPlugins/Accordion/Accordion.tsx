import { generateId, SlateElement, YooptaBlockData } from '@yoopta/editor';

// CREATE
const useBlockEventEmitter = () => {};

const ACCORDION_VALUE: SlateElement[] = [
  {
    id: generateId(),
    type: 'accordion-list',
    children: [
      {
        id: generateId(),
        type: 'accordion-list-item',
        props: {
          isExpanded: false,
        },
        children: [
          { id: generateId(), type: 'accordion-list-item-heading', children: [{ text: 'Title 1' }] },
          {
            id: generateId(),
            type: 'accordion-list-item-content',
            children: [
              {
                text: `This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.`,
              },
            ],
          },
        ],
      },
      {
        id: generateId(),
        type: 'accordion-list-item',
        props: {
          isExpanded: false,
        },
        children: [
          { id: generateId(), type: 'accordion-list-item-heading', children: [{ text: 'Title one' }] },
          {
            id: generateId(),
            type: 'accordion-list-item-content',
            children: [
              {
                text: `This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.`,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ACCORDION_BLOCK: YooptaBlockData = {
  id: generateId(),
  type: 'Accordion',
  meta: { order: 0, depth: 0 },
  value: ACCORDION_VALUE,
};

/**
// WRITE about this
* - document
 * - block
 * - inline 
 * - text
 */
