import { screen } from 'electron'

type AutoScreenSize = {
  width: number
  height: number
}

export function autoScreenSize(): AutoScreenSize {
  const auto: AutoScreenSize = { width: 900, height: 562 }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  if (width <= auto.width || height <= auto.height) {
    auto.width = Math.floor(width * 0.625)
    auto.height = Math.floor(auto.width * 0.625)
  }
  return auto
}
