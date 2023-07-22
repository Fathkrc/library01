package com.library.springbootlibrary.service;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.repository.BookRepository;
import com.library.springbootlibrary.repository.CheckoutRepository;
import com.library.springbootlibrary.repository.ReviewRepository;
import com.library.springbootlibrary.requestmodels.AddBookRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {
    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;
    private final CheckoutRepository checkoutRepository;

    public AdminService(BookRepository bookRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseBookQuantity(Long bookId) throws Exception{
        Optional<Book> book=bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new Exception("Book has not been found");
        }
        book.get().setCopies(book.get().getCopies()+1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable()+1);
        bookRepository.save(book.get());
    }
    public void decreaseBookQuantity(Long bookId) throws Exception{
        Optional<Book> book=bookRepository.findById(bookId);
        if(!book.isPresent()|| book.get().getCopiesAvailable()<=0|| book.get().getCopies()<=0){
            throw new Exception("Book has not been found or locked");
        }
        book.get().setCopies(book.get().getCopies()-1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable()-1);
        bookRepository.save(book.get());
    }
    public void postBook(AddBookRequest bookRequest){
        Book book=new Book();
        book.setTitle(bookRequest.getTitle());
        book.setAuthor(bookRequest.getAuthor());
        book.setCategory(bookRequest.getCategory());
        book.setCopiesAvailable(bookRequest.getCopies());
        book.setImg(bookRequest.getImg());
        book.setDescription(bookRequest.getDescription());
        book.setCopies(bookRequest.getCopies());
        bookRepository.save(book);
    }
    public void deleteBook(Long bookId) throws Exception{
        Optional<Book> book=bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new Exception("Book has not been found or locked");
        }
        bookRepository.delete(book.get());
        checkoutRepository.deleteAllByBookId(book.get().getId());
        reviewRepository.deleteAllByBookId(book.get().getId());
    }

}
