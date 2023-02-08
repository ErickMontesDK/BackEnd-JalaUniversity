import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Student {
  @PrimaryColumn()
    id!: string

   @Column()
     Name!: string

   @Column()
     Country!: string
}
