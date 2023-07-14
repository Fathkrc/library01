package com.library.springbootlibrary.config;

import com.library.springbootlibrary.entity.Book;
import com.library.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private final String allowedOrigin="http://localhost:3000";



    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

        HttpMethod[] theUnsportedActions={
                HttpMethod.POST,
                HttpMethod.DELETE,
                HttpMethod.PUT,
                HttpMethod.PATCH};
        // We are doing able to be reached our ids from front end
                config.
                exposeIdsFor(Book.class);
                config.
                exposeIdsFor(Review.class);

        // Restricting access to Http methods other than get mothods with our custom method
        // BOOK.CLASS
        disableHttpMethods(Book.class,
                config,
                theUnsportedActions);
        // REVIEW.CLASS
        disableHttpMethods(Review.class,
                config,
                theUnsportedActions);
        // Configure CORS Mapping
        cors.addMapping(config.getBasePath()+"/**")
                .allowedOrigins(allowedOrigin);

    }
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata,httpMethods)-> httpMethods.
                        disable(unsportedActions))
                .withCollectionExposure((metdata,httpMethods)-> httpMethods.
                        disable(unsportedActions));

    }
}
