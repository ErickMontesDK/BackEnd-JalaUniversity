class Reservation {
  destination: string | undefined
  to: Date | undefined

  // eslint-disable-next-line no-useless-constructor
  constructor (public from: Date) {}

  setDestination (destination: string):void {
    this.destination = destination
  }

  setTo (to: Date):void {
    this.to = to
  }
}

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}

const reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
  const reservation = new Reservation(from)
  if (toOrDestination instanceof Date && destination) {
    reservation.setDestination(destination)
    reservation.setTo(toOrDestination)
  } else if (typeof toOrDestination === 'string') {
    reservation.setDestination(toOrDestination)
  }
  return reservation
}

const fecha = new Date()
const firstReservation = reserve(fecha, fecha, 'Brazil')
const secondReservation = reserve(fecha, 'Brazil')

console.log(firstReservation)
console.log(secondReservation)
