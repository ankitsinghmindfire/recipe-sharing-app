import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const ViewAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await request({
        method: "GET",
        url: "recipe",
      });
      console.log("response", response);

      if (!response.error) {
        response.map((recipe) => {
          const blob = new Blob([Int8Array.from(recipe.image.data.data)], {
            type: recipe.image.contentType,
          });

          const img = window.URL.createObjectURL(blob);
          setImage([...image, img]);
        });

        setRecipes(response);
      } else {
        toast.error("Unable to fetch recipes, Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("recipes", recipes);

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "90px" }}>
      <ToastContainer />
      <h1>Recipes</h1>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {recipes?.map((recipe, index) => (
          <li
            key={recipe._id}
            onClick={() => {
              navigate();
              navigate(`/recipe/${recipe._id}`, {
                state: {
                  recipeId: recipe._id,
                  title: recipe.title,
                },
              });
            }}
          >
            <div>
              <h2>{recipe.title}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.steps}</p>
            </div>
            <img src={image[index]} alt={recipe.title} />
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.length > 0 && (
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
            </ul>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
