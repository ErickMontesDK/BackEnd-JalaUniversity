export interface FileEntity {
      id: string;
      uploaderId: string;
      name: string;
      size: number;
      downloadsTotal: number;
      downloadsToday: number;
  }

export interface AccountEntity {
  id: string
  uploaderId: string
  email: string
  downloadsTotal: number
  downloadsToday: number
  consecutiveDownloads: number
  sizeDownloadTotal: number
  sizeDownloadsToday: number
}
