import { PrimaryColumn, Column, Entity } from 'typeorm'
import { direction } from '../../../domain/types/types'
import Snake from '../../../domain/entities/snake'

@Entity()
export default class dbSnake implements Snake {
    @PrimaryColumn()
      id!: number

    @Column()
      coordX!: number

    @Column()
      coordY!: number

    @Column()
      length! : number

    @Column()
      user!: string

    @Column()
      direction!: direction

    @Column()
      tailNodes!: string
}
