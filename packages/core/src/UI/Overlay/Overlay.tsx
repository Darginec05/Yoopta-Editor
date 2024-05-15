import { FloatingOverlay } from '@floating-ui/react';
import { MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  lockScroll?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
};

const Overlay = (props: Props) => {
  return (
    <FloatingOverlay lockScroll className={props.className} onClick={props.onClick}>
      {props.children}
    </FloatingOverlay>
  );
};

export { Overlay };
