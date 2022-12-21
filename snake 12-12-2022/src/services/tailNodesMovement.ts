import BoxService from './box-service'

async function tailNodesMovement (nodes: string[], oldPositionHead:number[]): Promise<void> {
  const boxService = new BoxService()
  let oldPositionBody = oldPositionHead

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[0] !== '') {
      const nodeInt = parseInt(nodes[i])

      const nodeBoxData = await boxService.read(nodeInt)
      boxService.updateToTail(nodeInt, oldPositionBody)
      oldPositionBody = [nodeBoxData.coordX, nodeBoxData.coordY]
    }
  }
}

export { tailNodesMovement }
