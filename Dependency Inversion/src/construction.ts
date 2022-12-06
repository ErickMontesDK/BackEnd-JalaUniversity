import { MetodoPago } from './interface'
import { inject, injectable } from 'inversify'

@injectable()
export class Store {
  paypal: MetodoPago

  constructor (@inject('Paypal') paypal: MetodoPago) {
    this.paypal = paypal
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
