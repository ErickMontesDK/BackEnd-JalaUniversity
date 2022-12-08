// export default class User {
//   private name: string
//   private lastName: string
// }

import { Column, Entity, PrimaryColumn } from 'typeorm'
@Entity()
export default class User {
  @PrimaryColumn()
    id!: number

  @Column()
  protected name!: string

  @Column()
  protected lastName!: string

  constructor (name: string, lastName: string) {
    this.name = name
    this.lastName = lastName
  }

  set changeLastname (value: string) {
    this.lastName = value
  }

  get changeLastname () { return this.lastName }
}
