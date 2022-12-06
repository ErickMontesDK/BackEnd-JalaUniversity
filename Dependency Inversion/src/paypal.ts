import { MetodoPago } from './interface'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export class paypal implements MetodoPago {
  user: string | undefined = 'The user'

  setUser (user: string):void {
    this.user = user
  }

  makePayment (amount: number):void {
    console.log(`${this.user} made payment of ${amount} with Paypal`)
  }
}
