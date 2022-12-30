import Snake from '../domain/entities/snake'
import Box from '../domain/entities/box'
import IBoxService from '../domain/repository/IBoxService'
import ISnakeService from '../domain/repository/ISnakeService'
import { inject, injectable } from 'inversify'

@injectable()
export default class GameMechanics {
  protected boxServices: IBoxService
  protected snakeServices: ISnakeService

  constructor (@inject('BoxService') box: IBoxService,
  @inject('SnakeService') snake: ISnakeService) {
    this.boxServices = box
    this.snakeServices = snake
  }

  async returnAllSnakesInfo (idSnakes:string[]):Promise<Snake[]> {
    const Snakes: Snake[] = []

    for (let i = 0; i < idSnakes.length; i++) {
      const snake = await this.snakeServices.read(idSnakes[i])
      Snakes.push(snake)
    }
    return Snakes
  }

  async getScores (AllSnakes:Snake[]) {
    const Scores:object[] = []

    AllSnakes.forEach((snake) => {
      const fixScoreParameter = 1
      Scores.push({ PLAYER: snake.user, SCORE: snake.length - fixScoreParameter })
    })

    return Scores
  }

  async eatingFood (allSnakes:Snake[], food: Box): Promise<boolean> {
    const foodCoords = [food.coordX, food.coordY]

    for (let i = 0; i < allSnakes.length; i++) {
      const snakeCoords = [allSnakes[i].coordX, allSnakes[i].coordY]

      if (snakeCoords[0] === foodCoords[0] && snakeCoords[1] === foodCoords[1]) {
        const snakeTailNodes = allSnakes[i].tailNodes.split(',')
        let SnakeLastTailNodeCoords = snakeCoords

        if (snakeTailNodes[0] !== '') {
          const idSnakeLastTailNode = snakeTailNodes[snakeTailNodes.length - 1]
          const SnakeLastTailNode = await this.boxServices.read(idSnakeLastTailNode)
          SnakeLastTailNodeCoords = [SnakeLastTailNode.coordX, SnakeLastTailNode.coordY]
        }

        await this.boxServices.updateToTail(food.id.toString(), SnakeLastTailNodeCoords)
        await this.snakeServices.updateLength(allSnakes[i].id.toString(), food.id.toString())
        return true
      }
    }
    return false
  }

  async updateMovementForAllSnakes (allSnakes:Snake[], boardSize:number):Promise<void> {
    allSnakes.forEach(async (snake) => {
      await this.snakeServices.updateMovement(snake.id.toString(), boardSize)
    })
  }

  async snakesCollide (AllSnakesData: Snake[]):Promise<boolean> {
    for (let i = 0; i < AllSnakesData.length; i++) {
      const snakeCoords = [AllSnakesData[i].coordX, AllSnakesData[i].coordY]

      for (let j = 0; j < AllSnakesData.length; j++) {
        const tailElements = AllSnakesData[j].tailNodes.split(',')

        if (tailElements[0] !== '') {
          for (let k = 0; k < tailElements.length; k++) {
            const tailNodeId = tailElements[k]
            const tailNode = await this.boxServices.read(tailNodeId)
            const tailNodeCoords = [tailNode.coordX, tailNode.coordY]

            if (snakeCoords[0] === tailNodeCoords[0] && snakeCoords[1] === tailNodeCoords[1]) {
              return true
            }
          }
        }
      }
      for (let l = 0; l < AllSnakesData.length; l++) {
        if (l !== i) {
          const OtherSnakeCoords = [AllSnakesData[l].coordX, AllSnakesData[l].coordY]

          if (snakeCoords[0] === OtherSnakeCoords[0] && snakeCoords[1] === OtherSnakeCoords[1]) {
            return true
          }
        }
      }
    }
    return false
  }
}
