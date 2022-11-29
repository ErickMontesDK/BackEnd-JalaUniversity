// // call() and apply()
// We have to similar objects. The diference between is the function updateEmail
const UserProfile:{
  name:string,
  phoneNumber?:number,
  email:string,
  location?:string,
  updateEmail(email:string):string,
  updateLocation(city:string, state:string):string,
  updatePhone(phone:number):string
} = {
  name: 'Juan Alvarado',
  email: 'juanalvarado@gmail.com',
  updateEmail: function (email) { // <updateEmail function
    this.email = email
    return `Se ha cambiado el correo de contacto a ${this.email}`
  },
  updateLocation: function (city, state) { // <updateEmail function
    this.location = `${city}, ${state}`
    return `Se ha cambiado su ubicación a ${this.location}`
  },
  updatePhone: function (phone) {
    this.phoneNumber = phone
    return `Se ha cambiado su numero de telefono a ${this.phoneNumber}`
  }
}
// In this context, this refers to the object UserProfile

const BusinessProfile:{
  name:string,
  phoneNumber?:number,
  email:string,
  location?:string,
} = {
  name: 'Decoraciones "Luz"',
  phoneNumber: 4434545484,
  email: 'contacto@luzdecoraciones.com',
  location: 'Toluca, Estado de México'
}

// If we use the function above, "this" will still reference the UserProfile object
console.log(UserProfile.updateEmail('alvaradoJ@kof.com'))

// With call() method, we can send the BusinessProfile object.
// "This" will reference the BusinessProfile object
console.log(UserProfile.updateEmail.call(BusinessProfile, 'servicioacliente@decoracionesliz.com'))

// The apply() method has the same purpose. It allows us to change the "this" context
// When using the apply() method, we use an array to send the parameters
console.log(UserProfile.updateLocation('Saltillo', 'Coahuila'))
console.log(UserProfile.updateLocation.apply(BusinessProfile, ['Monterrey', 'Nuevo León']))

// bind()
// Bind has a similar purpose, but it's different from apply() and call()
// The bind function creates a copy of a function with a new value to the this present inside the calling function.

// In the function above we call the function updatePhone() in the UserProfile object
// "This" refers to the USerProfile object
console.log(UserProfile.updatePhone(4434646494))

// We copy the function from the UserProfile object.
// Bind() change the object which "this" refers to.
const businessUpdatePhone = UserProfile.updatePhone.bind(BusinessProfile)

// Using the new function
console.log(businessUpdatePhone(4431212187))
