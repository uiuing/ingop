import { screen } from 'electron'

type AutoScreenSize = {
  width: number
  height: number
}

/**
 * @description Auto resize window to fit content
 * @returns {AutoScreen}
 */
export function autoScreenSize(): AutoScreenSize {
  const auto: AutoScreenSize = { width: 800, height: 500 }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  if (width <= 800 || height <= 500) {
    auto.width = Math.floor(width * 0.625)
    auto.height = Math.floor(auto.width * 0.625)
  }
  return auto
}
