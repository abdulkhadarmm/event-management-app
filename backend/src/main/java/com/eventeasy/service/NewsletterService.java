package com.eventeasy.service;

import com.eventeasy.dto.NewsletterRequestDTO;
import com.eventeasy.entity.NewsletterSubscriber;

public interface NewsletterService {

    NewsletterSubscriber subscribe(NewsletterRequestDTO requestDTO);
}
