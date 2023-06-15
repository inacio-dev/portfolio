import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FullProject } from '../types'
import ContentPage from '../components/ContentPage'

export default function ProjectPage() {
  const { t, ready, i18n } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState<FullProject | undefined>()

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === Number(id))
    foundProject ? setProject(foundProject) : navigate(`/${i18n.language}/`, { replace: true })
  }, [id])

  if (!ready) return <Loading />

  const projects = t('project.projects', { returnObjects: true }) as FullProject[]

  return (
    <ContentPage>
      {project && (
        <>
          <button onClick={() => navigate(`/${i18n.language}/projects`)}>
            {project['back-button']}
          </button>

          <h1 className="pb-10 text-center text-4xl font-bold lg:text-6xl">{project.name}</h1>

          <div className="flex max-w-[80%] items-center justify-center">
            <p>{project.description}</p>
          </div>

          <div className="flex max-w-[80%] flex-col items-center justify-center space-y-10">
            {project.content.informations.map((info, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-5">
                <p>{info.text}</p>

                <div className="grid grid-cols-3 items-center justify-center">
                  {project.content.gifs.map((gif, gifIndex) => {
                    if (gif.text === info.id) {
                      return <img key={gifIndex} src={gif.link} alt="GIF" />
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </ContentPage>
  )
}
