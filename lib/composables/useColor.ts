import { ref } from "vue"

import { getAverageColorOfImage } from "../utils/imageProcessing"
import { kebabCase } from "@sil/case"
import { getTrueLightness, toRGB } from "@sil/color"

const cache = ref<Record<string, string>>({}) // Fix: Removed extra "colors" wrapper

export const useColor = () => {


  const getTextColor = (color: string) => {
    const lightness = getTrueLightness(toRGB(color))
    if (lightness > 50) {
      return "var(--color-dark)"
    } else {
      return "var(--color-light)"
    }
  }

  const getAverageColor = async (source: string | HTMLImageElement): Promise<{
    color: string,
    text: string
  }> => {
    const key = typeof source === "string" ? kebabCase(source) : kebabCase(source.src)

    if (Object.prototype.hasOwnProperty.call(cache.value, key)) {
      return {
        color: cache.value[key],
        text: getTextColor(cache.value[key]),
      }
    }

    const currentColor = await getAverageColorOfImage(source)
    cache.value[key] = currentColor
    return {
      color: currentColor,
      text: getTextColor(currentColor),
    }
  }

  return {getAverageColor}
}
