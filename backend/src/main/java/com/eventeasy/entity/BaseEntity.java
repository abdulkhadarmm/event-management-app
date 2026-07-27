package com.eventeasy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>Abstract base entity providing common primary key UUID definitions, JPA Auditing metadata fields,
 * and Soft Delete tracking flags.</p>
 * <p>Inherited by domain entities to maintain audit trail consistency and soft deletion support.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * Unique identifier using UUID for distributed systems readiness.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    /**
     * Timestamp recording when entity record was created.
     */
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp recording when entity record was last modified.
     */
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * User identifier or email responsible for creating record.
     */
    @CreatedBy
    @Column(name = "created_by", updatable = false, length = 100)
    private String createdBy;

    /**
     * User identifier or email responsible for last updating record.
     */
    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    /**
     * Soft delete indicator flag. True if record has been soft-deleted.
     */
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    /**
     * Timestamp recording when soft deletion occurred.
     */
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    /**
     * User identifier responsible for performing soft deletion.
     */
    @Column(name = "deleted_by", length = 100)
    private String deletedBy;

    /**
     * Perform soft deletion state transition populating deletion timestamp and auditor.
     *
     * @param performedBy username performing soft delete operation
     */
    public void markAsDeleted(String performedBy) {
        this.deleted = true;
        this.deletedAt = LocalDateTime.now();
        this.deletedBy = performedBy;
    }
}
