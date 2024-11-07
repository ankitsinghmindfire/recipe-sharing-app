import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { request } from "../../utils/request";

export const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [image, setImage] = useState("");

  const location = useLocation();

  const fetchRecipeDetails = async () => {
    try {
      const response = await request({
        method: "GET",
        url: "recipe/details",
        params: {
          recipeId: location.state.recipeId,
        },
      });
      if (!response.error) {
        const blob = new Blob([Int8Array.from(response.image.data.data)], {
          type: response.image.contentType,
        });

        const image = window.URL.createObjectURL(blob);
        setImage(image);
        setRecipeDetails(response);
      } else {
        toast.error("Unable to fetch recipes, Please try again");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch recipes, Please try again");
    }
  };
  useEffect(() => {
    fetchRecipeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <ToastContainer />
        <ul style={{ display: "flex", justifyContent: "center" }}>
          <li>
            <h1>{location?.state?.title}</h1>

            <div style={{ margin: "20px", width: "400px" }}>
              {recipeDetails?.steps?.match(/^\d+\./) ? (
                <div>
                  {recipeDetails.steps.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              ) : (
                <ol>
                  {recipeDetails?.steps
                    ?.split("\n")
                    ?.map((step, index) => step && <li key={index}>{step}</li>)}
                </ol>
              )}
            </div>
            <img src={image} alt={recipeDetails.title} />
            <h3>Ingredients:</h3>
            <ul>
              {recipeDetails?.ingredients?.length > 0 && (
                <ul>
                  {recipeDetails?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
            </ul>
            <p>Cooking Time: {recipeDetails?.cookingTime} minutes</p>
          </li>
        </ul>
      </div>
    </>
  );
};
