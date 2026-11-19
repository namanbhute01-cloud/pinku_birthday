import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../utils/cx";

interface EnvelopeProps {
  recipient: string;
  nickname?: string;
  stampLabel?: string;
  sealInitial?: string;
  actionLabel: string;
  open: boolean;
  onOpen: () => void;
  className?: string;
}

/**
 * The shared wax-sealed envelope used by the invitation and the finale.
 * The seal is a real button; opening is a controlled state change so pages can
 * also handle focus and reveal their own letter panels.
 */
export function Envelope({
  recipient,
  nickname,
  stampLabel = "20",
  sealInitial = "P",
  actionLabel,
  open,
  onOpen,
  className,
}: EnvelopeProps) {
  const reduceMotion = useReducedMotion();
  const flapTransition = { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 0.61, 0.36, 1] as const };
  const cardTransition = { duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <div className={cx("envelope", open && "is-open", className)}>
      <div className="envelope__shadow" aria-hidden="true" />
      <motion.div
        className="envelope__flap"
        aria-hidden="true"
        initial={false}
        animate={{ rotateX: open ? -176 : 0 }}
        transition={flapTransition}
      />
      <div className="envelope__back" aria-hidden="true" />
      <motion.div
        className="envelope__card"
        aria-hidden="true"
        initial={false}
        animate={{ y: open ? "-34%" : "5%", opacity: open ? 1 : 0.55 }}
        transition={cardTransition}
      >
        <span className="envelope__card-mark">P</span>
        <span className="envelope__card-rule" />
        <span className="envelope__card-rule envelope__card-rule--short" />
      </motion.div>
      <div className="envelope__front">
        <span className="envelope__commission">PRIVATE CORRESPONDENCE</span>
        <span className="envelope__stamp" aria-hidden="true">
          <span className="envelope__stamp-inner">
            <span className="envelope__stamp-number">{stampLabel}</span>
            <span className="envelope__stamp-caption">TWENTY</span>
          </span>
        </span>
        <span className="envelope__address">
          <span className="envelope__to">TO</span>
          <span className="envelope__name">{recipient}</span>
          {nickname ? <span className="envelope__nickname">“{nickname}”</span> : null}
        </span>
        <span className="envelope__postmark" aria-hidden="true">
          <span>THE BIRTHDAY</span>
          <span>ARCHIVE</span>
        </span>
        <span className="envelope__front-flap" aria-hidden="true" />
        <span className="envelope__front-seam" aria-hidden="true" />
      </div>

      {!open ? (
        <motion.button
          type="button"
          className="wax-seal envelope__seal"
          onClick={onOpen}
          aria-label={actionLabel}
          initial={false}
          animate={{ scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.045, rotate: 2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        >
          <span className="wax-seal__ring" aria-hidden="true" />
          <span className="wax-seal__initial" aria-hidden="true">
            {sealInitial}
          </span>
          <span className="wax-seal__dot" aria-hidden="true" />
        </motion.button>
      ) : null}
    </div>
  );
}
