package com.library.springbootlibrary.entity

import jakarta.persistence.*

@Entity
@Table(name = "checkout")
 data class Checkout @JvmOverloads constructor(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        val id:Long =0,
        @Column(name = "user_email")
        var userEmail:String?="",
        @Column(name = "checkout_date")
        var checkoutDate:String?="",
        @Column(name = "return_date")
        var returnDate:String?="",

        @Column(name = "book_id")
        var bookId:Long?=0


){
       constructor(userEmail: String, userEmail1: String, checkoutDate: String, Id: Long) : this() {
       }


}