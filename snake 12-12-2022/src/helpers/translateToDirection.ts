import { direction } from '../domain/types/types'

export default function translateToDirection (direction: string) {
  const directionsOptions:direction[] = ['down', 'up', 'left', 'right']

  switch (direction) {
    case 'down':
      return directionsOptions[0]
    case 'up':
      return directionsOptions[1]
    case 'left':
      return directionsOptions[2]
    case 'right':
      return directionsOptions[3]
    default:
      return undefined
  }
}
