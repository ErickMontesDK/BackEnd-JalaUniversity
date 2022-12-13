import Position from '../../../domain/entities/position'
import { PrimaryColumn, Column, Entity } from 'typeorm'

@Entity()
export default class dbPosition implements Position {
    @PrimaryColumn()
      id!: number

    @Column()
      coordX!: number

    @Column()
      coordY!: number
}
