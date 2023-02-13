import { ObjectID } from 'mongodb'
import { ErrorBuild } from '../../utils/errorBuild'
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
      throw ErrorBuild.badRequest('File not found in Database')
    }
  }

  async updateFile (file: FileEntity) {
    const updatedFile = await this.repository.save(file)

    if (updatedFile) {
      return updatedFile
    } else {
      throw ErrorBuild.internalServerError('File was not updated')
    }
  }

  async deleteFile (id: string) {
    const objectId = new ObjectId(id)
    const deletedFile = await this.repository.findOneAndDelete({ _id: objectId })

    if (deletedFile) {
      return deletedFile.value._id
    } else {
      throw ErrorBuild.badRequest('File not found in Database')
    }
  }

  async getFileFromGridFS (idFile:ObjectID) {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://Admin:killerkiller@uploader.ehxrcgs.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    const db = client.db('test')
    const chunksCollection = db.collection('fs.chunks')

    const chunks = await chunksCollection
      .find({ files_id: new mongodb.ObjectID(idFile) })
      .sort({ n: 1 })
      .toArray()

    const fileBuffer = Buffer.concat(chunks.map((chunk:any) => Buffer.from(chunk.data.buffer)))
    if (fileBuffer) {
      return fileBuffer
    } else {
      throw (ErrorBuild.badRequest('File not found in GridFS'))
    }
  }
}
