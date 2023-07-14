package com.library.springbootlibrary.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        //Disable Cross Site Request Forgery
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(t->t.requestMatchers("/api/books/secure/**," +
                        "api/messages/secure/**",
                        "/api/messages/secure/**",
                        "api/admin/secure/**")
                        .authenticated());
        //Protect endpoints at api/<type>/secure
                http.oauth2ResourceServer(
                        t->t.jwt(Customizer.withDefaults()));
        return null;
    }
}
