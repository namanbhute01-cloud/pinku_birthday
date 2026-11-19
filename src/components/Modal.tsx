import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cx } from "../utils/cx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  align?: "center" | "right";
  closeLabel?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible base dialog: portal, focus trap, Escape to close, scroll lock and
 * focus restoration. Used by the contents drawer, the lightbox and letters.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  ariaLabel,
  children,
  className,
  align = "center",
  closeLabel = "Close",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target =
        panel.querySelector<HTMLElement>("[data-autofocus]") ??
        panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
        panel;
      target.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className={cx("modal-overlay", `modal-overlay--${align}`)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className={cx("modal-panel", align === "right" && "modal-panel--drawer", className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={ariaLabel}
            tabIndex={-1}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : align === "right"
                  ? { x: "100%" }
                  : { opacity: 0, y: 18, scale: 0.985 }
            }
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : align === "right"
                  ? { x: "100%" }
                  : { opacity: 0, y: 12, scale: 0.99 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <X size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
            <div className="modal-scroll">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
