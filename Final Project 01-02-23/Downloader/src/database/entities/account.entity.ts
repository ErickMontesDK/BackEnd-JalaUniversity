import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    uploaderId!: string

  @Column()
    email!: string

  @Column()
    downloadsTotal!: number

  @Column()
    downloadsToday!: number

  @Column()
    consecutiveDownloads!: number

  @Column()
    sizeDownloadTotal!: number

  @Column()
    sizeDownloadsToday!: number
}
