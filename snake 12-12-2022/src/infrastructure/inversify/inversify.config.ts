import { Container } from 'inversify'
import 'reflect-metadata'
import IBoardRepository from '../../domain/repository/IBoardRepository'
import BoardService from '../../services/board-services'
import SnakeService from '../../services/snake-services'
import IBoardService from '../../domain/repository/IBoardService'
import ISnakeController from '../../Presentation/Api/Controllers/ISnakecontroller'
import SnakeControllers from '../../Presentation/Api/Controllers/snakecontroller'
import IBoardController from '../../Presentation/Api/Controllers/IBoardController'
import BoardController from '../../Presentation/Api/Controllers/boardController'
import ISnakeService from '../../domain/repository/ISnakeService'
import ISnakeRepository from '../../domain/repository/ISnakeRepository'
import IBoxRepository from '../../domain/repository/IBoxRepository'
import IBoxController from '../../Presentation/Api/Controllers/IBoxController'
import BoxController from '../../Presentation/Api/Controllers/boxController'
import IBoxService from '../../domain/repository/IBoxService'
import BoxService from '../../services/box-service'
import IGameController from '../../Presentation/Api/Controllers/IGameController'
import GameController from '../../Presentation/Api/Controllers/gameController'
import IGameRepository from '../../domain/repository/IGameRepository'
import IGameService from '../../domain/repository/IGameService'
import GameService from '../../services/game-services'
import GameMechanics from '../../services/gameMechanics'
import BoardDataMongo from '../database/mongoDb/board-data-access'
import BoxDataMongo from '../database/mongoDb/box-data-access'
import SnakeDataMongo from '../database/mongoDb/snake-data-access'
import GameDataMongo from '../database/mongoDb/game-data-access'

const container = new Container()

container.bind<IBoardRepository>('BoardData').to(BoardDataMongo)
container.bind<IBoardService>('BoardService').to(BoardService)
container.bind<IBoardController>('BoardController').to(BoardController)

container.bind<ISnakeRepository>('SnakeData').to(SnakeDataMongo)
container.bind<ISnakeService>('SnakeService').to(SnakeService)
container.bind<ISnakeController>('ControllerSnake').to(SnakeControllers)

container.bind<IBoxRepository>('BoxDataAcess').to(BoxDataMongo)
container.bind<IBoxService>('BoxService').to(BoxService)
container.bind<IBoxController>('BoxController').to(BoxController)

container.bind<IGameRepository>('GameData').to(GameDataMongo)
container.bind<IGameService>('GameService').to(GameService)
container.bind<IGameController>('GameController').to(GameController)
container.bind<GameMechanics>('GameMechanics').to(GameMechanics)

export { container }
