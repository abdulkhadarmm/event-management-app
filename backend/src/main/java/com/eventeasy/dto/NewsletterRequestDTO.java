package com.eventeasy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class NewsletterRequestDTO {

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email format")
    private String email;

    public NewsletterRequestDTO() {
    }

    public NewsletterRequestDTO(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
