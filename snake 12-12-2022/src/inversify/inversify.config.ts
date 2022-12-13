import { Container } from 'inversify'
import 'reflect-metadata'
import BoardData from '../database/board-data-access'
import BoardRepository from '../repository/boardRepository'
import positionRepository from '../repository/positionRepository'
import PositionData from '../database/position-data-access'
import BoardService from '../services/board-services'
import PositionService from '../services/position-services.ts'

const container = new Container()

container.bind<BoardRepository>('BoardData').to(BoardData)
container.bind<positionRepository>('PositionData').to(PositionData)

container.bind<BoardRepository>('BoardService').to(BoardService)
container.bind<positionRepository>('PositionService').to(PositionService)

export { container }
