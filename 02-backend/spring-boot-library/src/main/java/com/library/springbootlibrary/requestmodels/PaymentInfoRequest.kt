package com.library.springbootlibrary.requestmodels

class PaymentInfoRequest {
    var amount:Int
    var currency : String
    var receiptEmail:String
    constructor(amount:Int,currency:String,receiptEmail:String) {
        this.amount = amount
        this.currency = currency
        this.receiptEmail = receiptEmail
    }

    constructor():this(0,"","")
}