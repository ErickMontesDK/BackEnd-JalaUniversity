/* eslint-disable no-unused-vars */
import translateToDirection from '../../services/helpers/translateToDirection'
import { direction } from '../../domain/types/types'

describe('Unit test translateToDirection function', () => {
  it('Should return the direction if received but with the Type "direction"', async () => {
    const correctDirections:direction[] = ['up', 'down', 'right', 'left']
    const validDirectionUp = translateToDirection('up')
    const validDirectionDown = translateToDirection('down')
    const validDirectionRight = translateToDirection('right')
    const validDirectionLeft = translateToDirection('left')

    expect(validDirectionUp).toBe(correctDirections[0])
    expect(validDirectionDown).toBe(correctDirections[1])
    expect(validDirectionRight).toBe(correctDirections[2])
    expect(validDirectionLeft).toBe(correctDirections[3])
  })
  it('Should return a undefined if it received an invalid direction string', async () => {
    const wrongDirection = 'Down'
    const notCorrectedDirection = translateToDirection(wrongDirection)

    expect(notCorrectedDirection).toBe(undefined)
  })
})
