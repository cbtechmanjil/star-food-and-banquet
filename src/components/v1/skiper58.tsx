import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Skiper58 – A collection of text animation components.
 *
 * TextRoll: On hover the text rolls upward – the visible text slides out
 * to the top while a cloned copy slides in from the bottom.
 */

interface TextRollProps {
  children: React.ReactNode;
  className?: string;
  /** If true, text-align is centred */
  center?: boolean;
  /** Duration of the roll animation in seconds (default 0.3) */
  duration?: number;
}

const TextRoll: React.FC<TextRollProps> = ({
  children,
  className,
  center = false,
  duration = 0.3,
}) => {
  return (
    <motion.span
      initial="idle"
      whileHover="hover"
      className={cn(
        "inline-flex overflow-hidden relative cursor-pointer",
        center && "justify-center",
        className
      )}
      style={{ lineHeight: "1.2em", height: "1.2em" }}
    >
      {/* Primary text – slides up and out */}
      <motion.span
        className="inline-block"
        variants={{
          idle: { y: 0 },
          hover: { y: "-100%" },
        }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>

      {/* Clone – slides up from below */}
      <motion.span
        className="inline-block absolute left-0"
        aria-hidden
        variants={{
          idle: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

/**
 * Skiper58 is a namespace wrapper that re-exports all text animation
 * primitives for convenience. Currently contains TextRoll.
 */
const Skiper58 = { TextRoll };

export { Skiper58, TextRoll };
