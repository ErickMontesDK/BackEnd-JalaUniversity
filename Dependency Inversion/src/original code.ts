// Tenemos un programa que realiza el cobro en una página de compra-venta

interface MetodoPago {
  user:string| undefined
  setUser(user:string):void
  makePayment (amount: number):void
}

class paypal implements MetodoPago {
  user: string | undefined = 'The user'

  setUser (user: string):void {
    this.user = user
  }

  makePayment (amount: number):void {
    console.log(`${this.user} made payment of ${amount} with Paypal`)
  }
}

// Store depende de la class paypal
class Store {
  paypal: MetodoPago

  constructor () {
    // eslint-disable-next-line new-cap
    this.paypal = new paypal()
  }

  setUser (user: string):void {
    this.paypal.setUser(user)
  }

  purchaseBike (quantity:number) {
    this.paypal.makePayment(1000 * quantity)
  }

  purchaseHelmet (quantity:number) {
    this.paypal.makePayment(200 * quantity)
  }
}

const store = new Store()
store.setUser('Marlen')
store.purchaseBike(1)
store.purchaseHelmet(2)
