import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../Actions";
import Nav from "../Nav/Nav";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import Paginated from "../Paginated/Paginated";
import LoadingPage from "../LoadingPage/LoadingPage";
import styles from "./Home.module.css";
import Footer from "../Footer/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;

  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipes,
    indexOfLastRecipes
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipe());
  }, [dispatch]);
  console.log(currentRecipes);
  console.log(allRecipes);
  return (
    <div>
      {allRecipes.length > 0 ? (
        <div>
          <Nav />
          <div className={styles.homeContainer}>
            <div className={styles.filterContainer}>
              <Filters />
            </div>
            <div>
              <div className={styles.cardContainer}>
                {currentRecipes?.map((el, index) => {
                  return (
                    <div key={`card${index}`}>
                      <div>
                        <Card
                          img={el.image}
                          name={el.name}
                          diets={el.diets}
                          id={el.id}
                          healthScore={el.healthScore}
                          createdInDb={el.createdInDb}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.paginationHome}>
              <Paginated
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                pagination={pagination}
                currentRecipes={currentRecipes}
                currentPage={currentPage}
              />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
