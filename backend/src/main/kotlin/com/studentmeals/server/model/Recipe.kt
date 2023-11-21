package com.studentmeals.server.model

import java.math.BigDecimal

data class Recipe(
    val id: Int,
    val title: String,
    val author: String?,
    val description: String?,
    val pricePerMeal: BigDecimal?,
    val imgData: String?,
    val imgUrl: String?,
    val ingredients: List<Ingredient>,
    val equipment: List<Equipment>
)
