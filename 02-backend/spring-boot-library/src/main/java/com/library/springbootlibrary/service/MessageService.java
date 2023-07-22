package com.library.springbootlibrary.service;

import com.library.springbootlibrary.entity.Message;
import com.library.springbootlibrary.repository.MessageRepository;
import com.library.springbootlibrary.requestmodels.AdminQuestionRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message messageRequest, String userEmail){
        Message message=new Message(messageRequest.getTitle(),messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }
    public void putMessage(AdminQuestionRequest adminQuestionRequest,String userEmail)throws Exception{
        Optional<Message> message=messageRepository.findById(adminQuestionRequest.getId());
        if(message.isEmpty()){
            throw new Exception("message not found");
        }
        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
