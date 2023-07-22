package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import com.library.springbootlibrary.service.BookService;
import com.library.springbootlibrary.utils.ExtractJwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;


    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token)
            throws Exception {
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        return bookService.currentLoans(userEmail);
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

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token,
                           @RequestParam Long bookId) throws Exception{
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        bookService.returnBook(userEmail,bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long bookId) throws Exception{
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        bookService.renewLoan(userEmail,bookId);

    }
}
