package com.buana.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @SuppressWarnings({ "removal", "deprecation" })
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for testing purposes (Not recommended for production)
                .authorizeRequests(requests -> requests
                        .requestMatchers("/api/**").permitAll() // Allow all requests to API endpoints
                        .anyRequest().authenticated()); // Authenticate other requests if needed

        return http.build();
    }
}
