package com.studentmeals.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class StudentMealsApplication

fun main(args: Array<String>) {
	runApplication<StudentMealsApplication>(*args)
}
