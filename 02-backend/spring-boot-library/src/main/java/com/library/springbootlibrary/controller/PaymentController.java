package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.library.springbootlibrary.service.PaymentService;
import com.library.springbootlibrary.utils.ExtractJwt;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("https://localhost:3000")
@RequestMapping("/api/payment/secure")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws Exception{

        PaymentIntent paymentIntent=paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr=paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr,HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        if(userEmail==null){
            throw new Exception("user email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }

}
