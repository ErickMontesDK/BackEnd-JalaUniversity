import Game from '../../../../../domain/entities/game'

const testGame = new Game()
testGame.id = 5
testGame.gameState = 'Ready to Start'
testGame.gameSpeed = 1000
testGame.idBoard = 5
testGame.idSnakes = '5'
testGame.idFood = 5

export default testGame
