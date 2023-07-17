package com.library.springbootlibrary.config;//import org.springframework.context.annotation.Bean;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    private final String issuerUri="https://dev-27430343.okta.com/oauth2/default";
    @Bean
    public JwtDecoder jwtDecoder() {
        return JwtDecoders.fromIssuerLocation(issuerUri);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //    Disable Cross Site Request Forgery
        http.csrf().disable();

        //  Protect endpoints at  /api/<type>/secure/**

        http.authorizeHttpRequests(auth->
                auth
                        .antMatchers("/api/books/secure/**",
                                "/api/reviews/secure/**" )
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();
        //Protect endpoints at api/<type>/secure

        // CORS
        http.cors();

        http.setSharedObject(ContentNegotiationStrategy.class,new HeaderContentNegotiationStrategy());

        //Okta
        Okta.configureResourceServer401ResponseBody(http);



return http.build();
    }


}
