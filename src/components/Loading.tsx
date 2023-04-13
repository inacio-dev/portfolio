import Logo from '../svg/Logo'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface LoadingProps {
  message?: string
}

export default function Loading({ message }: LoadingProps) {
  const { t, ready } = useTranslation()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-[0%] bg-slate-dark-1 transition-all lg:space-y-[15%]">
      <motion.div
        className="absolute top-[40%] lg:top-auto lg:flex"
        animate={{ scale: [1, 2, 2, 1, 1] }}
        transition={{ ease: 'easeOut', duration: 2, delay: 0.2, repeat: Infinity }}
      >
        <Logo />
      </motion.div>

      <p className="absolute top-[60%] flex text-center font-bold text-slate-light-1 lg:relative lg:top-[0%]">
        {message && ready ? message : t('loading')}
      </p>
    </div>
  )
}
