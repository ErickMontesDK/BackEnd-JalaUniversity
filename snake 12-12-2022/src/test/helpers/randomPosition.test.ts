/* eslint-disable no-unused-vars */
import { randomPosition } from '../../services/helpers/randomPosition'

describe('Unit test randomPosition function', () => {
  it('Should return a random number less than the sent value', async () => {
    const greaterNumber = 10
    const returnedNumber = randomPosition(greaterNumber)

    expect(typeof returnedNumber).toBe('number')
    expect(returnedNumber).toBeLessThan(greaterNumber)
  })
  it('Should return a Error if it received an invalid number', async () => {
    try {
      const invalidValue = NaN
      const returnedNumber = randomPosition(invalidValue)
    } catch (err:unknown) {
      expect(err instanceof Error).toBe(true)
    }
  })
})
