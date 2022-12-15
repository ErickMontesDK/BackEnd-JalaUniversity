import User from '../user'
import IRepository from './IRepository'

export default interface IUserRepository extends IRepository<User> {
        Update(user: User):void
        Get(receive: number): User
        Delete(receive: number): void
}
