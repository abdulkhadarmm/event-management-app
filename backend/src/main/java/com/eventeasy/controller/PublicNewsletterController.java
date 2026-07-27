package com.eventeasy.controller;

import com.eventeasy.dto.NewsletterRequestDTO;
import com.eventeasy.entity.NewsletterSubscriber;
import com.eventeasy.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/newsletter")
public class PublicNewsletterController {

    private final NewsletterService newsletterService;

    public PublicNewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, Object>> subscribe(@Valid @RequestBody NewsletterRequestDTO requestDTO) {
        NewsletterSubscriber subscriber = newsletterService.subscribe(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "status", "SUCCESS",
                "message", "Submitted",
                "email", subscriber.getEmail(),
                "subscribedAt", subscriber.getSubscribedAt()
        ));
    }
}
