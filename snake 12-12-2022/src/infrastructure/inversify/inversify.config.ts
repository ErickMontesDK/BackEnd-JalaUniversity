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
import boardService from '../../domain/repository/boardService'
import snakeService from '../../domain/repository/snakeService'
import ISnakeController from '../../controllers/serviceControllers/ISnakecontroller'
import SnakeControllers from '../../controllers/serviceControllers/snakecontroller'

const container = new Container()

container.bind<BoardRepository>('BoardData').to(BoardData)
container.bind<positionRepository>('PositionData').to(PositionData)
container.bind<boardService>('BoardService').to(BoardService)
container.bind<positionRepository>('PositionService').to(PositionService)
container.bind<snakeRepository>('SnakeData').to(SnakeData)
container.bind<snakeService>('SnakeService').to(SnakeService)
container.bind<BoardRepository>('BoaddrdData').to(BoardData)
container.bind<ISnakeController>('ControllerSnake').to(SnakeControllers)
export { container }
