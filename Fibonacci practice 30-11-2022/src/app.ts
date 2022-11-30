// function * createNumbers (): IterableIterator<number> {
//   let n = 0
//   while (true) {
//     yield n++
//   }
// }
// // console.log(createNumbers())
// const numbers = createNumbers()
// console.log(numbers.next())
// console.log(numbers.next())
// console.log(numbers.next())

// 1,1,2,3,5,8,13,21,34

function * fibonacci (): IterableIterator<number> {
  let a = 0
  let b = 1
  let c = 0

  while (true) {
    yield a
    c = b
    b = a + b
    a = c
  }
}
// console.log(createNumbers())
const numbers = fibonacci()
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
