package com.library.springbootlibrary.requestmodels

import java.util.*

class ReviewRequest {
    var rating:Double? = 0.0
    var bookId: Long? = 0
    var reviewDescription: String? = null

    constructor(rating: Double?, bookId: Long?, reviewDescription: String?) {
        this.rating = rating
        this.bookId = bookId
        this.reviewDescription = reviewDescription
    }
    constructor() {}
}