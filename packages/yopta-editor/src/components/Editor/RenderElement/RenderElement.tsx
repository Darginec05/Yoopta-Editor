import { FC, ReactNode, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';
import { ELEMENT_RENDER_ITEMS } from '../../Elements';
import { ElementHover } from '../../HoveredMenu/HoveredMenu';
import { ELEMENT_TYPES_MAP } from '../constants';

const IGNORE_SETTINGS_ELEMENTS = [
  ELEMENT_TYPES_MAP['bulleted-list'],
  ELEMENT_TYPES_MAP['numbered-list'],
  ELEMENT_TYPES_MAP.link,
];

const NESTED_ELEMENTS = [ELEMENT_TYPES_MAP['list-item']];
const INLINE_ELEMENTS = [ELEMENT_TYPES_MAP.link];
const NESTED_OR_INLINE_ELEMENTS = [ELEMENT_TYPES_MAP['list-item'], ...INLINE_ELEMENTS];

type Props = RenderElementProps & {
  attributes: any;
  children: ReactNode;
  components: any;
  element: any;
};

const RenderElement: FC<Props> = ({ element, children, attributes }) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;

  const hideSettings = IGNORE_SETTINGS_ELEMENTS.includes(element.type);
  const isInlineNode = INLINE_ELEMENTS.includes(element.type);

  if (NESTED_OR_INLINE_ELEMENTS.includes(element.type)) {
    return (
      <Component isEdit attributes={attributes} element={element}>
        <ElementHover
          element={element}
          attributes={attributes}
          hideSettings={hideSettings}
          isInlineNode={isInlineNode}
          isNestedNode={NESTED_ELEMENTS.includes(element.type)}
        >
          {children}
        </ElementHover>
      </Component>
    );
  }

  return (
    <ElementHover element={element} attributes={attributes} hideSettings={hideSettings}>
      <Component isEdit attributes={{}} element={element}>
        {children}
      </Component>
    </ElementHover>
  );
};

export { RenderElement };
