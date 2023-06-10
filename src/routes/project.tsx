import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FullProject } from '../types'
import IconAnnex from '../svg/icons/Annex'

export default function ProjectPage() {
  const { t, ready, i18n } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const [project, setProject] = useState<FullProject | undefined>()

  if (!ready) return <Loading />

  const projects = t('project.projects', { returnObjects: true }) as FullProject[]

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === Number(id))
    foundProject ? setProject(foundProject) : navigate(`/${i18n.language}/`, { replace: true })
  }, [id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.8 } }}
      exit={{ opacity: 0.5, y: 20, transition: { duration: 0.4 } }}
    >
      <div
        ref={elementRef}
        className={clsx(
          'flex w-full flex-col items-center justify-center space-y-5 overflow-hidden bg-slate-dark-1 text-slate-light-1 transition-all',
          height >= elementDimensions.height + headerSize.height ? 'h-screen' : 'h-full'
        )}
        style={{
          paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
        }}
      >
        {project && (
          <>
            <h1 className="pb-10 text-center text-4xl font-bold lg:text-6xl">{project.name}</h1>

            <div className="flex max-w-[80%] items-center justify-center">
              <p>{project.description}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
