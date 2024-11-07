import { useState } from "react";
import InputField from "../../components/input/InputField";
import Button from "../../components/button/Button";
import TextareaField from "../../components/textarea/TextareaField";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import { useSelector } from "react-redux";
import "./AddRecipe.css";

export const AddRecipe = () => {
  const { id } = useSelector((state) => state.auth);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    steps: "",
    cookingTime: 0,
    userOwner: id,
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "cookingTime") {
      setRecipe({ ...recipe, [name]: parseInt(value) || 0 }); // Parse the value as number or fallback to 0 if invalid
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    formData.append("cookingTime", recipe.cookingTime);
    formData.append("userOwner", recipe.userOwner);
    formData.append("image", image);

    try {
      const response = await request({
        url: "recipe",
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!response.error) {
        toast.success("Recipe Created");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            label="Title"
          />
          {recipe.ingredients.map((ingredient, index) => (
            <InputField
              type="text"
              key={index}
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              label={"Ingredients"}
            />
          ))}
          <Button
            type="button"
            onClick={handleAddIngredient}
            className={"btn-ingredents"}
          >
            Add Ingredient
          </Button>
          <TextareaField
            id="steps"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            label={"Steps"}
          />
          <InputField
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            label={"Upload Image"}
          />
          <InputField
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            label={"Cooking Time (minutes)"}
          />
          <Button type="submit" className={"btn-create-recipe"}>
            Create Recipe
          </Button>
        </form>
      </div>
    </>
  );
};
