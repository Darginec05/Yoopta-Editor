import { FloatingOverlay } from '@floating-ui/react';
import { MouseEvent, ReactNode, forwardRef } from 'react';

type Props = {
  children: ReactNode;
  lockScroll?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  style?: React.CSSProperties;
};

const Overlay = forwardRef(({ className, onClick, children, lockScroll = true, ...rest }: Props, ref) => {
  return (
    <FloatingOverlay lockScroll={lockScroll} className={className} onClick={onClick} ref={ref} {...rest}>
      {children}
    </FloatingOverlay>
  );
});

export { Overlay };
