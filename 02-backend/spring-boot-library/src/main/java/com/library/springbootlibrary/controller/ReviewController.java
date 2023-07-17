package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.entity.Review;
import com.library.springbootlibrary.requestmodels.ReviewRequest;
import com.library.springbootlibrary.service.ReviewService;
import com.library.springbootlibrary.utils.ExtractJwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {


    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token ,
                           @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        if(userEmail==null){
            throw new Exception("user email does not exist");
        }
        reviewService.postReview(userEmail,reviewRequest);
    }

 @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token ,
                                    @RequestParam Long bookId) throws Exception {
     String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
     if(userEmail==null){
         throw new Exception("user email does not exist");
     }
     return  reviewService.userReviewListed(userEmail,bookId);
 }
}
