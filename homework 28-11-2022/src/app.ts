// call() and apply()

type FacebookProfile={
  id:string,
  name:string,
  phoneNumber?:number,
  email:string,
  location?:string,
  creationDate:string
}

const UserProfile:FacebookProfile = {
  id: '1354312456484',
  name: 'Juan Alvarado',
  email: 'juanalvarado@gmail.com',
  creationDate: '28-11-2015'
}
const BusinessProfile:FacebookProfile = {
  id: '1354312456484',
  name: 'Decoraciones "Luz"',
  phoneNumber: 4434545484,
  email: 'contacto@luzdecoraciones.com',
  location: 'Toluca, Estado de México',
  creationDate: '28-11-2015'
}

const updateEmail = function (this:FacebookProfile, email:string):string {
  this.email = email
  return `Se ha cambiado el correo de contacto a ${this.email}`
}

console.log(updateEmail.call(UserProfile, 'alvaradoJ@kof.com'))
console.log(updateEmail.call(BusinessProfile, 'servicioacliente@decoracionesliz.com'))

// bind()
const tickets = {
  price: 3,
  total: function (quantity:number) {
    return this.price * quantity
  }
}
const studentTicket = {
  price: 2
}

const studentPrice = tickets.total.bind(studentTicket)

const boletos : number = 4
console.log(`El precio por ${boletos} boletos a precio normal es ${tickets.total(boletos)} dolares`)
console.log(`El precio por ${boletos} boletos a precio de estudiante es ${studentPrice(boletos)} dolares`)
