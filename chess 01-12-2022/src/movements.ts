import { File } from './types'
import position from './position'

export default class Movements {
  // eslint-disable-next-line no-useless-constructor
  constructor (public actual: position, public next: position) {

  }

  getFiles ():number {
    const alfabeth: File[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const coordFile = alfabeth.indexOf(this.actual.file)
    const newFile = alfabeth.indexOf(this.next.file)

    return Math.abs(coordFile - newFile)
  }

  getRanks ():number {
    return Math.abs(this.actual.rank - this.next.rank)
  }
}
