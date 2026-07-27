package com.eventeasy.repository;

import com.eventeasy.entity.EventTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository for performing persistence operations on {@link EventTheme} entities.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface EventThemeRepository extends JpaRepository<EventTheme, UUID> {

    /**
     * Retrieve all active non-deleted themes ordered by display order ascending.
     *
     * @return List of active EventTheme entities
     */
    List<EventTheme> findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Retrieve all non-deleted themes ordered by display order ascending.
     *
     * @return List of EventTheme entities
     */
    List<EventTheme> findByDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Locate non-deleted theme by UUID primary key.
     *
     * @param id theme UUID
     * @return Optional containing matched EventTheme or empty Optional
     */
    Optional<EventTheme> findByIdAndDeletedFalse(UUID id);
}
