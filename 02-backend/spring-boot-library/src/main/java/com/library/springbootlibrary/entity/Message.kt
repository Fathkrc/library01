package com.library.springbootlibrary.entity

import javax.persistence.*

@Entity
@Table(name = "messages")
data class Message(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id:Long?,
        @Column(name = "user_email")
        var userEmail:String?,
        @Column(name = "title")
        var title:String?,
        @Column(name = "question")
        var question:String?,
        @Column(name = "admin_email")
        var adminEmail:String?,
        @Column(name = "response")
        var response:String?,
        @Column(name = "closed")
        var closed:Boolean=false
) {
    constructor(title:String?,question: String?)
        :this(0,"",title,question,"","",false)

    constructor() : this(0,"", "","","","")

}