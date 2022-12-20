import Snake from '../domain/entities/snake'
import BoxService from './box-service'
import GameService from './game-services'
import SnakeService from './snake-services'

export default class GameMechanics {
  async eatingFood (allSnakes:Snake[], idFood: number, idGame:number): Promise<void> {
    const foodServices = new BoxService()
    const snakeServices = new SnakeService()
    const gameServices = new GameService()

    const food = await foodServices.read(idFood)
    const foodCoords = [food.coordX, food.coordY]

    for (let i = 0; i < allSnakes.length; i++) {
      const snakeCoords = [allSnakes[i].coordX, allSnakes[i].coordY]
      snakeCoords[0] = foodCoords[0] === 0 ? snakeCoords[0] - 1 : snakeCoords[0]

      if (snakeCoords[0] === foodCoords[0] && snakeCoords[1] === foodCoords[1]) {
        const snakeTailNodes = allSnakes[i].tailNodes.split(',')
        let SnakeLastTailNodeCoords = snakeCoords

        if (snakeTailNodes[0] !== '') {
          const idSnakeLastTailNode = parseInt(snakeTailNodes[snakeTailNodes.length - 1])
          const SnakeLastTailNode = await foodServices.read(idSnakeLastTailNode)

          SnakeLastTailNodeCoords = [SnakeLastTailNode.coordX, SnakeLastTailNode.coordY]
        }

        await foodServices.updateToTail(food.id, SnakeLastTailNodeCoords)
        await snakeServices.updateLength(allSnakes[i].id, idFood.toString())
        await gameServices.updateFoodInGame(idGame)
      }
    }
  }

  async snakesCollide (AllSnakesData: Snake[]):Promise<string> {
    for (let i = 0; i < AllSnakesData.length; i++) {
      const snakeCoords = [AllSnakesData[i].coordX - 1, AllSnakesData[i].coordY - 1]

      for (let j = 0; j < AllSnakesData.length; j++) {
        if (j !== i) {
          const tailElements = AllSnakesData[j].tailNodes.split(',')

          if (tailElements[0] !== '') {
            for (let k = 0; k < tailElements.length; k++) {
              const boxService = new BoxService()
              const tailNodeId = parseInt(tailElements[k])
              const tailNode = await boxService.read(tailNodeId)
              const tailNodeCoords = [tailNode.coordX, tailNode.coordY]

              if (snakeCoords[0] === tailNodeCoords[0] && snakeCoords[1] === tailNodeCoords[1]) {
                return 'Collision'
              }
            }
          }
        }
      }
    }
    return 'Game running...'
  }
}
