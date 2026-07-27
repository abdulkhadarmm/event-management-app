package com.eventeasy.repository;

import com.eventeasy.entity.EventPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository for performing persistence operations on {@link EventPackage} entities.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface EventPackageRepository extends JpaRepository<EventPackage, UUID> {

    /**
     * Retrieve all active non-deleted packages ordered by display order ascending.
     *
     * @return List of active EventPackage entities
     */
    List<EventPackage> findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Retrieve all non-deleted packages ordered by display order ascending.
     *
     * @return List of EventPackage entities
     */
    List<EventPackage> findByDeletedFalseOrderByDisplayOrderAsc();

    /**
     * Locate non-deleted package by UUID primary key.
     *
     * @param id package UUID
     * @return Optional containing matched EventPackage or empty Optional
     */
    Optional<EventPackage> findByIdAndDeletedFalse(UUID id);
}
