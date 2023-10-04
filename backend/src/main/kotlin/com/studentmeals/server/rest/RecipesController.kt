package com.studentmeals.server.rest

import com.studentmeals.server.db.jooq.tables.references.RECIPES
import com.studentmeals.server.model.Recipe
import com.studentmeals.server.model.toModel
import org.jooq.DSLContext
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/v1/recipes")
class RecipesController(private val create: DSLContext) {

    @GetMapping("/", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getAll(): List<Recipe> =
        create.selectFrom(RECIPES)
              .fetch()
              .map { it.toModel() }

    @GetMapping("/{id}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getOne(@PathVariable id: Int): Recipe? =
        create.selectFrom(RECIPES)
              .where(RECIPES.ID.eq(id))
              .fetchOne()
              ?.let { it.toModel() }
              ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "recipe not found")

    @PostMapping("/", consumes = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseStatus(HttpStatus.CREATED)
    fun postOne(@RequestBody recipe: Recipe) {
        create.insertInto(RECIPES, RECIPES.TITLE)
              .values(recipe.title)
              .execute()
    }
}
