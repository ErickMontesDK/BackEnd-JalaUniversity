import { Container } from 'inversify'
import { MetodoPago } from './interface'
import { paypal } from './paypal'
import { Store } from './construction'

const container = new Container()

container.bind<MetodoPago>('Paypal').to(paypal)
container.bind<Store>('Store').to(Store)
export { container }
