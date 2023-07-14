package com.library.springbootlibrary.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "review")
class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long = 0

    @Column(name = "user_email")
    var userEmail: String? = ""

    @Column(name = "date")
    var date: Date? = null

    @Column(name = "rating")
    var rating:Double? = 0.0

    @Column(name = "book_id")
    var bookId: Long? = 0

    @Column(name = "review_description")
    var reviewDescription: String? =""

    constructor( userEmail: String?, date: Date?, rating: Double, bookId: Long, reviewDescription: String?) {
        this.userEmail = userEmail
        this.date = date
        this.rating = rating
        this.bookId = bookId
        this.reviewDescription = reviewDescription
    }

    constructor() {}
}