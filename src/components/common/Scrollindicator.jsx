import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ScrollIndicator
 * Shows a bouncing down-arrow on the home hero.
 * Fades out once the user scrolls past ~80px.
 * Clicking it smoothly scrolls to the #about section.
 */
export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Scroll to About section"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            bottom: "2.2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            background: "transparent",
            border: "1.5px solid rgba(108,242,194,0.35)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(5,8,20,0.5)",
          }}
        >
          {/* Bouncing chevron */}
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6cf2c2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
