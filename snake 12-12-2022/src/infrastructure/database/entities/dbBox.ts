import { Column, Entity, PrimaryColumn } from 'typeorm'
import Box from '../../../domain/entities/box'
import { boxState } from '../../../domain/types/types'

@Entity()
export default class dbBox implements Box {
    @PrimaryColumn()
      id!: number

    @Column()
      coordX!: number

    @Column()
      coordY!: number

    @Column()
      state! : boxState

    @Column()
      TailNode!: number
}
