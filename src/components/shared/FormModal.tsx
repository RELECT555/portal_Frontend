import React, { useCallback } from 'react';
import { CloseRounded } from '@mui/icons-material';
import styles from './SharedPage.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  submitIcon?: React.ReactNode;
  maxWidth?: number;
  className?: string;
}

export const FormModal: React.FC<Props> = React.memo(
  ({
    open,
    onClose,
    icon,
    title,
    subtitle,
    children,
    footer,
    submitLabel,
    cancelLabel = 'Отмена',
    onSubmit,
    submitDisabled,
    submitIcon,
    maxWidth,
    className,
  }) => {
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
      },
      [onClose],
    );

    if (!open) return null;

    const panelStyle = maxWidth ? { maxWidth } : undefined;

    return (
      <div className={`${styles.modalOverlay} ${className ?? ''}`} onClick={handleOverlayClick}>
        <div className={styles.modalPanel} style={panelStyle}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderLeft}>
              <div className={styles.modalHeaderIcon}>{icon}</div>
              <div>
                <p className={styles.modalTitle}>{title}</p>
                {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
              </div>
            </div>
            <button
              type="button"
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Закрыть"
            >
              <CloseRounded sx={{ fontSize: 18 }} />
            </button>
          </div>

          <div className={styles.modalBody}>{children}</div>

          {footer ??
            (onSubmit && (
              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={onClose}>
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  className={styles.modalSubmitBtn}
                  onClick={onSubmit}
                  disabled={submitDisabled}
                >
                  {submitLabel}
                  {submitIcon}
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  },
);
