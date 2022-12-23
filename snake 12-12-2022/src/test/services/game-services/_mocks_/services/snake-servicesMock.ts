// import 'reflect-metadata'
// import { injectable } from 'inversify'
// import ISnakeRepository from '../../../domain/repository/ISnakeRepository'
// import dbSnake from '../../../infrastructure/database/entities/dbSnake'

// import ISnakeService from '../../../domain/repository/ISnakeService'
// import { testSnake } from '../database/snakeMock'
// import translateToDirection from '../../../helpers/translateToDirection'
// import { movingInDirection } from '../../../infrastructure/utils/movingDirection'

// @injectable()
// export class SnakeServiceMock implements ISnakeService {
//   private createMock: jest.Mock
//   private readMock: jest.Mock
//   private updateDirectionMock: jest.Mock
//   private updateMovementMock: jest.Mock
//   private updateLengthMock: jest.Mock
//   private resetInitialValuesMock: jest.Mock
//   private getBestScoresMock: jest.Mock
//   private deleteMock: jest.Mock

//   constructor () {
//     this.createMock = jest.fn()
//     this.readMock = jest.fn()
//     this.updateDirectionMock = jest.fn()
//     this.updateMovementMock = jest.fn()
//     this.updateLengthMock = jest.fn()
//     this.resetInitialValuesMock = jest.fn()
//     this.getBestScoresMock = jest.fn()
//     this.deleteMock = jest.fn()
//   }

//   async create (limitBoard: number, player: string) {
//     this.createMock(limitBoard, player)
//     const id = testSnake.id
//     return { id, message: 'mock message' }
//   }

//   async read (id: number) {
//     this.readMock(id)
//     testSnake.id = id
//     return testSnake
//   }

//   async updateDirection (id: number, direction: string) {
//     const correctedDirection = translateToDirection(direction)
//     this.updateDirectionMock(id, direction)
//     testSnake.id = id
//     if (correctedDirection !== undefined) {
//       testSnake.direction = correctedDirection
//     } else {
//       testSnake.direction = 'up'
//     }

//     return testSnake
//   }

//   async updateMovement (id: number, limitBoard:number) {
//     this.updateMovementMock(id, limitBoard)
//     const updateSnake = movingInDirection(testSnake, limitBoard)
//     updateSnake.id = id

//     return updateSnake
//   }

//   async updateLength (id: number, node:string) {
//     this.updateLengthMock(id, node)
//     return { id, message: 'mock response' }
//   }

//   async resetInitialValues (id: number, boardSize: number) {
//     this.resetInitialValuesMock(id, boardSize)
//     return { id, message: 'mock response' }
//   }

//   async getBestScores () {
//     this.getBestScoresMock()
//     return { id, message: 'mock response' }
//   }

//   async delete (id: number) {
//     this.deleteMock(id)
//     return { id, message: 'mock response' }
//   }
// }
