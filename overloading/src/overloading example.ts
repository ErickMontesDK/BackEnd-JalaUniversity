// Regular function
// function greet(person: string): string {
//     return `Hello, ${person}!`;
// }
// greet('World'); // 'Hello, World!'

// console.log(greet('World'));

// Function with two scenarios
// function greet(person: string | string[]): string | string[] {
//     if (typeof person === 'string') {
//         return `Hello, ${person}!`;
//     } else if (Array.isArray(person)) {
//         return person.map(name => `Hello, ${name}!`);
//     }
//     throw new Error('Unable to greet');
// }
// console.log(greet('World'))         // 'Hello, World!'
// console.log(  greet(['Jane', 'Joe'])) // ['Hello, Jane!', 'Hello, Joe!']

// when the function signature is relatively complex and has multiple types involved.
// The overload signature defines the parameter and return types of the function,
// and doesn't have a body. A function can have multiple overload signatures:
// corresponding to the different ways you can invoke the function.
// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature
function greet (person: unknown): unknown {
  if (typeof person === 'string') {
    return `Hello, ${person}!`
  } else if (Array.isArray(person)) {
    return person.map(name => `Hello, ${name}!`)
  }
  throw new Error('Unable to greet')
}
console.log(greet('World')) // 'Hello, World!'
console.log(greet(['Jane', 'Joe'])) // ['Hello, Jane!', 'Hello, Joe!']
