package com.library.springbootlibrary.requestmodels

 class AdminQuestionRequest{
        var id: Long
        var response: String

        constructor(id:Long,response: String) {
                this.id=id
                this.response=response
        }
        constructor():this(0,"")
}