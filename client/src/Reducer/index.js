const initialState = {
  recipes: [],
  allRecipes: [],
  Diets: [],
  detail: [],
  favorites: [],
};

function rooReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        Diets: action.payload,
      };

    case "FILTER_BY_DIET":
      const recipes = state.allRecipes;
      const recipesWithDiet = recipes.filter((r) => {
        let names = r.diets.map((d) => d.name);
        if (names.includes(action.payload)) {
          let res = r;
          return res;
        } else {
          return undefined;
        }
      });
      return {
        ...state,
        recipes:
          action.payload === "default" ? state.allRecipes : recipesWithDiet,
      };
    case "ORDEN_BY_NAME":
      let orderedRecipes = [...state.recipes];
      orderedRecipes =
        action.payload === "asc"
          ? orderedRecipes.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
          : orderedRecipes.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: [...orderedRecipes],
      };
    case "ORDEN_BY_SCORE":
      let orderedRecipes2 = [...state.recipes];
      orderedRecipes2 =
        action.payload === "asc"
          ? orderedRecipes2.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            })
          : orderedRecipes2.sort((a, b) => {
              if (a.healthScore < b.healthScore) return -1;
              if (a.healthScore > b.healthScore) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: [...orderedRecipes2],
      };
    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: {},
      };
    case "DETAIL_CARD":
      return {
        ...state,
        detail: action.payload,
      };
    case "SEARCH_BAR":
      let resultSearch = [...state.allRecipes];
      return {
        ...state,
        recipes: resultSearch.length > 0 ? action.payload : state.allRecipes,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };
    case "ADD_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "DELETE_FAVORITES":
      const favoritesFilter = state.favorites.filter(
        (word) => word.id !== action.payload[0].id
      );
      return {
        ...state,
        favorites: favoritesFilter,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rooReducer;
