const { Recipe, Diet } = require("../db");
const model = require("../allData/index.js");
//model
//   allData para getName
//   allDbData,
//   allApiData,

const getName = async (req, res) => {
  try {
    const { name } = req.query;
    // este name puede ser nombre de receta o tipo de dieta
    const recipes = await model.allData();
    if (name) {
      let queryDiet = await Diet.findOne({
        where: { name: name.toLowerCase() },
      });
      if (queryDiet) {
        //caso dietQuery
        let byDietQuery = await recipes.filter((r) => {
          let names = r.diets.map((d) => d.name);
          if (names.includes(name)) return r;
        });
        byDietQuery.length
          ? res.status(200).send(byDietQuery)
          : res
              .status(400)
              .send("No existen recetas con el tipo de dieta indicado");
      } else {
        //caso recipeQuery
        let recipeQuery = await recipes.filter((r) =>
          r.name.toLowerCase().includes(name.toString().toLowerCase())
        );
        recipeQuery.length
          ? res.status(200).send(recipeQuery)
          : res.status(400).send("No existen recetas con ese nombre");
      }
    }
    //en caso de que no haya query name, devuelvo todo
    else res.status(200).send(recipes);
  } catch (err) {
    console.log(err);
  }
};

//getRecipe
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const recipes = await model.allData();
      //en caso de que se haya ingresado un id
      const recipesID = await recipes.filter((r) => r.id == id);
      recipesID.length
        ? res.send(recipesID[0])
        : res.status(404).send("No se encontró receta");
    } else {
      //en caso de que no se haya ingresado un id
      res.send("Ingresar un ID por favor");
    }
  } catch (err) {
    console.log(err);
  }
};

const postRecipe = async (req, res) => {
  try {
    const { name, summary, healthScore, image, stepByStep, diet } = req.body;
    const newRecipe = await Recipe.create({
      name,
      summary,
      image,
      healthScore,
      stepByStep,
    });
    diet.map(async (diets) => {
      const dbDiet = await Diet.findOrCreate({
        where: {
          name: diets,
        },
      });
      newRecipe.addDiet(dbDiet[0]);
    });

    res.send("¡Receta creada con éxito!");
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getName,
  postRecipe,
  getRecipe,
};
