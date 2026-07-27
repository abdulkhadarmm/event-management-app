package com.eventeasy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * <p>Custom runtime exception thrown when requested entity or resource is not found in database.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructs a new ResourceNotFoundException with specified detail message.
     *
     * @param message descriptive error message
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a ResourceNotFoundException formatted with resource name, field name, and field value.
     *
     * @param resourceName name of entity resource
     * @param fieldName search field identifier
     * @param fieldValue value used during lookup
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
    }
}
