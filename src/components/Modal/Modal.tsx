import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import s from './Modal.module.scss';

type ModalProps = {
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  withPortal?: boolean;
};

const Modal = ({ onClose, style, className = 'yopta-portal', withPortal = true, children }: ModalProps) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    if (!withPortal) return;

    container.classList.add(className);
    const yoptaEditorSelector = document.querySelector('#yopta-editor');

    yoptaEditorSelector?.appendChild(container);
    return () => {
      yoptaEditorSelector?.removeChild(container);
    };
  }, [className, withPortal]);

  const node = (
    <div role="presentation" data-overlay="true" className={cx(s.modalWrap)} onClick={onClose}>
      <div className={s.modalFake} />
      <div className={s.modalContent} style={style} onClick={(e) => e.stopPropagation()} aria-hidden>
        {children}
      </div>
    </div>
  );

  return withPortal ? createPortal(node, container) : node;
};

export { Modal };
