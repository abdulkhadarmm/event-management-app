package com.eventeasy.enums;

/**
 * <p>Enumeration representing operational state of user accounts within EventEasy.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public enum UserStatus {

    /**
     * Account is active and allowed to perform system operations.
     */
    ACTIVE,

    /**
     * Account has been disabled or suspended by administrator.
     */
    INACTIVE,

    /**
     * Account is locked due to security or administrative reasons.
     */
    LOCKED
}
