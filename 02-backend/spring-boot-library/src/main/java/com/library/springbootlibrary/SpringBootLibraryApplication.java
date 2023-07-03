package com.library.springbootlibrary;

import com.library.springbootlibrary.entity.Author;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootLibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootLibraryApplication.class, args);
		Author a=new Author(12,"dasd",123);
		System.out.println(a.getId());
	}

}
