package com.studentmeals.server.rest

import com.studentmeals.server.db.jooq.tables.references.EQUIPMENT
import com.studentmeals.server.db.jooq.tables.references.INGREDIENTS
import com.studentmeals.server.db.jooq.tables.references.RECIPES
import com.studentmeals.server.db.toModel
import com.studentmeals.server.model.Equipment
import com.studentmeals.server.model.Ingredient
import com.studentmeals.server.model.Recipe
import org.jooq.DSLContext
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/v1")
class RecipesController(private val create: DSLContext) {

    @GetMapping("/recipes", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getAll(@RequestParam(required = false) titleContains: String?): List<Recipe> =
        (if (titleContains == null)
             create
                 .selectFrom(RECIPES)
                 .fetch()
         else
             create
                 .selectFrom(RECIPES)
                 .where(RECIPES.TITLE.containsIgnoreCase(titleContains))
                 .fetch()
        ).map { it.toModel().let { it.copy(ingredients = getIngredients(it.id), equipment = getEquipment(it.id)) } }

    @GetMapping("/recipes/{id}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getOne(@PathVariable id: Int): Recipe? =
        create.selectFrom(RECIPES)
              .where(RECIPES.ID.eq(id))
              .fetchOne()
              ?.let { it.toModel().copy(ingredients = getIngredients(id), equipment = getEquipment(id)) }
              ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "recipe not found")

    @PostMapping("/recipes", consumes = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseStatus(HttpStatus.CREATED)
    fun postOne(@RequestBody recipe: Recipe) {
        val recipeRecord = create
            .insertInto(RECIPES, RECIPES.TITLE, RECIPES.DESCRIPTION)
            .values(recipe.title, recipe.description)
            .returningResult(RECIPES.ID)
            .fetchOne()

        if (recipeRecord != null) {
            val recipeId = recipeRecord.getValue(RECIPES.ID)!!

            val insertedIngredientsCount = recipe.ingredients.sumOf { ingredient ->
                create
                    .insertInto(INGREDIENTS, INGREDIENTS.RECIPE_ID, INGREDIENTS.AMOUNT, INGREDIENTS.DESCRIPTION)
                    .values(recipeId, ingredient.amount, ingredient.description)
                    .execute()
            }

            if (insertedIngredientsCount != recipe.ingredients.size) {
                throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "failed to insert one or more ingredients to database")
            }

            val insertedEquipmentCount = recipe.equipment.sumOf { equipment ->
                create
                    .insertInto(EQUIPMENT, EQUIPMENT.RECIPE_ID, EQUIPMENT.NAME)
                    .values(recipeId, equipment.name)
                    .execute()
            }

            if (insertedEquipmentCount != recipe.equipment.size) {
                throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "failed to insert one or more equipment to database")
            }
        } else {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "failed to insert a recipe to database")
        }
    }

    @DeleteMapping("/recipes/{id}")
    @ResponseStatus(HttpStatus.OK)
    fun deleteOne(@PathVariable id: Int) =
        if (create.deleteFrom(RECIPES)
            .where(RECIPES.ID.eq(id))
            .execute() == 1) Unit else throw ResponseStatusException(HttpStatus.NOT_FOUND, "recipe not found")

    private fun getIngredients(recipeId: Int): List<Ingredient> =
        create
            .selectFrom(INGREDIENTS)
            .where(INGREDIENTS.RECIPE_ID.eq(recipeId))
            .fetch()
            .map { it.toModel() }

    private fun getEquipment(recipeId: Int): List<Equipment> =
        create
            .selectFrom(EQUIPMENT)
            .where(EQUIPMENT.RECIPE_ID.eq(recipeId))
            .fetch()
            .map { it.toModel() }
}
