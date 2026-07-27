package com.eventeasy.controller;

import com.eventeasy.entity.NewsletterSubscriber;
import com.eventeasy.repository.NewsletterSubscriberRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/newsletter")
@PreAuthorize("hasRole('ADMIN')")
public class AdminNewsletterController {

    private final NewsletterSubscriberRepository subscriberRepository;

    public AdminNewsletterController(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriber>> getAllSubscribers() {
        List<NewsletterSubscriber> subscribers = subscriberRepository.findAll(Sort.by(Sort.Direction.DESC, "subscribedAt"));
        return ResponseEntity.ok(subscribers);
    }
}
