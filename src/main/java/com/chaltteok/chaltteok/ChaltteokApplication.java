package com.chaltteok.chaltteok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class ChaltteokApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChaltteokApplication.class, args);
	}
}
