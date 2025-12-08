'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Close } from '@ui/Icons';
import styles from '@styles/modal.module.css';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className={styles.portalOverlay} onMouseDown={handleOverlayClick}>
      <div className={styles.portalContentContainer} ref={modalRef}>
        <div className={styles.closeButtonWrapper}>
          <button className={styles.closeButton} onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
