import { direction } from '../domain/types/types'

export default function translateToDirection (direction: string): direction {
  const directions:direction[] = ['down', 'up', 'left', 'right']
  const firstElement = 0
  // eslint-disable-next-line eqeqeq
  const fixedDirectionType:direction = directions.filter(option => option == direction)[firstElement]
  return fixedDirectionType
}
