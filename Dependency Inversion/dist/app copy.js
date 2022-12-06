"use strict";
class Store {
    constructor(user) {
        this.user = user;
        this.payoneer = new payoneer(user);
    }
    purchaseBike(quantity) {
        this.payoneer.makePayment(200 * quantity);
    }
    purchaseHelmet(quantity) {
        this.payoneer.makePayment(200 * quantity);
    }
}
class payoneer {
    constructor(user) {
        this.user = user;
    }
    makePayment(amount) {
        console.log(`${this.user} made payment of ${amount} with Payoneer`);
    }
}
// class Payoneer {
//   constructor(){
//   }
// }
const store = new Store('Erick');
store.purchaseBike(2);
store.purchaseHelmet(3);
//# sourceMappingURL=app%20copy.js.map