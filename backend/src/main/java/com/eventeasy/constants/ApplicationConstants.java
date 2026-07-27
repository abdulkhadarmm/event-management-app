package com.eventeasy.constants;

/**
 * <p>General application-wide constant declarations for EventEasy SaaS Platform.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public final class ApplicationConstants {

    /**
     * Private constructor to enforce utility class design.
     */
    private ApplicationConstants() {
        throw new UnsupportedOperationException("Utility class should not be instantiated.");
    }

    /**
     * Official application name.
     */
    public static final String APP_NAME = "EventEasy";

    /**
     * Root API path version 1 prefix.
     */
    public static final String API_V1_PREFIX = "/api/v1";

    /**
     * Default system user identifier for system automated actions.
     */
    public static final String SYSTEM_USER = "SYSTEM";
}
