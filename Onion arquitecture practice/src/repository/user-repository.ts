// import { DeleteResult } from 'typeorm' // esto no puede depender de db
import User from '../entities/user'

export default interface IUserRepository{
    create(user: User): Promise<User>;
    read(id:number): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id:number):Promise<string>;
}
