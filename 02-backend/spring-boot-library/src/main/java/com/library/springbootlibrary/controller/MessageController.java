package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.entity.Message;
import com.library.springbootlibrary.service.MessageService;
import com.library.springbootlibrary.utils.ExtractJwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        messageService.postMessage(messageRequest,userEmail);

    }
}
