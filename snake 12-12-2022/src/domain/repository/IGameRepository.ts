import Game from '../entities/game'
import { msgFormat } from '../types/types'

export default interface IGameRepository{
    create(game: Game):Promise<msgFormat>
    read(id: number): Promise<Game>
    updateGame(game: Game): Promise <Game>
}
