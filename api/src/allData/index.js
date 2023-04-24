require("dotenv").config();
const {
  API_KEY_1,
  API_KEY_2,
  API_KEY_3,
  API_KEY_4,
  API_KEY_5,
  API_KEY_6,
  API_KEY_7,
} = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");

const allApiData = async function () {
  try {
    const urlApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_6}&number=100&addRecipeInformation=true`
    );
    const infoApi = urlApi.data.results.map((el) => {
      return {
        id: el.id,
        name: el.title,
        summary: el.summary.replace(/<[^>]+>/g, ""),
        diets: el.diets.map((d) => {
          return { name: d };
        }),
        healthScore: el.healthScore,
        image: el.image,
        createdInDb: false,
        stepByStep: el.analyzedInstructions[0]?.steps.map((paso) => {
          return `${paso.number}- ${paso.step}`;
        }),
      };
    });
    return infoApi;
  } catch (err) {
    console.log(err);
  }
};

const allDbData = async function () {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const allData = async function () {
  try {
    const apiData = await allApiData();
    const dbData = await allDbData();

    const allDataContainer = apiData.concat(dbData);

    return allDataContainer;
  } catch (err) {
    console.log(err);
  }
};

const allDiets = async function () {
  try {
    const dietList = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_6}&number=100&addRecipeInformation=true`
    );
    const repeated = await dietList.data.results.map((d) => d.diets).flat(1);
    return [...new Set(repeated)];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allData,
  allDbData,
  allApiData,
  allDiets,
};
