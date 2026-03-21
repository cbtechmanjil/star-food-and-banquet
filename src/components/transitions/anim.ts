export const expand = {
  initial: {
    top: 0,
  },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const opacity = {
  initial: {
    opacity: 0.5,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.5,
  },
};

export const pageTitle = {
  initial: {
    opacity: 1,
    y: 0,
  },
  enter: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.35,
      delay: 0.15,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.05,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};
