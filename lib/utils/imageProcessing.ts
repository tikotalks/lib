import { getLightness, toRGB } from "@sil/color";

export const getAverageColorOfImage = async (source: string | HTMLImageElement): Promise<string> => {
  const processImage = async (sourceImg: HTMLImageElement) => {
    // Create a new image with crossOrigin set
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    await new Promise(resolve => {
      img.onload = resolve
      // If source is already an element, use its src
      img.src = sourceImg instanceof HTMLImageElement ? sourceImg.src : sourceImg
    })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const data = ctx.getImageData(0, 0, img.width, img.height).data
    const rgb = [0, 0, 0]
    for (let i = 0; i < data.length; i += 4) {
      rgb[0] += data[i]
      rgb[1] += data[i + 1]
      rgb[2] += data[i + 2]
    }
    const numPixels = data.length / 4
    rgb[0] = Math.round(rgb[0] / numPixels)
    rgb[1] = Math.round(rgb[1] / numPixels)
    rgb[2] = Math.round(rgb[2] / numPixels)

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  if (typeof source === 'string') {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    await new Promise(resolve => {
      img.onload = resolve
      img.src = source
    })
    return processImage(img)
  }

  console.log('its not a string', source.width, source.height)
  return processImage(source)
}

export const getContrastColor = (color: string, c?: { dark: string, light: string }) => {

  const config = {
    dark: 'black',
    light: 'white',
    ...c
  }


  const lightness = getLightness(toRGB(color));

  if (lightness > 50) {
    return config.dark;
  } else {
    return config.light;
  }

}

export const createCroppedImage = async (src: string, aspectRatio: number): Promise<string> => {
  const img = new Image()
  img.crossOrigin = "anonymous"

  await new Promise(resolve => {
    img.onload = resolve
    img.src = src
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Calculate dimensions to crop the image
  const imgAspectRatio = img.width / img.height
  let cropWidth = img.width
  let cropHeight = img.height
  let offsetX = 0
  let offsetY = 0

  if (imgAspectRatio > aspectRatio) {
    // Image is wider than target ratio - crop width
    cropWidth = img.height * aspectRatio
    offsetX = (img.width - cropWidth) / 2
  } else {
    // Image is taller than target ratio - crop height
    cropHeight = img.width / aspectRatio
    offsetY = (img.height - cropHeight) / 2
  }

  canvas.width = cropWidth
  canvas.height = cropHeight

  // Draw cropped portion of the image
  ctx.drawImage(
    img,
    offsetX, offsetY,
    cropWidth, cropHeight,
    0, 0,
    cropWidth, cropHeight
  )

  return canvas.toDataURL('image/jpeg', 0.95)
}
