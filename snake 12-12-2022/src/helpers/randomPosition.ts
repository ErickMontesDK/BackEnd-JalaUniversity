let counter = 1
let prevRand = 1

export const randomPosition = (max:number) => {
  if (isNaN(max) === false) {
    const time = new Date().getTime()
    const randValue = ((time / counter) / (prevRand + 1)) % max
    counter++
    prevRand = randValue
    const ifString = randValue.toString()

    return parseInt(ifString)
  } else {
    throw new Error('Sent a invalid number')
  }
}
