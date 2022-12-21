import { Container } from 'inversify'
import 'reflect-metadata'
import BoardData from '../database/board-data-access'
import IBoardRepository from '../../domain/repository/IBoardRepository'
import BoardService from '../../services/board-services'
import SnakeData from '../database/snake-data-access'
import SnakeService from '../../services/snake-services'
import IBoardService from '../../domain/repository/IBoardService'
import ISnakeController from '../../Presentation/Api/Controllers/ISnakecontroller'
import SnakeControllers from '../../Presentation/Api/Controllers/snakecontroller'
import IBoardController from '../../Presentation/Api/Controllers/IBoardController'
import BoardController from '../../Presentation/Api/Controllers/boardController'
import ISnakeService from '../../domain/repository/ISnakeService'
import ISnakeRepository from '../../domain/repository/ISnakeRepository'
import BoxData from '../database/box-data-access'
import IBoxRepository from '../../domain/repository/IBoxRepository'
import IBoxController from '../../Presentation/Api/Controllers/IBoxController'
import BoxController from '../../Presentation/Api/Controllers/boxController'
import IBoxService from '../../domain/repository/IBoxService'
import BoxService from '../../services/box-service'
import IGameController from '../../Presentation/Api/Controllers/IGameController'
import GameController from '../../Presentation/Api/Controllers/gameController'
import IGameRepository from '../../domain/repository/IGameRepository'
import GameData from '../database/game-data-access'
import IGameService from '../../domain/repository/IGameService'
import GameService from '../../services/game-services'

const container = new Container()

container.bind<IBoardRepository>('BoardData').to(BoardData)
container.bind<IBoardService>('BoardService').to(BoardService)
container.bind<IBoardController>('BoardController').to(BoardController)

container.bind<ISnakeRepository>('SnakeData').to(SnakeData)
container.bind<ISnakeService>('SnakeService').to(SnakeService)
container.bind<ISnakeController>('ControllerSnake').to(SnakeControllers)

container.bind<IBoxRepository>('BoxDataAcess').to(BoxData)
container.bind<IBoxService>('BoxService').to(BoxService)
container.bind<IBoxController>('BoxController').to(BoxController)

container.bind<IGameRepository>('GameData').to(GameData)
container.bind<IGameService>('GameService').to(GameService)
container.bind<IGameController>('GameController').to(GameController)
export { container }
