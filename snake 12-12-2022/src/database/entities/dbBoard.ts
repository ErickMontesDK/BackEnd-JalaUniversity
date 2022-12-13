import { Column, Entity, PrimaryColumn } from 'typeorm'
import Board from '../../entities/board'

@Entity()
export default class dbBoard implements Board {
    @PrimaryColumn()
      id!: number

    @Column()
      arregloX!: number

    @Column()
      arregloY!: number
}
