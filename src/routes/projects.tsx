import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import { Project } from '../types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import IconLink from '../svg/icons/IconLink'
import IconFilter from '../svg/icons/IconFilter'

export default function ProjectsPage() {
  const { t, ready } = useTranslation()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')

  const [category, setCategory] = useState(0)

  if (!ready) return <Loading />

  const project = t('project', { returnObjects: true }) as Project

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
          height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
        )}
        style={{
          paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
        }}
      >
        <h1 className="pb-10 text-center text-4xl font-bold lg:text-6xl">{project.title}</h1>

        <div className="grid grid-cols-1 items-center justify-center space-y-5">
          <button className="group flex items-center justify-center justify-self-start pl-[10%]">
            <IconFilter />
            {project['filter-button']}
          </button>

          <div className="flex max-w-[80%] flex-col items-center space-y-10 justify-self-center">
            {project.projects.map(
              (proj, index) =>
                (category === 0 || proj.category === category) && (
                  <div
                    key={index}
                    className="grid border-collapse grid-cols-3 items-center border-b border-t border-slate-light-1 p-3"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <h2 className="text-xl font-semibold">{proj.name}</h2>
                    </div>

                    <p className="justify-self-center">{proj.description}</p>
                    <div className="flex items-center justify-center space-x-5 justify-self-center">
                      {proj.link && (
                        <Link to={proj.link} replace className="transition-all hover:scale-125">
                          <IconLink className="w-8" />
                        </Link>
                      )}
                      <Link to="" replace className="transition-all hover:scale-125">
                        {project['link-button']}
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
