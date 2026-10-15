package com.recoveryconnect.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI recoveryConnectOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Recovery Connect API")
                        .description("Privacy-First Recovery Resource Navigator REST API — ByteQuest Hackathon Track A (Tech for Recovery). " +
                                "Helps students and community members find verified counselling, recovery, support groups, campus care, and helplines.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Recovery Connect Team")
                                .email("support@recoveryconnect.local"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter your JWT token in the format: Bearer <token>")));
    }
}
