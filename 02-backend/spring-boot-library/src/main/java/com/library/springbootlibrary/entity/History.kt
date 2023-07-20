package com.library.springbootlibrary.entity

import javax.persistence.*

@Entity
@Table(name = "History")
data class History(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        var id:Long,
        @Column(name = "user_email")
        var userEmail:String,
        var checkoutDate:String?,
        var returnedDate:String?,
        var title:String?,
        var author:String?,
        var description:String?,
        var img:String?

                   )
{
    constructor(userEmail: String,checkoutDate: String?,returnedDate: String?,title: String?,author: String?,
    description: String?,img: String?)
            : this(0,userEmail,checkoutDate,returnedDate,title, author, description, img)

constructor() : this("","","","","","","")
}