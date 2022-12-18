import { Column, Entity, PrimaryColumn } from 'typeorm'
import Game from '../../../domain/entities/game'
import { gameState } from '../../../domain/types/types'

@Entity()
export default class dbGame implements Game {
    @PrimaryColumn()
      id!: number

    @Column()
      gameState!: gameState

    @Column()
      gameSpeed!: number

    @Column()
      idBoard! : number

    @Column()
      idSnakes!: string

    @Column()
      idBodySnake!: string

    @Column()
      idFood!: string
}
