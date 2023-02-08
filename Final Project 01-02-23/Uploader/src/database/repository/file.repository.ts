import { AppDataSource } from './../dbsource'
import FileEntity from './../entities/file.entity'
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

export class FileRepository {
  protected repository = AppDataSource.getMongoRepository(FileEntity)

  async createFile (newFile: FileEntity) {
    return await this.repository.save(newFile)
  }

  async readFile (id: string): Promise<FileEntity> {
    const objectId = new ObjectId(id)
    const foundFile = await this.repository.findOneBy({ _id: objectId })

    if (foundFile) {
      return foundFile
    } else {
      throw new Error(`File with id:${id} not found`)
    }
  }

  async updateFile (file: FileEntity) {
    return await this.repository.save(file)
  }

  async deleteFile (id: string) {
    const objectId = new ObjectId(id)
    const deletedFile = await this.repository.findOneAndDelete({ _id: objectId })

    if (deletedFile) {
      return deletedFile.value._id
    } else {
      throw new Error(`File with id:${id} not found`)
    }
  }
}
