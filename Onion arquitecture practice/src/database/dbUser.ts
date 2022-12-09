import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class User {
  // user: User

  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    lastName!: string
  // constructor () {
  //   this.user = new User()
  //   this.id = this.user.id
  //   this.name = this.user.name
  //   this.lastName = this.user.lastName
  // }
}
