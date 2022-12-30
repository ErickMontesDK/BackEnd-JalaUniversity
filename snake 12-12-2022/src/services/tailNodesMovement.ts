import IBoxService from '../domain/repository/IBoxService'
import { container } from '../infrastructure/inversify/inversify.config'

async function tailNodesMovement (nodes: string[], oldPositionHead:number[]): Promise<number[]> {
  const boxService = container.get<IBoxService>('BoxService')
  let oldPositionBody = oldPositionHead

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[0] !== '') {
      const nodeInt = nodes[i]

      const nodeBoxData = await boxService.read(nodeInt)
      boxService.updateToTail(nodeInt, oldPositionBody)
      oldPositionBody = [nodeBoxData.coordX, nodeBoxData.coordY]
    }
  }
  return oldPositionBody
}

export { tailNodesMovement }
