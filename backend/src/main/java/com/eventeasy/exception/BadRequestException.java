package com.eventeasy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * <p>Custom runtime exception thrown when client request parameters or business validations fail.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    /**
     * Constructs a new BadRequestException with specified detail message.
     *
     * @param message descriptive error message
     */
    public BadRequestException(String message) {
        super(message);
    }
}
