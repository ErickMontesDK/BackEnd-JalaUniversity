import { direction } from '../domain/types/types'

export default function translateToDirection (direction: string) {
  const directionsOptions:direction[] = ['down', 'up', 'left', 'right']

  for (let i = 0; i < directionsOptions.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (directionsOptions[i] == direction) {
      return directionsOptions[i]
    } else if (i === directionsOptions.length - 1) {
      return undefined
    }
  }
}
