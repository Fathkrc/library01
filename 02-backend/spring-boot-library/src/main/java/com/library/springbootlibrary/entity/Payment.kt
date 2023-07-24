package com.library.springbootlibrary.entity

import javax.persistence.*

@Entity
@Table(name = "payment")
data class Payment(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id:Long,
        @Column(name = "user_email")
        var userEmail:String?,
        @Column(name = "amount")
        var amount:Double
){
    constructor():this(0,"",0.0)

}