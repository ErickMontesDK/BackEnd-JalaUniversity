import Position from '../src/position'
import King from '../src/king'

describe('Unit Test for King', () => {
  let king: King

  beforeEach(() => {
    king = new King('White', 'E', 1)
  })

  // King
  it('Should move one place forward', () => {
    const position = new Position('E', 2)
    expect(king.canMoveTo(position)).toBe(true)
  })
  it("Shouldn't move to the same place", () => {
    const position = new Position('E', 1)
    expect(king.canMoveTo(position)).toBe(false)
  })
  it('Should move one place to the left', () => {
    const position = new Position('D', 1)
    expect(king.canMoveTo(position)).toBe(true)
  })
  it("Shouldn't move forward more than 1 space", () => {
    const position = new Position('E', 3)
    expect(king.canMoveTo(position)).toBe(false)
  })
})
