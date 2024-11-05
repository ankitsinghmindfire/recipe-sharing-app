import { Routes, Route } from "react-router-dom";
import { ViewAllRecipes } from "../pages/view-all-recipes/ViewAllRecipes";
import { AddRecipe } from "../pages/addRecipe/AddRecipe";
// import { Recipe } from "../pages/view-single-recipe/Recipe";
import PrivateComponent from "../components/auth/PrivateComponent";
export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateComponent />}>
        {/* <Route path="/recipe" element={<Recipe />} /> */}
        <Route path="/" element={<ViewAllRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
      </Route>
    </Routes>
  );
};
