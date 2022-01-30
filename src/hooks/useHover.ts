import { RefObject, useEffect, useRef, useState } from 'react';

export function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovered];
}
