import { DeleteResult } from 'typeorm'
export default interface IUserRepository<User>{
    create(user: User): Promise<User>;
    read(id:number): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id:number):Promise<DeleteResult>;
}
