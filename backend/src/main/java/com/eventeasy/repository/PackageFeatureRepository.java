package com.eventeasy.repository;

import com.eventeasy.entity.PackageFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * <p>Spring Data JPA Repository for performing persistence operations on {@link PackageFeature} entities.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface PackageFeatureRepository extends JpaRepository<PackageFeature, UUID> {
}
