import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { opacity, expand, pageTitle } from "./anim";
import { titleEmitter } from "./titleEmitter";

interface PageTransitionLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PageTransitionLayout({ children, title }: PageTransitionLayoutProps) {
  const [displayTitle, setDisplayTitle] = useState(title);

  useEffect(() => {
    setDisplayTitle(title);
    
    // Listen to global title changes so even exiting components
    // update their title immediately to the destination page's title
    const handleTitleChange = (e: any) => {
      setDisplayTitle(e.detail);
    };

    titleEmitter.addEventListener("titleChange", handleTitleChange);
    return () => {
      titleEmitter.removeEventListener("titleChange", handleTitleChange);
    };
  }, [title]);

  const anim = (variants: any, custom: number | null = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <div className="page stairs">
      <motion.div {...anim(opacity)} className="transition-background" />

      {/* Page title shown during transition */}
      {displayTitle && (
        <div className="transition-page-title-wrapper">
          <motion.div {...anim(pageTitle)} className="transition-page-title">
            <span className="transition-page-title-text">{displayTitle}</span>
          </motion.div>
        </div>
      )}

      <div className="transition-container">
        {[...Array(nbOfColumns)].map((_, i) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>
      {children}
    </div>
  );
}
