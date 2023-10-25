import axios, { HttpStatusCode } from "axios";

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
const path = "http://localhost:8080/api/v1";

const getRecipes = async (title, ingredients) => {
  try {
    const params = {
      titleContains: title,
      ingredientsContain: ingredients
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

const postRecipe = async (title, amounts, ingredients, equipment) => {
  try {
    const response = await axiosInstance.post(path + "/recipes", {
      title,
      ingredients: ingredients.map((ingredient, index) => ({ amount: amounts[index], description: ingredient })),
      equipment: equipment.map((equipment) => ({ name: equipment }))
    });

    return response.status === HttpStatusCode.Created;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { getRecipe, getRecipes, postRecipe };
