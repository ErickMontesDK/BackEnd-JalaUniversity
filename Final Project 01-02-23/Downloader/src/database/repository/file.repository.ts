import { ErrorBuild } from '../../utils/errorBuild'
import { AppDataSource } from './../dbsource'
import FileEntity from './../entities/file.entity'

export class FileRepository {
  protected repository = AppDataSource.getRepository(FileEntity)

  async updateFile (updateFile: FileEntity) {
    const response = await this.repository.save(updateFile)
    return response
  }

  async readFileById (id: string) {
    const foundFile = await this.repository.findOneBy({ id })

    if (foundFile) {
      return foundFile
    } else {
      throw ErrorBuild.badRequest('File not found in Database')
    }
  }

  async readAllFiles () {
    const allFiles = await this.repository.find()

    if (allFiles) {
      const nameAndLinks = allFiles.map((file) => {
        const infoFile = {
          name: file.name,
          id: file.id,
          uploaderId: file.uploaderId
        }
        return infoFile
      })
      return nameAndLinks
    } else {
      throw ErrorBuild.badRequest('Files not found in Database')
    }
  }

  async readFileByUploaderId (id:string) {
    const fileFound = await this.repository.findOneBy({ uploaderId: id })

    if (fileFound) {
      return fileFound
    } else {
      return undefined
    }
  }

  async deleteFile (id: string) {
    const deletedFile = await this.repository.delete({ id })

    if (deletedFile) {
      return deletedFile
    } else {
      throw ErrorBuild.badRequest('File not found in Database')
    }
  }
}
