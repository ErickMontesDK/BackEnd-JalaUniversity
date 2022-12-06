export interface MetodoPago {
    user:string| undefined
    setUser(user:string):void
    makePayment (amount: number):void
}
