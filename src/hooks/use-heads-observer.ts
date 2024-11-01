import { useEffect, useState, useRef } from 'react'

export function useHeadsObserver(path: string) {
  // Define the type for observer
  const observer = useRef<IntersectionObserver | null>(null)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const firstHeading = document.querySelector<HTMLHeadingElement>(
      'h1, h2, h3, h4, h5, h6'
    )
    if (firstHeading) setActiveId(firstHeading.id)

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0% 0% -80% 0px',
    })

    // Query for the elements and ensure they are of the correct type
    const elements = document.querySelectorAll<HTMLHeadingElement>('h2, h3, h4')
    elements.forEach((elem) => observer.current?.observe(elem))

    return () => observer.current?.disconnect()
  }, [path])

  return { activeId }
}
