import FileEntity from './../database/entities/file.entity';
import { FileRepository } from '../database/repository/file.repository';

type FileValues = {
  name: string,
  status:string,
  driveId: string
}

export default class FileService {
  protected fileRepository: FileRepository;

  constructor () {
    this.fileRepository = new FileRepository();
  }

  async createFile (fileValues: FileValues) {
    const newfile = new FileEntity();
    newfile.name = fileValues.name;
    newfile.status = fileValues.status;
    newfile.driveId = fileValues.driveId;

    return await this.fileRepository.createFile(newfile);
  }

  async getFileById (id: string) {
    return await this.fileRepository.readFile(id);
  }

  async updateFileById (id: string, fileValues: FileValues) {
    const updateFile = await this.getFileById(id);

    updateFile.name = fileValues.name === '' ? updateFile.name : fileValues.name;
    updateFile.status = fileValues.status === '' ? updateFile.status : fileValues.status;
    updateFile.driveId = fileValues.driveId === '' ? updateFile.driveId : fileValues.driveId;

    return await this.fileRepository.updateFile(updateFile);
  }

  async deleteFileById (id: string) {
    return await this.fileRepository.deleteFile(id);
  }
}
