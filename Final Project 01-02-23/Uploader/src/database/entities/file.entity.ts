import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

export type driveInfo = {
  accountId: ObjectID,
  contentLink: string,
  driveId: string
}

@Entity()
export default class FileEntity {
  @ObjectIdColumn()
    id!: ObjectID

  @Column()
    name!: string

  @Column()
    filename!: string

  @Column()
    status!: string

  @Column()
    size!: number

  @Column()
    mimetype!: string

  @Column()
    driveFile!: driveInfo[]
}
