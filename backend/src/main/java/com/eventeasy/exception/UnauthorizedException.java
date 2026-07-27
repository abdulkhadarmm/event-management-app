package com.eventeasy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * <p>Custom runtime exception thrown when authentication validation or JWT verification fails.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

    /**
     * Constructs a new UnauthorizedException with specified detail message.
     *
     * @param message descriptive error message
     */
    public UnauthorizedException(String message) {
        super(message);
    }
}
