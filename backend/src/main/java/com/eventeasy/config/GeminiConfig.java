package com.eventeasy.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * <p>Spring Configuration binding Google Gemini API credentials and HTTP client communication components.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Getter
@Configuration
public class GeminiConfig {

    @Value("${gemini.api.key:${GEMINI_API_KEY:}}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String apiUrl;

    @Value("${gemini.api.model:gemini-1.5-flash}")
    private String modelName;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
