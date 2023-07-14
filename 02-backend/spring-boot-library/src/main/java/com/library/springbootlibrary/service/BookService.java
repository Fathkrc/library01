package com.library.springbootlibrary.service;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.entity.Checkout;
import com.library.springbootlibrary.repository.BookRepository;
import com.library.springbootlibrary.repository.CheckoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    private final BookRepository bookRepository;

    private final CheckoutRepository checkoutRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook(String userEmail,Long bookId) throws Exception{

        Optional<Book> book=bookRepository.findById(bookId);

        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(!book.isPresent()||validateCheckout!=null||book.get().getCopiesAvailable()<=0){
            throw new Exception("Book does not exist or already checked out by user ");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable()-1);
        bookRepository.save(book.get());
        Checkout checkout=new Checkout(userEmail,LocalDate.now().toString(),LocalDate.now().plusDays(7).toString(),
                book.get().getId() );
//        checkout.setCheckoutDate(LocalDate.now().toString());
//        checkout.setUserEmail(userEmail);
//        checkout.setBookId(book.get().getId());
//        checkout.setReturnDate(LocalDate.now().plusDays(7).toString());

        checkoutRepository.save(checkout);
        return book.get();
    }

    public Boolean checkBookByUser(String userEmail, Long bookId){

        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(validateCheckout!=null){
            return true;
        }
        else{
            return false;
        }
    }
    public int currentLoansCount(String userEmail){
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }
}
