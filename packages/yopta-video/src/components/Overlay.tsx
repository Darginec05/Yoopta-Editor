import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from './Overlay.module.scss';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

const Overlay = ({ children, onClose }: Props) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    container.className = 'yopta-overlay';

    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(
    <div className={s.overlay}>
      <div className={s.fakeOverlay} />
      <div className={s.content}>
        <div className={s.fakeContent} onClick={onClose} />
        <div className={s.body} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    container,
  );
};

export { Overlay };
