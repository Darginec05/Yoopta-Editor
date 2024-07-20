import { FloatingOverlay } from '@floating-ui/react';
import { MouseEvent, ReactNode, forwardRef } from 'react';

type Props = {
  children: ReactNode;
  lockScroll?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  style?: React.CSSProperties;
};

const Overlay = ({ className, onClick, children, lockScroll = true, ...rest }: Props) => {
  return (
    <FloatingOverlay lockScroll={lockScroll} className={`yoopta-portal ${className}`} onClick={onClick} {...rest}>
      {children}
    </FloatingOverlay>
  );
};

export { Overlay };
