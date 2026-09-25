// Shared motion tokens so entrances, reveals and panel transitions feel
// like one system instead of each component picking its own curve/timing.

// Snappy deceleration — used for anything settling into view (cards, text, hover states).
export const EASE_OUT = [0.22, 1, 0.36, 1]

// Symmetric ease-in-out — used for larger surface moves (wipes, panel slides).
export const EASE_REVEAL = [0.76, 0, 0.24, 1]

export const DURATION = {
  fast: 0.35,
  base: 0.5,
  slow: 0.65,
}

// Per-item delay step for staggered grid/list entrances.
export const STAGGER = 0.06
