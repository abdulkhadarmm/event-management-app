package com.eventeasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * <p>Main entry point for the EventEasy Enterprise Event Management SaaS Application backend.</p>
 * <p>Bootstraps the Spring ApplicationContext, initializes auto-configurations,
 * and launches the embedded servlet container.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 * @since 2026-07-27
 */
@SpringBootApplication
public class EventManagementApplication {

    /**
     * Launch application execution.
     *
     * @param args command-line arguments passed to application execution
     */
    public static void main(String[] args) {
        SpringApplication.run(EventManagementApplication.class, args);
    }
}
