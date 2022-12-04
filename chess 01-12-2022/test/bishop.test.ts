import Position from '../src/position'
import Bishop from '../src/bishop'

describe('Unit Test for Bishop', () => {
  let bishop: Bishop

  beforeEach(() => {
    bishop = new Bishop('White', 'C', 1)
  })

  // Bishop
  it("Shouldn't move vertically", () => {
    const position = new Position('C', 8)
    expect(bishop.canMoveTo(position)).toBe(false)
  })
  it("Shouldn't move horizontally", () => {
    const position = new Position('A', 1)
    expect(bishop.canMoveTo(position)).toBe(false)
  })
  it('Should mover diagonally', () => {
    let position = new Position('H', 6)
    expect(bishop.canMoveTo(position)).toBe(true)

    position = new Position('A', 3)
    expect(bishop.canMoveTo(position)).toBe(true)
  })
  it('Should not move L', () => {
    let position = new Position('C', 3)
    expect(bishop.canMoveTo(position)).toBe(false)

    position = new Position('B', 3)
    expect(bishop.canMoveTo(position)).toBe(false)
  })
  it('Should not move other places', () => {
    let position = new Position('C', 5)
    expect(bishop.canMoveTo(position)).toBe(false)

    position = new Position('F', 8)
    expect(bishop.canMoveTo(position)).toBe(false)
  })
  it('Should move', () => {
    const position = new Position('C', 1)
    expect(bishop.canMoveTo(position)).toBe(false)
  })
})
