import { useEffect, useRef, ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const OutsideClick: FC<Props> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);

  return <div contentEditable={false} ref={ref}>{children}</div>;
};

export { OutsideClick };
