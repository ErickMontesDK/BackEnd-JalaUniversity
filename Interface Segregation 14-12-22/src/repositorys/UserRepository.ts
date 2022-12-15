import IUserRepository from '../interfaces/IUserRepository'
import User from '../user'

export default class UserRepository implements IUserRepository {
  Insert (element: User): void { }
  Update (user: User):void { }
  Get (receive: number): User { }
  Delete (receive: number): void {}
}
