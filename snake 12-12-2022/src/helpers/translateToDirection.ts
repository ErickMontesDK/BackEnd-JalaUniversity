import { direction } from '../domain/types/types'

export default function translateToDirection (direction: string): direction {
  const directions:direction[] = ['down', 'up', 'left', 'right']
  // eslint-disable-next-line eqeqeq
  const fixedDirectionType:direction = directions.filter(option => option == direction)[0]
  return fixedDirectionType
}
