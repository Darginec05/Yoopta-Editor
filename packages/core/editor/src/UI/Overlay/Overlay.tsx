import { FloatingOverlay } from '@floating-ui/react';
import { MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  lockScroll?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
};

const Overlay = ({ className, onClick, children, lockScroll = true }: Props) => {
  return (
    <FloatingOverlay lockScroll={lockScroll} className={className} onClick={onClick}>
      {children}
    </FloatingOverlay>
  );
};

export { Overlay };
