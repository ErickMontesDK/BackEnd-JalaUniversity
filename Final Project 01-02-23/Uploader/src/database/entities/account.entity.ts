import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export default class AccountEntity {
  @ObjectIdColumn()
    id!: ObjectID

  @Column()
    email!: string

  @Column()
    client_id!: string

  @Column()
    client_secret!: string

  @Column()
    refresh_token!: string
}
