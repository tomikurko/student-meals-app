package com.studentmeals.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class StudentMealsApplication {
	@Bean
	fun corsConfigurer(): WebMvcConfigurer {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**")
					.allowedOrigins("http://localhost:3000", "http://www.studentmeals.site")
					.allowedMethods("GET", "POST", "DELETE")
			}
		}
	}
}

fun main(args: Array<String>) {
	runApplication<StudentMealsApplication>(*args)
}
