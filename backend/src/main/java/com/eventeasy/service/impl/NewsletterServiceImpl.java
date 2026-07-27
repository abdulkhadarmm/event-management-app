package com.eventeasy.service.impl;

import com.eventeasy.dto.NewsletterRequestDTO;
import com.eventeasy.entity.NewsletterSubscriber;
import com.eventeasy.repository.NewsletterSubscriberRepository;
import com.eventeasy.service.NewsletterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NewsletterServiceImpl implements NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;

    public NewsletterServiceImpl(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @Override
    public NewsletterSubscriber subscribe(NewsletterRequestDTO requestDTO) {
        String cleanEmail = requestDTO.getEmail().trim().toLowerCase();

        return subscriberRepository.findByEmailIgnoreCase(cleanEmail)
                .orElseGet(() -> {
                    NewsletterSubscriber subscriber = new NewsletterSubscriber(cleanEmail);
                    return subscriberRepository.save(subscriber);
                });
    }
}
