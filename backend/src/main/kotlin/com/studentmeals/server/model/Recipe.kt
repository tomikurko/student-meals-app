package com.studentmeals.server.model

data class Recipe(
    val id: Int,
    val title: String,
    val description: String?,
    val ingredients: List<Ingredient>,
    val equipment: List<Equipment>
)
