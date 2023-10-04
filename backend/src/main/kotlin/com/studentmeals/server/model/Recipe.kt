package com.studentmeals.server.model

import com.studentmeals.server.db.jooq.tables.records.RecipesRecord

data class Recipe(
    val id: Int,
    val title: String
)

fun RecipesRecord.toModel(): Recipe = Recipe(id!!, title!!)
