package com.library.springbootlibrary.service;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.entity.Checkout;
import com.library.springbootlibrary.entity.History;
import com.library.springbootlibrary.repository.BookRepository;
import com.library.springbootlibrary.repository.CheckoutRepository;
import com.library.springbootlibrary.repository.HistoryRepository;
import com.library.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {

    private final BookRepository bookRepository;

    private final CheckoutRepository checkoutRepository;
    private final HistoryRepository historyRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
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
        checkout.setCheckoutDate(LocalDate.now().toString());
        checkout.setUserEmail(userEmail);
        checkout.setBookId(book.get().getId());
        checkout.setReturnDate(LocalDate.now().plusDays(7).toString());

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


public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception{
         List<ShelfCurrentLoansResponse> loansList= new ArrayList<>();
         List<Checkout> checkoutList=checkoutRepository.findBooksByUserEmail(userEmail);
         List<Long> bookIdList=new ArrayList<>();

         for(Checkout i :checkoutList){
             bookIdList.add(i.getBookId());
         }
         List<Book> books=bookRepository.findBooksByBookIds(bookIdList);

    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");

    for(Book b:books){
        Optional<Checkout> checkout=checkoutList.stream().filter(c->c.getBookId()==b.getId()).findFirst();

        if(checkout.isPresent()){
            Date d1=sdf.parse(checkout.get().getReturnDate());
            Date d2=sdf.parse(LocalDate.now().toString());

            TimeUnit time=TimeUnit.DAYS;
            Long difference_in_time=time.convert(d1.getTime()-d2.getTime(), TimeUnit.MILLISECONDS);

            loansList.add(new ShelfCurrentLoansResponse(b, difference_in_time));

        }
    }
    return loansList;
}

public void returnBook(String userEmail, Long bookId) throws Exception{

        Optional<Book> book=bookRepository.findById(bookId);
        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(!book.isPresent()|| validateCheckout==null){
            throw new Exception("Book does not exist or checked out by user");

        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable()+1);
        bookRepository.save(book.get());
        checkoutRepository.deleteById(validateCheckout.getId());
        History history=new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                validateCheckout.getReturnDate(),
                book.get().getTitle(),
                book.get().getAuthor(),
                book.get().getDescription(),
                book.get().getImg()
        );
        historyRepository.save(history);

}

public void renewLoan(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(validateCheckout==null){
            throw new Exception("book does not exist or not checked");
        }
    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
    Date d1=sdf.parse(validateCheckout.getReturnDate());
    Date d2=sdf.parse(LocalDate.now().toString());

    if(d1.compareTo(d2)>0|| d1.compareTo(d2)==0){
        validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
        checkoutRepository.save(validateCheckout);
    }
}
}
