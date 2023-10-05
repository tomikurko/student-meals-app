package com.studentmeals.server.db

import com.studentmeals.server.db.jooq.tables.records.IngredientsRecord
import com.studentmeals.server.db.jooq.tables.records.RecipesRecord
import com.studentmeals.server.model.Ingredient
import com.studentmeals.server.model.Recipe


fun RecipesRecord.toModel(): Recipe = Recipe(id!!, title!!, emptyList())

fun IngredientsRecord.toModel(): Ingredient = Ingredient(id!!, amount, description!!)
