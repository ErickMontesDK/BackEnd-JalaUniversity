import BoxService from './box-service'

async function tailNodesMovement (nodes: string[], oldPositionHead:number[]): Promise<void> {
  const boxService = new BoxService()
  oldPositionHead[0]--
  oldPositionHead[1]--
  let oldPositionBody = oldPositionHead

  for (let i = 1; i < nodes.length; i++) {
    const nodeInt = parseInt(nodes[i])

    const nodeBoxData = await boxService.read(nodeInt)
    boxService.updateToTail(nodeInt, oldPositionBody)
    oldPositionBody = [nodeBoxData.coordX, nodeBoxData.coordY]
  }
  nodes = nodes.slice(1, nodes.length)
}

export { tailNodesMovement }
