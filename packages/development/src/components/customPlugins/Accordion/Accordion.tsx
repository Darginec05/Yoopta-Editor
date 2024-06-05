import { generateId, SlateElement, YooptaBlockData } from '@yoopta/editor';

const ACCORDION_VALUE: SlateElement[] = [
  {
    id: generateId(),
    type: 'accordion-list',
    children: [
      {
        id: generateId(),
        type: 'accordion-list-item',
        props: {
          isExpanded: true,
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
          { id: generateId(), type: 'accordion-list-item-heading', children: [{ text: 'Title 2' }] },
          {
            id: generateId(),
            type: 'accordion-list-item-content',
            children: [
              {
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum, lorem eu ultrices blandit, nunc magna dapibus nunc, non ultricies mauris ante ac arcu. Aliquam varius eu nisi et elementum. Suspendisse non tortor ut enim feugiat feugiat. Nulla vestibulum bibendum enim ut sagittis. Donec arcu sem, auctor eu elementum vitae, dignissim ut sem. Integer eros erat, dignissim a ornare eget, pulvinar vel nisi. Duis sit amet sapien in turpis tincidunt pretium eget vel metus. Morbi vitae ipsum eros. Proin et mattis enim. In sodales mauris neque, in eleifend massa mattis eget. Nullam posuere sollicitudin hendrerit. Aenean sed risus quis ligula faucibus ultrices a non purus. Nullam ac lacus quis urna congue lacinia. Etiam vel magna a ligula ornare tincidunt id at nisi.`,
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
