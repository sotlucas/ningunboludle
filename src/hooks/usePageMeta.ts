import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  icon: string
  url: string
}

function swapMetaContent(selector: string, content: string) {
  const tag = document.querySelector(selector)
  const prevContent = tag?.getAttribute('content')
  tag?.setAttribute('content', content)
  return () => {
    if (prevContent != null) {
      tag?.setAttribute('content', prevContent)
    }
  }
}

export function usePageMeta({ title, description, icon, url }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descriptionTag = document.querySelector('meta[name="description"]')
    const prevDescription = descriptionTag?.getAttribute('content')
    descriptionTag?.setAttribute('content', description)

    const iconTag = document.querySelector('link[rel="icon"]')
    const prevIcon = iconTag?.getAttribute('href')
    iconTag?.setAttribute('href', icon)

    const imageUrl = new URL(icon, url).toString()
    const restoreFns = [
      swapMetaContent('meta[property="og:title"]', title),
      swapMetaContent('meta[property="og:description"]', description),
      swapMetaContent('meta[property="og:image"]', imageUrl),
      swapMetaContent('meta[property="og:url"]', url),
      swapMetaContent('meta[name="twitter:title"]', title),
      swapMetaContent('meta[name="twitter:description"]', description),
      swapMetaContent('meta[name="twitter:image"]', imageUrl),
    ]

    return () => {
      document.title = prevTitle
      if (prevDescription != null) {
        descriptionTag?.setAttribute('content', prevDescription)
      }
      if (prevIcon != null) {
        iconTag?.setAttribute('href', prevIcon)
      }
      restoreFns.forEach((restore) => restore())
    }
  }, [title, description, icon, url])
}
