package com.studentmeals.server.model

data class Recipe(
    val id: Int,
    val title: String,
    val ingredients: List<Ingredient>
)
