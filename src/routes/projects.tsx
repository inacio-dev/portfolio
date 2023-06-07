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
import IconFilter from '../svg/icons/Filter'
import IconClear from '../svg/icons/Clear'
import IconDeveloper from '../svg/icons/Developer'
import IconEngineer from '../svg/icons/Engineer'
import IconDesign from '../svg/icons/Design'
import IconMarketing from '../svg/icons/Marketing'

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
          <div className="group flex items-center justify-center justify-self-start pl-[10%]">
            <motion.div
              whileHover={{
                width: 820,
                transition: { duration: 0.2 }
              }}
              className="group flex h-12 w-20 items-center justify-center rounded-sm text-slate-light-1 transition-all hover:bg-brand-blue-columbia/20"
            >
              <div className="flex items-center justify-center group-hover:hidden">
                <IconFilter />
                {project['filter-button']}
              </div>

              {category !== 0 && (
                <button
                  onClick={() => setCategory(0)}
                  className="mr-10 hidden h-full items-center justify-center rounded-sm px-5 hover:bg-brand-blue-columbia/70 group-hover:flex group-hover:animate-tooltip_show"
                >
                  <IconClear className="mr-3" />
                  {project['clear-button']}
                </button>
              )}

              {project.categories.map((categ, index) => (
                <button
                  key={index}
                  onClick={() => setCategory(categ.id)}
                  className={clsx(
                    'hidden h-full items-center justify-center space-x-10 rounded-sm px-5 hover:bg-brand-blue-columbia/70 group-hover:flex group-hover:animate-tooltip_show',
                    category === categ.id && 'bg-brand-blue-columbia/20'
                  )}
                >
                  <div className="pr-3" dangerouslySetInnerHTML={{ __html: categ.icon }} />
                  {categ.name}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="flex max-w-[80%] flex-col items-center space-y-10 justify-self-center">
            {project.projects.map(
              (proj, index) =>
                (category === 0 || proj.category.includes(category)) && (
                  <div
                    key={index}
                    className="grid border-collapse grid-cols-3 items-center border-b border-t border-slate-light-1 p-3"
                  >
                    <div className="flex items-center justify-center space-x-5">
                      <h2 className="text-xl font-semibold">{proj.name}</h2>
                      <div className="grid grid-cols-2 items-center justify-center gap-2">
                        <IconDeveloper
                          className={clsx(
                            proj.category.includes(1) ? 'fill-slate-light-1' : 'fill-slate-dark-5'
                          )}
                        />
                        <IconEngineer
                          className={clsx(
                            proj.category.includes(2) ? 'fill-slate-light-1' : 'fill-slate-dark-5'
                          )}
                        />
                        <IconDesign
                          className={clsx(
                            proj.category.includes(3) ? 'fill-slate-light-1' : 'fill-slate-dark-5'
                          )}
                        />
                        <IconMarketing
                          className={clsx(
                            proj.category.includes(4) ? 'fill-slate-light-1' : 'fill-slate-dark-5'
                          )}
                        />
                      </div>
                    </div>

                    <p className="justify-self-center">{proj.description}</p>
                    <div className="flex items-center justify-center space-x-5 justify-self-center">
                      {proj['external-address'] && (
                        <Link
                          to={proj['external-address']}
                          replace
                          className="transition-all hover:scale-125"
                        >
                          {project['external-button']}
                        </Link>
                      )}
                      {proj.link && (
                        <Link to={proj.link} replace className="transition-all hover:scale-125">
                          {project['link-button']}
                        </Link>
                      )}
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
