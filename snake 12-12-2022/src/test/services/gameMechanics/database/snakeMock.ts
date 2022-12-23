import Snake from '../../../../domain/entities/snake'

const testSnake = new Snake()
testSnake.id = 1
testSnake.coordX = 5
testSnake.coordY = 5
testSnake.direction = 'up'
testSnake.length = 1
testSnake.tailNodes = ''
testSnake.user = 'User'

export { testSnake }
