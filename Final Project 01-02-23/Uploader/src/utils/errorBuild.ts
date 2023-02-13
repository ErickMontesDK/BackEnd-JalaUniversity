export class ErrorBuild {
  public code: number
  public message: string

  constructor (code: number, message: string) {
    this.code = code
    this.message = message
  }

  static badRequest (msg:string) {
    return new ErrorBuild(400, msg)
  }

  static notFound (msg:string) {
    return new ErrorBuild(404, msg)
  }

  static internalServerError (msg:string) {
    return new ErrorBuild(500, msg)
  }
}
