import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export default class AccountEntity {
   @ObjectIdColumn()
     id!: ObjectID

   @Column()
     email!: string

   @Column()
     driveKey!: string
}
