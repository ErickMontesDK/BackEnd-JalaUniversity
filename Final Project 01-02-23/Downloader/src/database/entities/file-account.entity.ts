import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class FileAccountEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    fileId!: string

  @Column()
    accountId!: string

  @Column()
    downloadLink!: string
}
