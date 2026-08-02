import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  icon: string
}

export function usePageMeta({ title, description, icon }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descriptionTag = document.querySelector('meta[name="description"]')
    const prevDescription = descriptionTag?.getAttribute('content')
    descriptionTag?.setAttribute('content', description)

    const iconTag = document.querySelector('link[rel="icon"]')
    const prevIcon = iconTag?.getAttribute('href')
    iconTag?.setAttribute('href', icon)

    return () => {
      document.title = prevTitle
      if (prevDescription != null) {
        descriptionTag?.setAttribute('content', prevDescription)
      }
      if (prevIcon != null) {
        iconTag?.setAttribute('href', prevIcon)
      }
    }
  }, [title, description, icon])
}
