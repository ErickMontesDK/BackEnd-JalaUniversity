import { Container } from 'inversify'
import 'reflect-metadata'
import BoardData from '../database/board-data-access'
import BoardRepository from '../../domain/repository/boardRepository'
import positionRepository from '../../domain/repository/positionRepository'
import PositionData from '../database/position-data-access'
import BoardService from '../../services/board-services'
import PositionService from '../../services/position-services.ts'
import snakeRepository from '../../domain/repository/snakeRepository'
import SnakeData from '../database/snake-data-access'
import SnakeService from '../../services/snake-services'

const container = new Container()

container.bind<BoardRepository>('BoardData').to(BoardData)
container.bind<positionRepository>('PositionData').to(PositionData)

container.bind<BoardRepository>('BoardService').to(BoardService)
container.bind<positionRepository>('PositionService').to(PositionService)

container.bind<snakeRepository>('SnakeData').to(SnakeData)
container.bind<snakeRepository>('SnakeService').to(SnakeService)
export { container }
