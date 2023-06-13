import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { motion, useAnimation } from 'framer-motion'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import { Project } from '../types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IconFilter from '../svg/icons/Filter'
import IconClear from '../svg/icons/Clear'
import CategoriesIcons from '../components/CategoriesIcons'
import { useInView } from 'react-intersection-observer'

export default function ProjectsPage() {
  const { t, ready, i18n } = useTranslation()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions, reloadElementDimensions, handleDimensionsCapture] =
    useElementDimensions()
  const headerSize = useElementSize('header')

  const [category, setCategory] = useState(0)

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
    hidden: { opacity: 0, y: 30, transition: { duration: 1, delay: 0.2 } }
  }

  function setInfo(value: number) {
    handleDimensionsCapture(true)
    controls.start('hidden')

    setTimeout(() => {
      setCategory(value !== category ? value : 0)
    }, 1200)
  }

  function setPage(link: string) {
    return `/${i18n.language}/projects/${link}`
  }

  if (!ready) return <Loading />

  const project = t('project', { returnObjects: true }) as Project

  useEffect(() => {
    inView ? controls.start('visible') : controls.start('hidden')
    handleDimensionsCapture(false)
    reloadElementDimensions()
  }, [controls, inView, category])

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
        <h1 className="pb-10 text-center text-4xl font-bold lg:text-6xl">{project.title}</h1>

        <div className="grid grid-cols-1 items-center justify-center space-y-5">
          <div className="group invisible hidden items-center justify-center justify-self-start pl-[10%] lg:visible lg:flex">
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
                  onClick={() => setInfo(0)}
                  className="mr-10 hidden h-full items-center justify-center rounded-sm px-5 hover:bg-brand-blue-columbia/70 group-hover:flex group-hover:animate-tooltip_show"
                >
                  <IconClear className="mr-3" />
                  {project['clear-button']}
                </button>
              )}

              {project.categories.map((categ, index) => (
                <button
                  key={index}
                  onClick={() => setInfo(categ.id)}
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

          <div className="group visible flex w-[80%] flex-col items-center justify-center justify-self-center lg:invisible lg:hidden">
            <div className="grid w-full grid-cols-2 items-center justify-center gap-3 bg-brand-blue-columbia/20">
              <div className="flex items-center justify-center">
                <IconFilter />
                {project['filter-button']}
              </div>

              {category !== 0 && (
                <button
                  onClick={() => setInfo(0)}
                  className="mr-10 flex h-full items-center justify-center rounded-sm px-5 hover:bg-brand-blue-columbia/70"
                >
                  <IconClear className="mr-3" />
                  {project['clear-button']}
                </button>
              )}
            </div>
            <div className="grid w-full grid-cols-2 items-center justify-center gap-3 bg-brand-blue-columbia/20">
              {project.categories.map((categ, index) => (
                <button
                  key={index}
                  onClick={() => setInfo(categ.id)}
                  className={clsx(
                    'flex h-full items-center justify-center gap-3 space-x-10 rounded-sm px-5 hover:bg-brand-blue-columbia/70',
                    category === categ.id && 'bg-brand-blue-columbia/20'
                  )}
                >
                  <div dangerouslySetInnerHTML={{ __html: categ.icon }} />
                  {categ.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            ref={ref}
            animate={controls}
            variants={variants}
            initial="hidden"
            className="flex max-w-[80%] flex-col items-center space-y-10 justify-self-center"
          >
            {project.projects.map(
              (proj, index) =>
                (category === 0 || proj.category.includes(category)) && (
                  <div
                    key={index}
                    className="grid border-collapse grid-cols-2 grid-rows-2 items-center border-b border-t border-slate-light-1 p-3 lg:grid-cols-3 lg:grid-rows-1"
                  >
                    <div className="flex items-center justify-center space-x-5">
                      <h2 className="text-xl font-semibold">{proj.name}</h2>
                      <CategoriesIcons
                        className="invisible hidden lg:visible lg:grid"
                        categories={proj.category}
                      />
                    </div>

                    <CategoriesIcons
                      className="visible grid justify-self-center lg:invisible lg:hidden"
                      categories={proj.category}
                    />
                    <p className="justify-self-center text-sm lg:text-base">{proj.description}</p>

                    <div className="flex flex-col items-center justify-center space-y-3 justify-self-center lg:flex-row lg:space-y-0 lg:space-x-5">
                      {proj['external-address'] && (
                        <Link
                          className="flex h-12 items-center justify-center rounded-sm px-3 transition-all hover:bg-brand-blue-columbia/20"
                          to={proj['external-address']}
                          replace
                        >
                          {project['external-button']}
                        </Link>
                      )}
                      {proj.link && (
                        <Link
                          className="flex h-12 items-center justify-center rounded-sm px-3 transition-all hover:bg-brand-blue-columbia/20"
                          to={setPage(String(proj.id))}
                          replace
                        >
                          {project['link-button']}
                        </Link>
                      )}
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
