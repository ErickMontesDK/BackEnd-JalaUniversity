import { ErrorBuild } from '../../utils/errorBuild'
import { AppDataSource } from './../dbsource'
import FileEntity from './../entities/file.entity'

export class FileRepository {
  protected repository = AppDataSource.getRepository(FileEntity)

  async createFile (newFile: FileEntity) {
    const response:any = await this.repository.insert(newFile)
    return response.identifiers[0].id
  }

  async readFileById (id: string) {
    const foundFile = await this.repository.findOneBy({ id })

    if (foundFile) {
      const infoFile = {
        name: foundFile.name,
        uploaderId: foundFile.uploaderId,
        downloadLinks: foundFile.contentLinks.split(',')
      }
      return infoFile
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
          uploaderId: file.uploaderId,
          downloadLinks: file.contentLinks.split(',')
        }
        return infoFile
      })
      return nameAndLinks
    } else {
      throw ErrorBuild.badRequest('Files not found in Database')
    }
  }

  async readFileByUploaderId (id:string) {
    const fileFound = await this.repository.findBy({ uploaderId: id })

    if (fileFound[0]) {
      const infoFile = {
        name: fileFound[0].name,
        id: fileFound[0].id,
        downloadLinks: fileFound[0].contentLinks.split(',')
      }
      return infoFile
    } else {
      throw ErrorBuild.badRequest('File not found in Database')
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
