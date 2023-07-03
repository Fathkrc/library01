package com.library.springbootlibrary.entity

import jakarta.persistence.*

@Entity
@Table
data class Author(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id:Long,
        val name : String ,
        val category:Int ){


}
