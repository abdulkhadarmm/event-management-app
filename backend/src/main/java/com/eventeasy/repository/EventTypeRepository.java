package com.eventeasy.repository;

import com.eventeasy.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository for performing persistence operations on {@link EventType} entities.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface EventTypeRepository extends JpaRepository<EventType, UUID> {

    /**
     * Retrieve all active non-deleted event types ordered by display order ascending.
     *
     * @return List of active EventType entities
     */
    List<EventType> findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Retrieve all non-deleted event types ordered by display order ascending.
     *
     * @return List of EventType entities
     */
    List<EventType> findByDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Locate non-deleted event type by unique code identifier.
     *
     * @param code event type code
     * @return Optional containing matched EventType or empty Optional
     */
    Optional<EventType> findByCodeAndDeletedFalse(String code);

    /**
     * Verify if an active non-deleted event type exists with specified code.
     *
     * @param code event type code
     * @return true if exists, false otherwise
     */
    boolean existsByCodeAndDeletedFalse(String code);
}
