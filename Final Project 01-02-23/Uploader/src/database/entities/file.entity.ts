import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export default class FileEntity {
   @ObjectIdColumn()
     id!: ObjectID

   @Column()
     name!: string

   @Column()
     status!: string

  @Column()
    size!: number

  @Column()
    driveId!: string
}
