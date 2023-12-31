import axios, { HttpStatusCode } from "axios";

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
//const path = "http://localhost:8080/api/v1";
const path = "http://ec2-16-16-187-196.eu-north-1.compute.amazonaws.com:8080/api/v1";

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
    console.log(e);
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

const postRecipe = async (title, author, pricePerMeal, imgData, amounts, ingredients, equipment, description) => {
  try {
    const response = await axiosInstance.post(path + "/recipes", {
      title,
      author: author && author != "" ? author : null,
      pricePerMeal: parseFloat(pricePerMeal),
      description,
      imgData,
      ingredients: ingredients.map((ingredient, index) => ({ amount: amounts[index], description: ingredient })),
      equipment: equipment.map((equipment) => ({ name: equipment }))
    });

    return response.status === HttpStatusCode.Created ? response.data.id : null;
  } catch (e) {
    console.log(e);
    return null;
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
