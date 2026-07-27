package com.eventeasy.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * <p>SpringDoc OpenAPI 3.0 Configuration defining Swagger UI metadata, security schemes, and server details for EventEasy API.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "BearerAuthentication";

    /**
     * Create OpenAPI bean definition with EventEasy documentation metadata and JWT security scheme.
     *
     * @return OpenAPI configuration object
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EventEasy Enterprise API")
                        .description("Production-ready RESTful API for EventEasy Modern Luxury Event Management SaaS Application.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("EventEasy Engineering")
                                .email("support@eventeasy.com")
                                .url("https://eventeasy.com"))
                        .license(new License()
                                .name("Proprietary License")
                                .url("https://eventeasy.com/terms")))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter valid JWT Bearer token for accessing protected EventEasy endpoints.")));
    }
}
