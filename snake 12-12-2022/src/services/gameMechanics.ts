import Snake from '../domain/entities/snake'
import BoxService from './box-service'
import GameService from './game-services'
import SnakeService from './snake-services'
import Box from '../domain/entities/box'

export default class GameMechanics {
  static async returnAllSnakesInfo (idSnakes:string[]):Promise<Snake[]> {
    const snakeService = new SnakeService()
    const Snakes: Snake[] = []

    for (let i = 0; i < idSnakes.length; i++) {
      const snake = await snakeService.read(parseInt(idSnakes[i]))
      Snakes.push(snake)
    }
    return Snakes
  }

  static async eatingFood (allSnakes:Snake[], food: Box, idGame:number): Promise<void> {
    const boxServices = new BoxService()
    const snakeServices = new SnakeService()
    const gameServices = new GameService()

    const foodCoords = [food.coordX, food.coordY]

    for (let i = 0; i < allSnakes.length; i++) {
      const snakeCoords = [allSnakes[i].coordX, allSnakes[i].coordY]

      if (snakeCoords[0] === foodCoords[0] && snakeCoords[1] === foodCoords[1]) {
        const snakeTailNodes = allSnakes[i].tailNodes.split(',')
        let SnakeLastTailNodeCoords = snakeCoords

        if (snakeTailNodes[0] !== '') {
          const idSnakeLastTailNode = parseInt(snakeTailNodes[snakeTailNodes.length - 1])
          const SnakeLastTailNode = await boxServices.read(idSnakeLastTailNode)

          SnakeLastTailNodeCoords = [SnakeLastTailNode.coordX, SnakeLastTailNode.coordY]
        }

        await boxServices.updateToTail(food.id, SnakeLastTailNodeCoords)
        await snakeServices.updateLength(allSnakes[i].id, food.id.toString())
        await gameServices.updateFoodInGame(idGame)
      }
    }
  }

  static async snakesCollide (AllSnakesData: Snake[], idGame:number):Promise<string> {
    const gameServices = new GameService()

    for (let i = 0; i < AllSnakesData.length; i++) {
      let endMessage = 'Collision. GAME OVER !\n Score: '
      const snakeCoords = [AllSnakesData[i].coordX, AllSnakesData[i].coordY]
      endMessage = endMessage + `${AllSnakesData[i].user}: ${AllSnakesData[i].length}` + '\n'

      for (let j = 0; j < AllSnakesData.length; j++) {
        const tailElements = AllSnakesData[j].tailNodes.split(',')

        if (tailElements[0] !== '') {
          for (let k = 0; k < tailElements.length; k++) {
            const boxService = new BoxService()
            const tailNodeId = parseInt(tailElements[k])
            const tailNode = await boxService.read(tailNodeId)
            const tailNodeCoords = [tailNode.coordX, tailNode.coordY]

            if (snakeCoords[0] === tailNodeCoords[0] && snakeCoords[1] === tailNodeCoords[1]) {
              return endMessage
            }
          }
        }
      }
      for (let l = 0; l < AllSnakesData.length; l++) {
        if (l !== i) {
          const OtherSnakeCoords = [AllSnakesData[l].coordX, AllSnakesData[l].coordY]
          endMessage = endMessage + `${AllSnakesData[l].user}: ${AllSnakesData[l].length}` + '\n'

          if (snakeCoords[0] === OtherSnakeCoords[0] && snakeCoords[1] === OtherSnakeCoords[1]) {
            gameServices.endGame(idGame)
            return endMessage
          }
        }
      }
    }
    return 'Game running...'
  }
}
