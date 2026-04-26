'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  initial:  { opacity: 0, y: 18 },
  enter:    { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.3,  ease: [0.33, 1, 0.68, 1] } },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
