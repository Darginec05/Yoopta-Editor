import { FC, ReactNode, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';
import { ELEMENT_RENDER_ITEMS } from '../../Elements';
import { ElementHover } from '../../HoveredMenu/HoveredMenu';
import { ELEMENT_TYPES_MAP } from '../constants';

const TYPES_DRAG_IGNORE = [
  ELEMENT_TYPES_MAP['bulleted-list'],
  ELEMENT_TYPES_MAP['numbered-list'],
  ELEMENT_TYPES_MAP.link,
];

type Props = RenderElementProps & {
  attributes: any;
  children: ReactNode;
  element: any;
};

const RenderElement: FC<Props> = ({ element, children, attributes }) => {
  const Component = useMemo(() => ELEMENT_RENDER_ITEMS[element.type], [element.type]);

  if (!Component) return null;

  if (TYPES_DRAG_IGNORE.includes(element.type)) {
    return (
      <Component isEdit attributes={attributes} element={element}>
        {children}
      </Component>
    );
  }

  return (
    <ElementHover element={element} attributes={attributes}>
      <Component isEdit attributes={{}} element={element}>
        {children}
      </Component>
    </ElementHover>
  );
};

export { RenderElement };
