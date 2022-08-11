import { useEffect, useState } from 'react'
import placeholder from '../assets/placeholder.png'

export default function useImageWithPlaceholder(src: string) {
  const [imageSrc, setImageSrc] = useState(placeholder)

  useEffect(() => {
    const actualImage = new Image()
    actualImage.src = src
    actualImage.onload = () => {
      setImageSrc(src)
    }
  }, [src])

  return imageSrc
}
