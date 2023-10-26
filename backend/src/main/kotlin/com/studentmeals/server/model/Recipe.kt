package com.studentmeals.server.model

import java.math.BigDecimal

data class Recipe(
    val id: Int,
    val title: String,
    val description: String?,
    val pricePerMeal: BigDecimal?,
    val ingredients: List<Ingredient>,
    val equipment: List<Equipment>
)
