package com.library.springbootlibrary.controller;

import com.library.springbootlibrary.entity.Message;
import com.library.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.library.springbootlibrary.service.MessageService;
import com.library.springbootlibrary.utils.ExtractJwt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
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
    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
    @RequestBody AdminQuestionRequest adminRequest) throws Exception {
        String userEmail= ExtractJwt.payloadJwtExtraction(token,"\"sub\"");
        String admin=ExtractJwt.payloadJwtExtraction(token,"\"userType\"");
        if(admin==null || !admin.equals("admin")){
            throw new Exception("Administration page only.");
        }
        messageService.putMessage(adminRequest,userEmail);

    }

}
