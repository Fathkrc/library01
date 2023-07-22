package com.library.springbootlibrary.requestmodels

class AddBookRequest {
     var title:String;
     var author:String;
     var description:String?;
     var copies:Int;
     var category:String;
     var img:String?;

    constructor(title: String, author: String, description: String, copies: Int, category: String, img: String) {
        this.title = title
        this.author = author
        this.description = description
        this.copies = copies
        this.category = category
        this.img = img
    }
    constructor():this("","","",0,"","")

}