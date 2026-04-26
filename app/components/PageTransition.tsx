'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { Variants } from 'framer-motion'

const ease = [0.33, 1, 0.68, 1] as const

const variants: Variants = {
  initial:  { opacity: 0, y: 18 },
  enter:    { opacity: 1, y: 0,  transition: { duration: 0.45, ease } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.3,  ease } },
}

const reducedVariants: Variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.1 } },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={reduce ? reducedVariants : variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
