// const UserProfile = {
//   id: '1354312456484',
//   firstName: 'Juan',
//   lastName: 'Alvarado',
//   phoneNumber: 4434545484,
//   email: 'juanalvarado@gmail.com',
//   location: 'Guadalajara, Jalisco'
// }

// const updateContact = function (phoneNumber, email) {
//   const oldNumber = this.phoneNumber
//   const oldEmail = this.email

//   this.phoneNumber = phoneNumber
//   this.email = email

//   console.log(`${this.phoneNumber} ${this.email}`)
//   return 'Se ha cambiado informacion de contacto'
// }

// console.log(updateContact.call(UserProfile, 4431646492, 'alvaradoJ@kof.com'))

const dog = {
  name: 'dog',
  bark: function () {
    console.log(this.name, ' is barking')
  }
}
const cat = {
  name: 'cat',
  bark: function () {
    console.log(this.name, ' is meowing')
  }
}

let speak=dog.bark.bind(cat);
speak()
