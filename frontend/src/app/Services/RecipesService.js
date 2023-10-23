import axios from "axios";

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

export { getRecipes };
