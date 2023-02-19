import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class FileEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    uploaderId!: string

  @Column()
    name!: string

  @Column()
    size!: number

  @Column()
    downloadsTotal!: number

  @Column()
    downloadsToday!: number
}
