import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InitialPage from "./Components/InitialPage/InitialPage";
import Home from "./Components/Home/Home";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe.jsx";
import Details from "./Components/Details/Details";
import Error404 from "./Components/Error 404/Error404";
import Favorites from "./Components/Favorites/Favorites";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" component={InitialPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/CreateRecipe" component={CreateRecipe} />
          <Route exact path="/recipes/:id" component={Details} />
          <Route exact path="/favorites" component={Favorites} />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
