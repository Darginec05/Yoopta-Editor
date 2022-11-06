import { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

type ModalProps = {
  onClose?: () => void;
  handlerRef?: any;
  children: ReactNode;
  className?: string;
};

const Modal = ({ onClose, handlerRef, className = 'portal', children }: ModalProps) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    container.classList.add(className);
    const yoptaEditorSelector = document.querySelector('#yopta-editor');

    yoptaEditorSelector?.appendChild(container);
    return () => {
      yoptaEditorSelector?.removeChild(container);
    };
  }, [className]);

  const contentPosition = useMemo<CSSProperties>(() => {
    if (!handlerRef?.current) return {};

    const handlerRect = handlerRef.current.getBoundingClientRect();

    return {
      left: handlerRect.left + handlerRect.width + 10,
      top: handlerRect.top,
    };
  }, [handlerRef]);

  const node = (
    <div role="presentation" data-overlay="true" className={s.modalWrap} onClick={onClose}>
      <div className={s.modalFake} />
      <div className={s.modalContent} style={contentPosition} onClick={(e) => e.stopPropagation()} aria-hidden>
        {children}
      </div>
    </div>
  );

  return createPortal(node, container);
};

export { Modal };
