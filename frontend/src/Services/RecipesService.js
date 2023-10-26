import axios, { HttpStatusCode } from "axios";

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
const path = "http://localhost:8080/api/v1";

const getRecipes = async (title, minPrice, maxPrice, ingredients, disallowedEquipment) => {
  try {
    const params = {
      titleContains: title,
      minPrice,
      maxPrice,
      ingredientsContain: ingredients,
      equipmentDontContain: disallowedEquipment
    };
    const response = await axiosInstance.get(path + "/recipes", {
       params,
       paramsSerializer: {
        indexes: null,
       }
    });
    return response.data;
  } catch (e) {
    return [];
  }
};

const getRecipe = async (id) => {
  try {
    const response = await axiosInstance.get(path + "/recipes/" + id);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const postRecipe = async (title, author, pricePerMeal, amounts, ingredients, equipment, description) => {
  try {
    const response = await axiosInstance.post(path + "/recipes", {
      title,
      author: author && author != "" ? author : null,
      pricePerMeal: parseFloat(pricePerMeal),
      description,
      ingredients: ingredients.map((ingredient, index) => ({ amount: amounts[index], description: ingredient })),
      equipment: equipment.map((equipment) => ({ name: equipment }))
    });

    return response.status === HttpStatusCode.Created;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const removeRecipe = async (id) => {
  try {
    const response = await axiosInstance.delete(path + "/recipes/" + id);

    return response.status === HttpStatusCode.Ok;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { getRecipe, getRecipes, postRecipe, removeRecipe };
