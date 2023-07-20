package com.library.springbootlibrary.responsemodels

import com.library.springbootlibrary.entity.Book

data class ShelfCurrentLoansResponse(var book: Book,var daysLeft: Long) {



}