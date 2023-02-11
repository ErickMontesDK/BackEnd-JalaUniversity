import { Request, Response } from 'express';
import 'reflect-metadata';
import FileService from '../../services/file.services';

export default class FileControllers {
  protected fileService: FileService;

  constructor () {
    this.fileService = new FileService();
  }

  async createFile (req: Request, res: Response) {
    const { name, status, driveId } = req.body;

    if (!name || !status || !driveId) {
      return res.status(400).json({ error: 'Name, status, and driveId are required.' });
    }

    try {
      const fileValues = {
        name,
        status,
        driveId
      };

      const newFile = await this.fileService.createFile(fileValues);

      return res.status(201).json({ file: newFile, message: 'File created successfully.' });
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
    }
  }

  async getFileById (req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'The File id is required.' });

    try {
      const foundFile = await this.fileService.getFileById(id);

      return res.status(200).json({ file: foundFile, message: 'File found successfully.' });
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(404).json({ message: error.message });
    }
  }

  async updateFileById (req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'The File id is required.' });

    const fileValues = {
      name: req.body.name || '',
      status: req.body.status || '',
      driveId: req.body.driveId || ''
    };

    try {
      const updatedFile = await this.fileService.updateFileById(id, fileValues);

      return res.status(200).json({ data: updatedFile, message: 'File updated successfully.' });
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
    }
  }

  async deleteFileById (req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'The File id is required.' });

    try {
      const deletedFile = await this.fileService.deleteFileById(id);

      return res.status(200).json({ id: deletedFile, message: 'File deleted successfully.' });
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
    }
  }
}
