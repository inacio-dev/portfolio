import { motion, AnimatePresence } from 'framer-motion'

type AnimatedPageProps = {
  children: React.ReactNode
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
  const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={animations}>
      {children}
    </motion.div>
  )
}
