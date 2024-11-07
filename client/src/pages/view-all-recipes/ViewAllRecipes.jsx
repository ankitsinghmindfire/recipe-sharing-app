import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { request } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../../components/input/InputField";
import TextareaField from "../../components/textarea/TextareaField";
import { useSelector } from "react-redux";
import Button from "../../components/button/Button";
import "./ViewAllRecipes.css";

export const ViewAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { id, userName } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await request({
        method: "GET",
        url: "recipe",
      });

      if (!response.error) {
        const recipeImages = response.map((recipe) => {
          const blob = new Blob([Int8Array.from(recipe.image.data.data)], {
            type: recipe.image.contentType,
          });

          return window.URL.createObjectURL(blob);
        });

        setRecipes(response);
        setImages(recipeImages);
      } else {
        toast.error("Unable to fetch recipes, Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SearchRecipes = async (e) => {
    try {
      if (e.target.value) {
        let Searchedrecipes = await request({
          url: `searchRecipes/${e.target.value}`,
          method: "GET",
        });
        if (!Searchedrecipes.message) {
          setRecipes(Searchedrecipes);
        } else {
          setRecipes([]);
        }
      } else {
        fetchRecipes();
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to search recipes, Please try again");
    }
  };

  const handleRating = async (rating, recipeId) => {
    try {
      const response = await request({
        url: "recipe/rate",
        method: "POST",
        body: {
          rating: rating,
          recipeId: recipeId,
          userId: id,
          userName: userName,
        },
      });
      if (!response.error) {
        setRating(0);
        toast.success(response.message);
        fetchRecipes();
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add rating, Please try again");
    }
  };
  const handleAddComment = async (recipeId) => {
    try {
      if (!comment) {
        return toast.error("Please enter comment");
      }
      const response = await request({
        url: "recipe/comment",
        method: "POST",
        body: {
          comment: comment,
          recipeId: recipeId,
          userId: id,
          userName: userName,
        },
      });
      if (!response.error) {
        setComment("");
        toast.success(response.message);
        fetchRecipes();
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add comment, Please try again");
    }
  };

  return (
    <div style={{ marginTop: "90px" }}>
      <ToastContainer />
      <div className="search-bar">
        <InputField
          type="text"
          className="search-input"
          placeholder="Search recipes"
          onChange={(e) => SearchRecipes(e)}
        />
      </div>
      <h1>Recipes</h1>
      {recipes.length > 0 ? (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {recipes?.map((recipe, index) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.title}</h2>
              </div>
              <div style={{ margin: "20px", width: "400px" }}>
                {recipe.steps.match(/^\d+\./) ? (
                  <div>
                    {recipe.steps.split("\n").map((step, index) => (
                      <p key={index}>{step}</p>
                    ))}
                  </div>
                ) : (
                  <ol>
                    {recipe.steps
                      .split("\n")
                      .map(
                        (step, index) => step && <li key={index}>{step}</li>
                      )}
                  </ol>
                )}
              </div>
              <img
                src={images[index]}
                alt={recipe.title}
                onClick={() => {
                  navigate();
                  navigate(`/recipe/${recipe._id}`, {
                    state: {
                      recipeId: recipe._id,
                      title: recipe.title,
                    },
                  });
                }}
              />
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
              <TextareaField
                placeholder={"Add comment"}
                onChange={(event) => setComment(event.target.value)}
                value={comment}
              />
              <br />
              <Button
                className={"btn-add-comment"}
                type="button"
                onClick={() => handleAddComment(recipe._id)}
              >
                Add comment
              </Button>
              <br />
              <Rating
                onClick={(rate) => handleRating(rate, recipe._id)}
                emptyColor="gray"
                initialValue={rating}
                value={rating}
              />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              {recipe.ratingsAndComments.length > 0 && (
                <div style={{ width: "400px" }}>
                  <h1>Customer Ratings and Comments</h1>
                  {recipe.ratingsAndComments.map((entry, index) => (
                    <div key={index}>
                      <h4>{entry.userName}</h4>
                      <Rating initialValue={entry.rating} size="15" readonly />
                      <br />
                      <p>{entry.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Recipes Found</h2>
      )}
    </div>
  );
};
