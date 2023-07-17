package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.service.BookService;
import com.library.springbootlibrary.utils.ExtractJwt;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;


    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token,
                             @RequestParam Long bookId) throws Exception {


    String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
    return bookService.checkoutBook(userEmail,bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByuser(@RequestHeader(value = "Authorization") String token,
                                      @RequestParam Long bookId){
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        return bookService.checkBookByUser(userEmail,bookId);

    }
    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token){
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
      return  bookService.currentLoansCount(userEmail);
    }
}
