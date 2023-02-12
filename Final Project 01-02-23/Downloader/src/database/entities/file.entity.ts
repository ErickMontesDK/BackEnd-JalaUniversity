import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class FileEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    name!: string

  @Column()
    status!: string

  @Column()
    size!: number

  @Column()
    contentLinks!: string

  @Column()
    uploaderId!: string
}
