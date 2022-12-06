import { Store } from './construction'
import { container } from './inversify.config'

const constructionObj = container.get<Store>('Store')
constructionObj.setUser('Marlen')
constructionObj.purchaseBike(1)
constructionObj.purchaseBike(2)
