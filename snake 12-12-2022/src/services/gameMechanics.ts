import Snake from '../domain/entities/snake'
import BoxService from './box-service'
import SnakeService from './snake-services'

export default class GameMechanics {
  async eatingFood (allSnakes:Snake[], idFood: number): Promise<void> {
    const foodServices = new BoxService()
    const snakeServices = new SnakeService()

    const food = await foodServices.read(idFood)
    const foodCoords = [food.coordX, food.coordY]

    for (let i = 0; i < allSnakes.length; i++) {
      const snakeCoords = [allSnakes[i].coordX, allSnakes[i].coordY]

      console.log(snakeCoords, foodCoords)
      if (snakeCoords[0] === foodCoords[0] && snakeCoords[1] === foodCoords[1]) {
        const snakeTailNodes = allSnakes[i].tailNodes.split(',')
        const idSnakeLastTailNode = parseInt(snakeTailNodes[snakeTailNodes.length - 1])
        const SnakeLastTailNode = await foodServices.read(idSnakeLastTailNode)
        const SnakeLastTailNodeCoords = [SnakeLastTailNode.coordX, SnakeLastTailNode.coordY]

        await foodServices.updateToTail(food.id, SnakeLastTailNodeCoords)
        await snakeServices.updateLength(allSnakes[i].id, idFood.toString())
      }
    }
  }
}
